import React, { useState, useCallback } from 'react';
import axios from 'axios';

export function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleFirstNameChange = useCallback((e) => {
    setFirstName(e.target.value);
  }, []);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleLastNameChange = useCallback((e) => {
    setLastName(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);



  async function handleSubmit() {

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName,
        lastName,
        password,
        username,
      });

      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }







  }

  return (
    <div className=" bg-slate-50 min-h-screen flex flex-col backdrop-blur-lg">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-transparent px-6 py-8 rounded shadow-xl hover:shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 transition-transform transform hover:scale-105"
            name="FirstName"
            placeholder="Full Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 transition-transform transform hover:scale-105"
            name="LastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 transition-transform transform hover:scale-105"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}
          />


          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 transition-transform transform hover:scale-105"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

    

          <button 
            type="submit"
            className="w-full text-center py-3 rounded bg-blue-500 text-black hover:bg-red-500 focus:outline-none my-1 transition-transform transform hover:scale-105"
            onClick={handleSubmit}
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{' '}
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{' '}
          <a className="no-underline border-b border-blue text-blue" href="../login/">
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );




}