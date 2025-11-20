require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("../backend/models");
const categoryRouter = require("./router/category-router");
const todoRouter = require("./router/todo-router");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Industrix API Running..." });
});

const PORT = process.env.PORT || 4000;

app.use("/api", categoryRouter);
app.use("/api", todoRouter);

(async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
