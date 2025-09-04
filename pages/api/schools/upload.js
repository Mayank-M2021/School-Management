import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), "public/schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const form = formidable({
        multiples: false,
        uploadDir,
        keepExtensions: true, // keep .jpg, .png etc.
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("Upload error:", err);
          return res.status(500).json({ error: "File upload failed" });
        }

        let imageFileName = null;

        if (files?.image) {
          const file = Array.isArray(files.image)
            ? files.image[0]
            : files.image;

          const oldPath = file.filepath;
          imageFileName = file.newFilename;
          const newPath = path.join(uploadDir, imageFileName);

          // Move file to /public/schoolImages
          fs.renameSync(oldPath, newPath);
        }

        return res.status(200).json({
          success: true,
          filename: imageFileName,
        });
      });
    } catch (error) {
      console.error("Upload exception:", error);
      return res.status(500).json({ error: "Server error during upload" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
