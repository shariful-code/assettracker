// controllers/category.controller.js
import categoryService from "../services/categoryService.js";

class categoryController {
  async create(req, res) {
    try {
      const data = req.body;
      const category = await categoryService.createCategory(data);

      res.status(201).json({
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// CategoryController.js
async getAll(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = parseInt(req.query.perpage) || 20;
    const search = req.query.search || "";

    const result = await categoryService.getAllCategories({ page, perpage, search });

    if (!result.success) {
      return res.status(result.status).json(result.data);
    }

    res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, data: { error: "Server error" } });
  }
}

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const category = await categoryService.getCategoryById(id);

      res.json(category);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const updated = await categoryService.updateCategory(id, data);

      res.json({
        message: "Category updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deleteCategoryOrSub(req, res) {
    try {
      const { id } = req.params;

      const message = await categoryService.deleteCategoryOrSub(id);

      return res.json({ message });
    } catch (error) {
      console.error("Delete Error:", error.message);
      return res
        .status(500)
        .json({ message: error.message || "Failed to delete" });
    }
  }
}

export default new categoryController();
