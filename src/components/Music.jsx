import React from "react";
import { optimizedUrl, performancePhotos } from "../utils/image";

const SPOTIFY_ALBUM_URL =
  "https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc";
const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/album/28d3TgbRj5Y0a7URbWWdgc?utm_source=generator&theme=0";

function Music({ bio, pictures, backgroundImage, epArtwork }) {
  const backgroundUrl = optimizedUrl(backgroundImage, { w: 1920, q: 60 });
  const backgroundStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};
  const photos = performancePhotos(pictures).slice(0, 9);
  const artUrl = optimizedUrl(epArtwork, { w: 640 });

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

        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          {/* EP artwork + metadata */}
          <div className="lg:w-1/3 flex-shrink-0">
            {artUrl && (
              <a
                href={SPOTIFY_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <img
                  src={artUrl}
                  alt="Why We're Living EP artwork"
                  loading="lazy"
                  className="w-full max-w-sm rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
            )}
            <div className="mt-4 max-w-sm">
              <p className="text-xl font-semibold text-white">
                Why We&apos;re Living
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                The Daily Commute · EP · 2025 · 6 tracks
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Golden Street Recordings
              </p>
            </div>
          </div>

          {/* Blurb + Spotify player */}
          <div className="lg:w-2/3">
            <p className="text-lg leading-relaxed text-zinc-200 mb-6">{bio}</p>
            <iframe
              title="Why We're Living — The Daily Commute"
              src={SPOTIFY_EMBED_URL}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Performance photos */}
        {photos.length > 0 && (
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
        )}
      </div>
    </section>
  );
}

export default Music;
