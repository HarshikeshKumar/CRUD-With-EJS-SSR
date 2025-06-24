const express = require("express");
const app = express();
const path = require("path");
const userSchema = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.send("Hey");
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userSchema.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;

  let createdUser = await userSchema.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("Server is running at PORT: 3000");
});
