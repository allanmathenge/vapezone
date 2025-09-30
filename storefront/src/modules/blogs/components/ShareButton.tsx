"use client";

import { FaShareAlt } from "react-icons/fa";

interface ShareButtonProps {
  title: string;
  url: string;
  variant?: "primary" | "secondary";
}

export default function ShareButton({ title, url, variant = "primary" }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const baseClasses = "px-6 py-2.5 rounded-full font-medium transition-colors flex items-center";
  const variantClasses = variant === "primary" 
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md"
    : "border border-gray-300 text-gray-700 hover:bg-gray-50";

  return (
    <button 
      onClick={handleShare}
      className={`${baseClasses} ${variantClasses}`}
      aria-label="Share article"
    >
      <FaShareAlt className="w-4 h-4 mr-2" />
      Share
    </button>
  );
}