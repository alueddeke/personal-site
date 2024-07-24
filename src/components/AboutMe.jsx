import React from "react";

function AboutMe({ bio, pictures }) {
  // Ensure we have at least 10 pictures before trying to access the 10th one
  const portraitPicture =
    pictures && pictures.length >= 10 ? pictures[9] : null;

  return (
    <section className="bg-off-white text-dark-text py-20 md:py-24 lg:py-32 relative overflow-hidden p-4 sm:p-8">
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start">
        {/* Text content */}
        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8">
            About Me
          </h2>
          {bio.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-xl leading-relaxed mb-4 sm:mb-6"
            >
              {paragraph.content[0].value}
            </p>
          ))}
        </div>

        {/* Portrait */}
        {portraitPicture && (
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src={portraitPicture.fields.file.url}
                alt={portraitPicture.fields.title || "Portrait"}
                className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutMe;
