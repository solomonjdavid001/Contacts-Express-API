const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDB();

const app = express();
const PORT = process.env.PORT;

const contactRouter = require("./routes/contact.routes");
const userRouter = require("./routes/auth/user.routes");

app.use(express.json());
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, (req, res) => {
  console.log(`⚙️ Server listening on PORT 🔌 : ${PORT}`);
});
