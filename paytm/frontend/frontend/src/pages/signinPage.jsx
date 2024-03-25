import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading"; // Corrected the name
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      if ((response.stat = 200)) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("balance", response.data.balance);
        localStorage.setItem("name", response.data.name);
        console.log("Server Response:", response.data);
        console.log(response.data.balance);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading HeadingText={"Sign in"} />
          <SubHeading
            SubheadingText={"Enter your credentials to access your account"}
          />
          <InputBox
            placeholder="rakesh@gmail.com"
            label={"Email"}
            onchange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button label={"Sign in"} OnClick={handleSubmit} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
