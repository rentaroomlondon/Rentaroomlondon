"use client"
import React, { useState } from 'react';
import { 
  Star, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [rememberMe,setRememberMe] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          credentials:"include",
          body: JSON.stringify({
            email,
            password,
            rememberMe
          })
        }
      );

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Login failed");
      }

      if(data.success){

        // redirect after login
        window.location.href = "/dashboard";

      }

    } catch(err){

      setError(err.message);

    } finally{
      setLoading(false);
    }

  };


  return (
    <div className="flex min-h-screen flex-col lg:flex-row font-sans">
      
      {/* LEFT SIDE: Branding & Social Proof (Hidden on small mobile if following common patterns, but here it acts as a header) */}
      <div className="bg-[#0a192f] text-white p-8 lg:p-16 lg:w-[45%] flex flex-col justify-between">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Find your perfect <br />
            <span className="text-[#F9A370]">London home</span> with us
          </h1>
          <p className="text-[#FFFFFF80] mb-10 max-w-md">
            Join over 4,000 tenants who trust Rentaroomlondon to find quality, fully-managed 
            accommodation across London — with all bills included.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold">4,<span className="text-[#F9A370]">150</span></div>
              <div className="text-xs text-[#FFFFFF73]">Happy Tenants</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-[#F9A370]">332</div>
              <div className="text-xs text-[#FFFFFF73]">Properties Managed</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold"><span className="text-[#F9A370]">16</span>+</div>
              <div className="text-xs text-[#FFFFFF73]">London Boroughs</div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6 mb-12">
            <FeatureItem 
              icon="💳"
              title="Pay rent online, anytime" 
              desc="Secure card payments and direct debit — all from your dashboard" 
            />
            <FeatureItem 
              icon="🔧"
              title="Report repairs in seconds" 
              desc="24/7 maintenance reporting powered by Fixflo with real-time updates" 
            />
            <FeatureItem 
              icon="📄" 
              title="All documents in one place" 
              desc="Your tenancy agreement, gas certificate and EPC — always accessible" 
            />
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative">
            <p className="italic text-gray-300 mb-4 text-sm leading-relaxed">
              "Rentaroomlondon made moving to London so easy. I found my room in Shoreditch within a week, 
              signed everything online, and the whole team was incredibly helpful."
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
                   {/* Placeholder for Avatar */}
                   <img src="https://i.pravatar.cc/150?u=james" alt="James Carter" />
                </div>
                <div>
                  <div className="text-sm font-semibold">James Carter</div>
                  <div className="text-[10px] text-gray-500">Tenant since 2024 · West Hampstead</div>
                </div>
              </div>
              <div className="flex text-orange-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Footer */}
        <div className="flex flex-wrap gap-2 mt-8 opacity-60">
          <Badge text="Client Money Protection" />
          <Badge text="My Deposits" />
          <Badge text="PRS Member" />
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-[#0a192f] mb-2">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to access your tenant portal, manage your room, and book viewings.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required  
                  className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">✉️</div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <span className="absolute left-3 top-3.5 text-gray-400 text-[16px]">
                  🔐
                </span>
                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400"
                >
                <span className="text-[18px]">👁️</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" 
                />
                Remember me for 30 days
              </label>
              <a href="/forget-password" className="text-orange-500 font-semibold text-[12px] md:text-sm hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e36b2c] hover:bg-[#c95a1f] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In to Portal"}
              <ArrowRight size={18}/>
            </button>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              href="/register-with-us"
              className="text-orange-500 font-bold hover:underline inline-flex items-center gap-1"
            >
              Register for free <ArrowRight size={16} />
            </Link>
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-12 border border-gray-100 rounded-xl overflow-hidden">
            <TrustTile icon="🔒" label="SSL SECURED" />
            <TrustTile icon="🛡️" label="GDPR COMPLIANT" />
            <TrustTile icon="⭐" label="TRUSTPILOT 4.9" />
            <TrustTile icon="🏆" label="AWARD WINNING" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function Badge({ text }) {
  return (
    <div className="border border-white/20 px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-2">
      <span className="text-white">✓</span> {text}
    </div>
  );
}

function TrustTile({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border-[0.5px] border-gray-100">
      {icon}
      <span className="text-[8px] font-bold text-gray-400 mt-2 text-center tracking-tighter">{label}</span>
    </div>
  );
}