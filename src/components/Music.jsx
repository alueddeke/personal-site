import React from "react";
import HowlerPlayer from "./HowlerPlayer";

function Music({ bio, pictures, backgroundImage, audioClips }) {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage.fields.file.url})` }
    : {};

  return (
    <section
      className="py-20 bg-sky-blue bg-cover bg-center relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-dark-text/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-off-white">Music</h2>
        <p className="text-xl leading-relaxed text-off-white mb-12">{bio}</p>
        <div className="flex flex-col sm:flex-row gap-8 mb-12">
          {audioClips &&
            audioClips.map((clip, index) => (
              <div key={index} className="flex-1 min-w-0">
                <HowlerPlayer
                  src={clip.fields.audioFile.fields.file.url}
                  title={clip.fields.title}
                  startTime={clip.fields.startTime || 0}
                  endTime={clip.fields.endTime || null}
                />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {pictures &&
            pictures.slice(0, 9).map((picture, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-lg bg-light-gray"
              >
                {picture && picture.fields && picture.fields.file && (
                  <img
                    src={picture.fields.file.url}
                    alt={picture.fields.title || `Picture ${index + 1}`}
                    className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-105"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Music;
