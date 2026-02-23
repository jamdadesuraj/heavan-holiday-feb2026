"use client";
import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import PhoneDropdown from "./TopNum";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import SignInModal from "./SignInModal";
import ProfileDropdown from "./ProfileDroupdown";
import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useGetSettingsQuery } from "store/settings/settingsApi";

const TopNavBar = () => {
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  const timeoutRef = useRef(null);
  const { data, isLoading, error } = useGetSettingsQuery();

  // Auth state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false); // ADD THIS

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("authToken", token);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPhoneInfo(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowPhoneInfo(false), 500);
  };

  if (isLoading) {
    return <p>error</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <header className="w-full bg-[#0d1b29] text-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-2">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Search Box (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5 relative">
          <Link
            href="/travel-planners"
            target="_blank"
            className="hidden sm:inline-block text-yellow-400 font-semibold hover:underline text-xs"
          >
            {data?.data?.travelPlannerLabel || ""}
          </Link>
          |
          <PhoneDropdown />
          {/* Conditional Rendering Based on Auth State */}
          {loading ? (
            <div className="flex items-center gap-1 text-xs">
              <User className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Loading...</span>
            </div>
          ) : user ? (
            <ProfileDropdown user={user} />
          ) : (
            // UPDATED: trigger button + modal with props
            <>
              <button
                onClick={() => setIsSignInOpen(true)}
                className="flex items-center gap-1 hover:text-yellow-400 text-xs cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
              <SignInModal
                isOpen={isSignInOpen}
                onClose={() => setIsSignInOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Search (always full width) */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar mobile />
      </div>
    </header>
  );
};

export default TopNavBar;
