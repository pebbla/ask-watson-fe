import { Storage } from "@google-cloud/storage";
import express from "express";
import cors from "cors";
import { format } from "util";
import Multer from "multer";

const app = express();
const port = 5001;
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

app.use(cors());

const cloudStorage = new Storage({
  keyFilename: `./server/key/pelagic-berm-360511-71c14e380658.json`,
  projectId: "pelagic-berm-360511",
});

const bucketName = "ask_watson";
const bucket = cloudStorage.bucket(bucketName);

app.post("/upload-file-to-cloud-storage", multer.single("file"), function (req, res, next) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  console.log("req: ");
  console.dir(req)
  console.log("dst-folder: " + req.body["dst-folder"]);

  const blob = bucket.file("crawling/"+ req.body["dst-folder"] + "/" + req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    res.status(200).json({ publicUrl });
    console.log("publicUrl: " + publicUrl);
  });
  blobStream.end(req.file.buffer);
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
