"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { Button } from "@/components/ui/button";
import { signIn, SignInResponse } from "next-auth/react";
import { Loader } from "@/components/ui/loader";

const SigninPage = () => {
  const router = useRouter();
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const result: SignInResponse | undefined = await signIn("credentials", {
      username: username.current,
      email: email.current,
      password: password.current,
      name: name.current,
      redirect: false,
    });

    if (result && !result.error) {
      router.push("/diagnos");
    } else if (result) {
      console.error(result.error);
    } else {
      console.error("Sign-in function returned undefined.");
    }
  };
  return (
    <>
    
      <div>
        <Header></Header>
        <div className="flex flex-col items-center justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="p-10 shadow-xl rounded-xl mt-[100px] ">
              <h1 className="text-4xl text-neutral-400 font-bold text-center">
                LogIn
              </h1>
              <p className="text-center text-sm text-neutral-400 mt-2">
                Welcome back!
              </p>
              <br />
              <form
                className="space-y-6 w-full"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-500"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-3 shadow-sm ring-1 ring-inset dark:text-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        name.current = e.target.value;
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-500"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-3 shadow-sm ring-1 ring-inset dark:text-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        username.current = e.target.value;
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-500"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-3 shadow-sm ring-1 ring-inset dark:text-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        email.current = e.target.value;
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-neutral-500"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) => {
                        password.current = e.target.value;
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm pl-3 ring-1 ring-inset dark:text-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  {loading ? (
                    <Loader></Loader>
                  ) : (
                    <Button type="submit" className="ml-[100px]">
                      Log In
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
