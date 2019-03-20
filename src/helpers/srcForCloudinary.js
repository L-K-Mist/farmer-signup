  function srcForCloudinary(
      cloudName, publicId, transformation = "w_auto,h_240,c_fill,g_auto,q_auto,f_auto"
  ) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/${
          transformation
        }/${publicId}`
  }

  export default srcForCloudinary