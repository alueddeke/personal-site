function Teaching({ bio, pictures }) {
  const teachingProfile =
    pictures && pictures.length >= 10 ? pictures[10] : null;

  const bioText = bio || "Bio not available";

  return (
    <section className="bg-light-gray py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {teachingProfile && (
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
              <div className="w-64 h-80 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={teachingProfile.fields.file.url}
                  alt={teachingProfile.fields.title || "Portrait"}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          )}

          <div className="w-full lg:w-2/3 flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center lg:text-left">
              Teaching
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-center lg:text-left">
              {bioText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Teaching;
