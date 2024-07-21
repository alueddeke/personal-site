import React from "react";

function AboutMe({ bio, pictures }) {
  // Ensure we have at least 10 pictures before trying to access the 10th one
  const portraitPicture =
    pictures && pictures.length >= 10 ? pictures[9] : null;

  return (
    <section className="bg-off-white text-dark-text py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed">
            {bio.content[0].content[0].value}
          </p>
        </div>

        {/* Portrait */}
        {portraitPicture && (
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src={portraitPicture.fields.file.url}
                alt={portraitPicture.fields.title || "Portrait"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutMe;
