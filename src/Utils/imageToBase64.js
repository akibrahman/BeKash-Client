export const imageToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      // The result property contains the base64 string
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
  });
};
