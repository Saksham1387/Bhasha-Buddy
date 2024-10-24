"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import TimerComponent from "./timer";
const Stutter = () => {
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [whisperResponse, setWhisperResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [former, setFormer] = useState(false);
  const handleListen = async () => {
    if (isListening) {
      //@ts-ignore
      mediaRecorder.stop();
      setIsListening(false);
    } else {
      // Request the browser to access the microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // Create a new MediaRecorder instance
        const recorder = new MediaRecorder(stream);
        //@ts-ignore

        setMediaRecorder(recorder);

        // Collect the audio data chunks
        const audioChunks: BlobPart[] | undefined = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        // When recording stops, send the audio to the server
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const formData = new FormData();
          const formData2 = new FormData();

          formData.append("audio", audioBlob, "recording.wav");
          formData2.append("file", audioBlob, "recording1.wav");
          console.log(formData);

          // Send the audio file to the server model
          try {
            //@ts-ignore
            const response = await fetch(process.env.NEXT_PUBLIC_URL_MODEL, {
              method: "POST",
              body: formData,
            });
            const responseData = await response.json();
            console.log(responseData.predicted_class);
            setServerResponse(responseData.predicted_class);
            setPrompt(whisperResponse);
          } catch (error) {
            console.error("Error sending audio to the server", error);
            setServerResponse("Error sending audio to the server");
          }
          console.log("this is rpompt", prompt);
          console.log(
            JSON.stringify({
              prompt: `${whisperResponse}`,
            }),
          );
          stream.getTracks().forEach((track) => track.stop());

          //@ts-ignore
          const response = await fetch(process.env.NEXT_PUBLIC_URL_WHISPER, {
            method: "POST",
            body: formData,
          });
          const responseData1 = await response.json();
          setWhisperResponse(responseData1.transcription);

          try {
            //@ts-ignore
            const response = await fetch(process.env.NEXT_PUBLIC_URL_GRAPH, {
              method: "POST",
              body: formData2,
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
          } catch (error) {
            console.error("Failed to fetch image:", error);
          }
        };

        // Start recording
        recorder.start();

        // Stop recording after 10 seconds
        setTimeout(() => {
          recorder.stop();
          setIsListening(false); // This will trigger the 'onstop' event
        }, 10000);

        setIsListening(true);
      } catch (err) {
        console.error("An error occurred: " + err);
        setServerResponse("Error accessing the microphone");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-row items-center my-[15vh] gap-5 ml-[130px] mt-[100px]">
      {/* cartoon image */}
      <div className="">
        <Image src="/main-page.gif" height={150} width={150} alt="Mascot" />
      </div>
      {/* "flex-1 flex flex-row items-center my-[15vh] border border-gray-200  rounded-3xl shadow-sm" */}
      {/* the buttons */}
      <div className="flex flex-col items-center gap-y-8 py-5  rounded-3xl shadow-lg  shadow-slate-200 dark:bg-slate-800">
        <h1 className="text-4xl lg:text-3xl my-1 font-bold text-neutral-600 max-w-[480px] text-center dark:text-white">
          Click on Start to Record Your Audio
        </h1>

        {!serverResponse ? (
          <Button variant="secondary" onClick={handleListen}>
            {isListening ? "Stop" : "Start"}
          </Button>
        ) : (
          ""
        )}

        {isListening ? (
          <div>
            <Image
              src="/Animation - 1711012148146.gif"
              height={60}
              width={60}
              alt="Mascot"
              className="ml-[40px]"
            />
            <TimerComponent></TimerComponent>
          </div>
        ) : null}
        {serverResponse && (
          <div>
            <p className="text-xl lg:text-3xl   font-bold text-neutral-600 max-w-[480px] text-center dark:text-white">
              Diagnosed:
            </p>
            <p className="text-xl lg:text-xl   text-neutral-600 max-w-[480px] text-center dark:text-white">
              <p className=" capitalize">{serverResponse}</p>
            </p>
          </div>
        )}

        {serverResponse &&
          (whisperResponse ? (
            <div>
              <p className="text-xl lg:text-3xl  font-bold text-neutral-600 max-w-[480px] text-center dark:text-white">
                You said:{" "}
              </p>
              <p className="text-xl lg:text-2xl   text-neutral-600 max-w-[480px] text-center">
                <p className="capitalize">{whisperResponse}</p>
              </p>
            </div>
          ) : (
            <div>
              <Image
                className="ml-14"
                src="/loading-2.gif"
                height={60}
                width={60}
                alt="Loading animation"
              />
              <p className="text-sm text-gray-700 ml-4 dark:text-white">
                Analyzing Your Speech...
              </p>
            </div>
          ))}

        {serverResponse && (
          <div className="felx flex-row">
            <Link href="/learn">
              <Button variant="secondary">Start Learning</Button>
            </Link>
            <Button
              className="m-5"
              variant="danger"
              onClick={() => {
                setImageUrl("");
                setServerResponse("");
                setWhisperResponse("");
                setIsListening(false);
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* image Generated */}
      <div>
        <div>
          {whisperResponse &&
            (imageUrl ? (
              ""
            ) : (
              <div
                role="status"
                className="flex flex-col items-center justify-center space-y-2"
              >
                <Image
                  className="ml-20"
                  src="/laoding-animation.gif"
                  height={100}
                  width={100}
                  alt="Loading animation"
                />

                <p className="text-sm text-gray-700 dark:text-gray-400 ml-20">
                  Generating Your Image...
                </p>
              </div>
            ))}
          <div className="rounded-xl shadow-xl border-neutral-300 p-3 ml-5">
            {imageUrl && (
              <img src={imageUrl} alt="Generated" width={500} height={500} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stutter;
