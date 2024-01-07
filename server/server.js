import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  autoIndex: true,
});

app.post("/signup", (req, res) => {
  // Destructuring the request parameters
  const { username, email, password } = req.body;

  // Validate data from client
  if (username?.length < 3) {
    return res
      .status(403)
      .json({ error: "Username must be at least 3 characters in length" });
  }

  if (!email?.length) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res
      .status(403)
      .json({
        error:
          "Password should be 6-20 characters containing 1 numeric, 1 lowercase and 1 uppercase letter",
      });
  }

  return res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
