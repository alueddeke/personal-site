import React from "react";

function LandingPage({ name, profileImage, backgrounds, heroTagline }) {
  // Get the second background image if available
  const backgroundImage =
    backgrounds && backgrounds.length > 1 ? backgrounds[1] : null;

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background image with blur */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage.fields.file.url})`,
            filter: "blur(8px)", // Adjust the blur amount as needed
            transform: "scale(1.1)", // Slightly scale up to prevent blur edges
          }}
        ></div>
      )}

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-zinc-950/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center p-8">
        <h1 className="text-6xl font-bold mb-4 text-white">
          Hi, I'm {name}
        </h1>
        <p className="text-xl mb-8 text-center text-zinc-300">
          {heroTagline ||
            "Full-stack engineer who ships production software."}
        </p>
        {profileImage && (
          <img
            src={profileImage.fields.file.url}
            alt={profileImage.fields.title}
            className="w-64 h-64 rounded-full object-cover border-4 border-zinc-700 shadow-lg mx-auto"
          />
        )}
      </div>
    </section>
  );
}

export default LandingPage;
