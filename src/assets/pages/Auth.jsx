import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // New function to check profile status and redirect
  const checkProfileAndRedirect = async (user) => {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("is_profile_complete")
      .eq("email", user.email) // ✅ Use email to query the table
      .single();

    // The previous error was here due to profiles being null
    if (error || !profiles || profiles.is_profile_complete !== "true") {
      navigate("/complete-profile");
    } else {
      navigate("/");
    }
  };

const handleAuth = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  if (isLogin) {
    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setMessage(signInError.message);
    } else if (data.user) {
      // 🔑 Store doctor info for chat - CHANGED KEY
      localStorage.setItem('currentDoctor', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        role: 'doctor'
      }));
      
      await checkProfileAndRedirect(data.user);
    }
  } else {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "doctor" }
      }
    });
    
    if (signUpError) {
      setMessage(signUpError.message);
    } else if (data.user) {
      // 🔑 Store doctor info for chat - CHANGED KEY
      localStorage.setItem('currentDoctor', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        role: 'doctor'
      }));
      
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email: data.user.email,
          is_profile_complete: false,
        });

      if (insertError) {
        setMessage("Sign up successful, but could not create profile.");
      } else {
        setMessage("Check your email to confirm your account!");
      }
    }
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : isLogin ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center text-sm font-medium text-gray-600 mt-4">
            {message}
          </div>
        )}
        <div className="text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
