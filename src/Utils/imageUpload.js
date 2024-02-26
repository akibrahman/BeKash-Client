import axios from "axios";

export const imageUpload = async (image, link) => {
  try {
    if (!image) {
      return link;
    }
    const imageData = new FormData();
    imageData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      imageData
    );
    return data.data.display_url;
  } catch (error) {
    console.log(error);
  }
};
