import React, { useEffect, useState } from "react";
import { getContentfulData } from "./contentful";
import LandingPage from "./components/LandingPage";
import Music from "./components/Music";
import Loading from "./components/Loading";
import Error from "./components/Error";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Experiences from "./components/Experiences";
import Reveal from "./components/Reveal";
import { findAsset } from "./utils/image";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContentfulData();
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
    <div className="bg-zinc-950 text-white">
      <NavBar avatar={data.fields.avatar} skills={data.fields.skills} />
      <main>
        <LandingPage
          name={data.fields.name}
          profileImage={data.fields.profileImage}
          backgrounds={data.fields.backgrounds}
          heroTagline={data.fields.heroTagline}
        />
        <Reveal>
          <div id="projects">
            <Projects
              projects={data.fields.projects}
              backgroundImage={findAsset(data.fields.backgrounds, "closed-laptop")}
            />
          </div>
        </Reveal>
        <Reveal>
          <div id="about">
            <AboutMe
              bio={data.fields.bio.content}
              pictures={data.fields.pictures}
            />
          </div>
        </Reveal>
        <Reveal>
          <div id="experiences">
            <Experiences experiences={data.fields.experiences} />
          </div>
        </Reveal>
        <Reveal>
          <div id="music">
            <Music
              bio={data.fields.musicBio}
              pictures={data.fields.pictures}
              backgroundImage={findAsset(data.fields.backgrounds, "vinyl")}
              epArtwork={data.fields.epArtwork}
            />
          </div>
        </Reveal>
        <Reveal>
          <div id="contact">
            <ContactMe
              backgroundImage={findAsset(data.fields.backgrounds, "f-hole-guitar")}
              contact={data.fields.contact}
            />
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}

export default App;
