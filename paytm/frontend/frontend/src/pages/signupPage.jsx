import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading"; // Corrected the name
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  async function handleSubmit() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName,
        lastName,
        password,
        username,
      });
      localStorage.setItem('token',response.data.token);
      console.log('Server Response:', response.data);
      navigate("/dashboard")
     
    } catch (error) {
      console.error('Error:', error);
    }
  }






  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">



          <Heading HeadingText={"Sign up"} />
          <SubHeading SubheadingText={"Enter your information to create an account"} />
          <InputBox placeholder="Rakesh" onchange={e => {
            setFirstName(e.target.value);
          }} label={"First Name"} />

          <InputBox placeholder="Kanneeswaran" onchange={e => {
            setLastName(e.target.value);
          }} label={"Last Name"} />


          <InputBox placeholder="rakesh@gmail.com" onchange={e => {
            setUsername(e.target.value);
          }} label={"Email"} />


          <InputBox placeholder="123456" onchange={e => {
            setPassword(e.target.value);
          }} label={"Password"} />


          <div className="pt-4">
            <Button OnClick={handleSubmit} label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>


      </div>
    </div>
  );
};
