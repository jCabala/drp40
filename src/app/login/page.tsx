"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { addUser, getUserIdByEmail } from "@/lib/firebase";
import RegistrationForm from "@/components/forms/RegistrationForm";
import Overlay from "@/components/helper/Overlay";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import Alert from "@/components/helper/Alert";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const MyRouter = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here

    console.log("Email:", email);
    console.log("Password:", password);
    const id = await getUserIdByEmail(email);
    Cookies.set("userID", id);
    Cookies.set("email", email);
    MyRouter.push("/explore");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Login
        </button>
      </form>

      <div className="flex flex-wrap justify-center w-2/3">
        <button
          onClick={() => setShowForm(true)}
          className="fixed w-20 h-20 bottom-4 right-4 bg-orange-500 pt-3 pb-6 px-3 rounded-full shadow-lg z-40 duration-200 hover:scale-110 flex justify-center items-center"
        >
          <span className="text-white text-center text-sm">REGISTER</span>
        </button>
      </div>
      <div>
        {showForm && (
          <Overlay onClick={() => setShowForm(false)}>
            <RegistrationForm
              setIsLoading={setIsFormLoading}
              setAlertText={setAlertText}
              onFinish={() => {
                setShowForm(false);
              }}
            />
          </Overlay>
        )}{" "}
        {/* Render form when showForm is true */}
      </div>
      {isFormLoading && <LoadingOverlay />}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
    </div>
  );
};

export default Login;
