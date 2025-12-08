"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (recaptchaEnabled && !captchaToken) {
      setError("Please verify reCAPTCHA");
      return;
    }

    setIsLoading(true);

    const result = await signIn("credentials", {
      identifier,
      password,
      role,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      setIsLoading(false);
      return;
    }

    if (result?.ok) {
      router.push("/");
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden flex items-center justify-center p-4">
      
      {/* Background Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/Videos/olShi6AW2pQj75e9EX.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
      </motion.div>

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-28 h-28">
            <Image
              src="/Images/RES Logo with Futuristic Emblem.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Log in to your R.E.S. account
        </p>

        {/* Error Notice */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3"
            >
              <AlertCircle size={18} className="text-red-400" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Role */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "user" | "admin")}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white text-sm focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Identifier */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Email or Phone</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-xs text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs text-primary-300">
              Forgot password
            </Link>
          </div>

          {/* reCAPTCHA */}
          {!!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                theme="dark"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(t) => setCaptchaToken(t)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
          )}

          {/* Login button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            className="w-full py-2.5 bg-white/10 border border-white/20 rounded-lg text-white font-semibold text-sm"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        {/* Sign up */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
