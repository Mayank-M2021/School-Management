import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false, // we use formidable instead
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "Image upload failed" });
    }

    try {
      const file = files.image[0];
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "schools",
      });

      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary error:", error);
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
  });
}
