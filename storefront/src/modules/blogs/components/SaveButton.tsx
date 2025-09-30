"use client";

import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface SaveButtonProps {
  postId: string;
  variant?: "primary" | "secondary";
}

export default function SaveButton({ postId, variant = "primary" }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically make an API call to save/unsave
  };

  const baseClasses = "px-6 py-2.5 rounded-full font-medium transition-colors flex items-center";
  const variantClasses = variant === "primary" 
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
    : "border border-gray-300 text-gray-700 hover:bg-gray-50";

  return (
    <button 
      onClick={handleSave}
      className={`${baseClasses} ${variantClasses}`}
      aria-label={isSaved ? "Remove from saved" : "Save for later"}
    >
      {isSaved ? (
        <FaBookmark className="w-4 h-4 mr-2" />
      ) : (
        <FaRegBookmark className="w-4 h-4 mr-2" />
      )}
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}