"use client";

import { useState } from "react";
import Image from "next/image";


export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    try {
      const res = await fetch("https://api.cutfreak.com/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to join waitlist.");
      }

      setSuccessMessage("🎉 You're on the list! We'll notify you soon.");
      setEmail("");
    } catch (error: unknown) {
      if(error instanceof Error) {
        setSuccessMessage(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Glassmorphic Form */}
      <div className="relative z-20 max-w-lg w-full mx-4 p-8 sm:p-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Color grade your videos with <span className="text-blue-400">AI</span>
        </h1>
        <p className="text-gray-200 mb-6">Join the waitlist to get notified on release</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="relative px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              hover:brightness-110 hover:saturate-150
              shadow-lg hover:shadow-pink-500/30
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{loading ? "Submitting..." : "Join Waitlist"}</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-lg" />
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-400 text-sm sm:text-base font-medium">
            {successMessage}
          </p>
        )}

        {/* Play Store Badge */}
        <div className="mt-6 flex justify-center">
          <div className="relative group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm sm:text-base font-semibold shadow-xl overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300" />
            <Image src="/playstore.svg" alt="Play Store" width={22} height={22} />
            <span className="z-10">Coming soon on Play Store</span>
          </div>
        </div>
      </div>
    </div>
  );
}
