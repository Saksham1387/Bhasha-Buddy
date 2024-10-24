"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userInput },
    ];
    setMessages(newMessages);
    setUserInput("");

    // Send request to server and wait for the response
    try {
      //@ts-ignore
      const response = await fetch("https://api.stack-ai.com/inference/v0/run/957a268d-8fe0-4f51-979c-430b73f02d90/664ec96ddcac8afd6519e4a4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer fbb2ed18-5934-4339-a876-c9e83f135431"
        },
        body: JSON.stringify({ "in-0": userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse: string = data["outputs"]["out-0"]; // Assuming the server responds with { response: "bot's message" }
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Failed to get the bot's response:", error);
      // Optionally handle the error by displaying a message to the user
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't fetch the response." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10">
      <div
        onClick={toggleChat}
        className="mr-5 mb-5 cursor-pointer p-2 rounded-full transition duration-300 flex items-center justify-center bg-purple-100 ring ring-purple-500 shadow-3xl shadow-purple-600"
      >
        <Image
          src="/chat-bot.gif"
          height={60}
          width={60}
          alt="Chat with Admin Bot"
          className="rounded-full"
        />
      </div>
      {isChatOpen && (
        <div className="fixed bottom-16 mb-10 mr-10 right-4 w-96">
          <div className="bg-white shadow-md rounded-3xl max-w-lg w-full">
            <div className="p-2 border-b  text-neutral-500 bg-purple-200 rounded-t-3xl flex text-xl flex-row justify-between items-center dark:bg-violet-500">
              <div className="flex flex-row">
                <Image
                  src="/mascot-2.png"
                  height={40}
                  width={40}
                  alt="Chat with Admin Bot"
                  className="rounded-full"
                />
                <p className="text-2xl my-1 ml-2 font-bold dark:text-zinc-200">
                  Hi!
                </p>
              </div>
              <button
                onClick={toggleChat}
                className="  flex items-center justify-center p-1 rounded-full dark:bg-zinc-200"
              >
                <ArrowDown></ArrowDown>
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto dark:bg-gray-800">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${message.sender === "user" ? "text-right" : ""}`}
                >
                  <span
                  
                    className={`inline-block px-4 py-2 rounded-smx bg-purple-300 dark:bg-indigo-200  ${message.sender === "user" ? "bg-indigo-100 text-black" : "bg-gray-300 text-gray-900"}`}
                  >
                  
                    {message.text}
                  </span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="p-4 border-t flex dark:bg-gray-700 dark:rounded-b-3xl"
            >
              <input
                type="text"
                placeholder="Ask me Anything. . ."
                className="w-full px-3 py-2 rounded-full bg-slate-100 focus:outline-none dark:bg-slate-600 dark:text-zinc-200"
                onChange={handleInputChange}
                value={userInput}
              />
              <button
                type="submit"
                className=" text-white px-2 py-2 rounded-r-md transition duration-300"
              >
                <Image
                  src={"/chat-send.png"}
                  alt=""
                  width={30}
                  height={30}
                ></Image>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
