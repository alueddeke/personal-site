import axios from "axios";

const BASE_URL = `https://cdn.contentful.com/spaces/${
  import.meta.env.VITE_CONTENTFUL_SPACE_ID
}`;

const contentfulClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
export const getContentfulData = async () => {
  try {
    const response = await contentfulClient.get("/entries", {
      params: {
        content_type: "personalWebsite",
        limit: 1,
        include: 10,
      },
    });

    const item = response.data.items[0];
    const assets = response.data.includes.Asset;
    const entries = response.data.includes.Entry;

    // Helper function to resolve asset links
    const resolveAsset = (assetLink) =>
      assets.find((asset) => asset.sys.id === assetLink.sys.id);

    if (item.fields.audioClips) {
      item.fields.audioClips = item.fields.audioClips.map((clipLink) => {
        const clip = entries.find((entry) => entry.sys.id === clipLink.sys.id);
        if (clip && clip.fields.audioFile) {
          clip.fields.audioFile = resolveAsset(clip.fields.audioFile);
        }
        return clip;
      });
    }

    if (item.fields.experiences) {
      item.fields.experiences = item.fields.experiences.map(
        (experienceLink) => {
          return entries.find(
            (entry) => entry.sys.id === experienceLink.sys.id
          );
        }
      );
    }

    // Resolve picture links to actual asset data
    if (item.fields.pictures) {
      item.fields.pictures = item.fields.pictures.map(resolveAsset);
    }

    // Resolve background links to actual asset data
    if (item.fields.backgrounds) {
      item.fields.backgrounds = item.fields.backgrounds.map(resolveAsset);
    }
    if (item.fields.avatar) {
      item.fields.avatar = resolveAsset(item.fields.avatar);
    }

    // Resolve project links to actual entry data
    if (item.fields.projects) {
      item.fields.projects = item.fields.projects.map((projectLink) => {
        const project = entries.find(
          (entry) => entry.sys.id === projectLink.sys.id
        );
        if (project && project.fields.thumbnail) {
          project.fields.thumbnail = resolveAsset(project.fields.thumbnail);
        }
        return project;
      });
    }

    return item;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw error;
  }
};
