const Router = require("express").Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category-controller");

Router.get("/categories", getAllCategories);
Router.get("/categories/:id", getCategoryById);
Router.post("/categories", createCategory);
Router.put("/categories/:id", updateCategory);
Router.delete("/categories/:id", deleteCategory);

module.exports = Router;
