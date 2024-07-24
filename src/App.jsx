import React, { useEffect, useState } from "react";
import { getContentfulData } from "./contentful";
import LandingPage from "./components/LandingPage";
import Music from "./components/Music";
import Loading from "./components/Loading";
import Error from "./components/Error";
import AboutMe from "./components/AboutMe";
import Teaching from "./components/Teaching";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContentfulData();
        console.log(result);
        setData(result);
      } catch (err) {
        setError("Failed to fetch data from Contentful");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data) return <Error message="No data available" />;

  return (
    <div className="bg-light-gray text-dark-text">
      <NavBar avatar={data.fields.avatar} skills={data.fields.skills} />
      <main>
        <LandingPage
          name={data.fields.name}
          profileImage={data.fields.profileImage}
          backgrounds={data.fields.backgrounds}
        />
        <div id="about">
          <AboutMe
            bio={data.fields.bio.content}
            pictures={data.fields.pictures}
          />
        </div>
        <div id="music">
          <Music
            bio={data.fields.musicBio}
            pictures={data.fields.pictures}
            backgroundImage={data.fields.backgrounds?.[10]}
            audioClips={data.fields.audioClips}
          />
        </div>
        <Teaching
          pictures={data.fields.pictures}
          bio={data.fields.teachingBio}
        />
        <div id="projects">
          <Projects
            projects={data.fields.projects}
            backgroundImage={data.fields.backgrounds?.[0]}
          />
        </div>
        <div id="contact">
          <ContactMe
            backgroundImage={data.fields.backgrounds?.[2]}
            contact={data.fields.contact}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
