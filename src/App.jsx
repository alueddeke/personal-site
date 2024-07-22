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
    <div className="bg-light-gray  text-dark-text">
      <LandingPage
        name={data.fields.name}
        profileImage={data.fields.profileImage}
        backgrounds={data.fields.backgrounds}
      />
      <AboutMe bio={data.fields.bio} pictures={data.fields.pictures} />
      <Music
        bio={data.fields.bio}
        pictures={data.fields.pictures}
        backgroundImage={data.fields.backgrounds?.[10]}
      />
      <Teaching pictures={data.fields.pictures} bio={data.fields.bio} />
      <Projects
        projects={data.fields.projects}
        backgroundImage={data.fields.backgrounds?.[0]}
      />
      <ContactMe
        backgroundImage={data.fields.backgrounds?.[2]}
        contact={data.fields.contact}
      />
    </div>
  );
}

export default App;
