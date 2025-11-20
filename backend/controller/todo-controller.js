const { Todo, Category } = require("../models");
const { Op } = require("sequelize");

const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority, due_date, category_id } =
      req.body;

    if (category_id) {
      const categoryCheck = await Category.findByPk(category_id);
      if (!categoryCheck) {
        return res.status(400).json({ message: "Invalid category_id" });
      }
    }

    const todo = await Todo.create({
      title,
      description,
      completed: completed ?? false,
      priority: priority ?? "low",
      due_date,
      category_id,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const getTodosById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const todo = await Todo.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status;
    const category = req.query.category;
    const priority = req.query.priority;

    const where = {};

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (status === "completed") where.completed = true;
    if (status === "incomplete") where.completed = false;

    if (priority) where.priority = priority;

    if (category) where.category_id = category;

    const { count, rows } = await Todo.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "color"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: rows,
      pagination: {
        current_page: page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, due_date, category_id } =
      req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (category_id) {
      const categoryCheck = await Category.findByPk(category_id);
      if (!categoryCheck) {
        return res.status(400).json({ message: "Invalid category_id" });
      }
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    todo.priority = priority;
    todo.due_date = due_date;
    todo.category_id = category_id;

    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createTodo,
  getAllTodos,
  getTodosById,
  updateTodo,
  deleteTodo,
};
