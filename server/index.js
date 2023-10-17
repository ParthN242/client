import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

// social
// social123

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/post", postRouter);
app.use("/user", userRouter);

const CONNECTION_URL =
  "mongodb+srv://social:social123@cluster0.yeva5kg.mongodb.net/";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server runnig on port ${5000}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

// mongoose.set("useFindAndModify", false);
