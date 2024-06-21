"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserIdByEmail } from "@/lib/firebase";
import RegistrationForm from "@/components/forms/RegistrationForm";
import Overlay from "@/components/helper/Overlay";
import Button from "@/components/helper/buttons/Button";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const MyRouter = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { setIsLoading, setAlertText } = useContext(AlertAndLoadingContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here

    const id: string | null = await getUserIdByEmail(email);
    if (id) {
      Cookies.set("userID", id);
    } else {
      setAlertText("User not found");
    }

    MyRouter.push("/explore");
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-orange-100 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
          Login
        </h1>
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
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-orange-200"
            />
          </div>
          <Button type="submit">Login</Button>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="text-orange-600 font-medium hover:underline focus:outline-none"
          >
            Register
          </button>
        </div>

        {showForm && (
          <Overlay onClick={() => setShowForm(false)}>
            <RegistrationForm
              onFinish={() => {
                setShowForm(false);
              }}
            />
          </Overlay>
        )}
      </div>
    </div>
  );
};

export default Login;
