import React from "react";
import { AnimatedDescription } from "./animationString";
import { BottomWarning } from "./bottomWarning copy";

export function MainPage() {
  return (
    <div className="bg-gradient-to-b from-blue-700 via-black to-black h-screen text-white font-mono">
      <div className="flex flex-col">
        <div>
          <h1 className="text-center font-bold py-10 text-7xl animate-pulse">
            Paytm transcation application
          </h1>
        </div>

        <div className="h-40">
          <AnimatedDescription></AnimatedDescription>
        </div>

        <div className="text-black px-10 py-10 text-center">
          <h1 className="text-blue-500 inline-block w-40 h-10 text-2xl rounded-lg">
            Get started
          </h1>
          <div className="flex justify-center py-5">
            <BottomWarning
              buttonText={"Sign Up"}
              to={"/signup"}
            >
              
            </BottomWarning>
            {/* <BottomWarning
              buttonText={"Sign In"}
              to={"/signin"}
            ></BottomWarning> */}
          </div>
        </div>

        <div>
          <h1 className="text-white text-center font-bold py-10 text-6xl">
            Security and Privacy guaranteed.
          </h1>
        </div>
      </div>
    </div>
  );
}
