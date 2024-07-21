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

    // Resolve picture links to actual asset data
    if (item.fields.pictures) {
      item.fields.pictures = item.fields.pictures.map((pictureLink) =>
        assets.find((asset) => asset.sys.id === pictureLink.sys.id)
      );
    }

    // Resolve background links to actual asset data
    if (item.fields.backgrounds) {
      item.fields.backgrounds = item.fields.backgrounds.map((backgroundLink) =>
        assets.find((asset) => asset.sys.id === backgroundLink.sys.id)
      );
    }

    // console.log("Processed Contentful data:", JSON.stringify(item, null, 2));

    return item;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw error;
  }
};
