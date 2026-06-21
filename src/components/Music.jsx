import React from "react";
import HowlerPlayer from "./HowlerPlayer";
import { optimizedUrl, performancePhotos } from "../utils/image";

function Music({ bio, pictures, backgroundImage, audioClips, epArtwork }) {
  const backgroundUrl = optimizedUrl(backgroundImage, { w: 1920, q: 60 });
  const backgroundStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};
  const photos = performancePhotos(pictures).slice(0, 9);

  return (
    <section
      className="py-20 bg-zinc-950 bg-cover bg-center relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-zinc-950/70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-white">Music</h2>
        {epArtwork?.fields?.file?.url && (
          <img
            src={optimizedUrl(epArtwork, { w: 640 })}
            alt="Why We're Living EP artwork"
            loading="lazy"
            className="w-full max-w-xs rounded-lg shadow-lg mb-8"
          />
        )}
        <p className="text-xl leading-relaxed text-zinc-200 mb-12">{bio}</p>
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
          {photos.map((picture, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-lg bg-zinc-800"
            >
              {picture && picture.fields && picture.fields.file && (
                <img
                  src={optimizedUrl(picture, { w: 600 })}
                  alt={picture.fields.title || `Picture ${index + 1}`}
                  loading="lazy"
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
