const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const api = import.meta.env.VITE_IMGBB;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${api}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      console.log(data.data);
      return data.data.url; // URL of the uploaded image
    } else {
      console.error("ImgBB upload failed:", data.error.message);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    return null;
  }
};

export default uploadImageToImgBB;
