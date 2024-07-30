import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as projectRoutes } from "./routes/project";
import { router as userRoutes } from "./routes/user";
import { router as roleRoutes } from "./routes/role";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://NaitikBagia:W2NAVAtQuGxToPv7@practice-ts.mupvlif.mongodb.net/"
  )
  .then(() => {
    console.log("DB Connected");
    app.listen(3000);
  })
  .catch((err: any) => console.log(err));

app.use("/project", projectRoutes);
app.use("/role", roleRoutes)
app.use(userRoutes);