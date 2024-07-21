import React from "react";

function Music({ bio, pictures, backgroundImage }) {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage.fields.file.url})` }
    : {};

  return (
    <section
      className="min-h-screen flex flex-col justify-center bg-sky-blue bg-cover bg-center relative overflow-hidden p-4 sm:p-8"
      style={backgroundStyle}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-dark-text/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col h-full justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-off-white">
            Music
          </h2>
          <p className="text-base sm:text-xl leading-relaxed text-off-white mb-6 sm:mb-12">
            {bio.content[0].content[0].value}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
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
