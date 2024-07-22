function Teaching({ bio, pictures }) {
  const teachingProfile =
    pictures && pictures.length >= 10 ? pictures[10] : null;

  const bioText = bio?.content?.[0]?.content?.[0]?.value || "Bio not available";

  return (
    <section className="bg-light-gray md:py-24 lg:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center ">
        {teachingProfile && (
          <div className="md:w-1/3 flex justif-end">
            <div className="w-64 h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src={teachingProfile.fields.file.url}
                alt={teachingProfile.fields.title || "Portrait"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}

        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8 flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Teaching</h2>
          <p className="text-lg leading-relaxed">{bioText}</p>
        </div>
      </div>
    </section>
  );
}

export default Teaching;
