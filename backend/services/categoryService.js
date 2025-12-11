import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class categoryService {
  // CREATE
  async createCategory(data) {
    try {
      const category = await prisma.category.create({
        data: {
          name: data.name,
          parentId: data.parentId || null,
        },
      });
      return category;
    } catch (error) {
      console.error("Create Category Error:", error);
      throw new Error("Failed to create category");
    }
  }

  // GET ALL (with parent + children)
// CategoryService.js
async getAllCategories({ page, perpage, search }) {
  try {
    const filters = {
      parentId: null,
      ...(search
        ? { name: { contains: search, mode: "insensitive" } }
        : {}),
    };

    const total = await prisma.category.count({ where: filters });

    const categories = await prisma.category.findMany({
      where: filters,
      include: { children: true },
      orderBy: { id: "asc" },
      skip: (page - 1) * perpage,
      take: perpage,
    });

    return {
      success: true,
      status: 200,
      data: { categories, total, page, perpage },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      data: { error: error.message || "Server Error" },
    };
  }
}


  // GET SINGLE
  async getCategoryById(id) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          parent: true,
          children: true,
        },
      });

      if (!category) throw new Error("Category not found");

      return category;
    } catch (error) {
      console.error("Get Category Error:", error);
      throw new Error(error.message || "Failed to fetch category");
    }
  }

  // UPDATE
  async updateCategory(id, data) {
    try {
      const updated = await prisma.category.update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          parentId: data.parentId ?? undefined,
          is_active: data.is_active ?? undefined,
        },
      });

      return updated;
    } catch (error) {
      console.error("Update Category Error:", error);
      throw new Error("Failed to update category");
    }
  }

  // DELETE Category or Subcategory
    async deleteCategoryOrSub(id) {
    const categoryId = Number(id);

    // find the category
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error("Category or Subcategory not found");
    }

    if (category.parentId === null) {
      // CASE 1: Parent category -> delete all subcategories
      await prisma.category.deleteMany({
        where: { parentId: categoryId },
      });

      await prisma.category.delete({
        where: { id: categoryId },
      });

      return "Category and all subcategories deleted successfully";
    } else {
      // CASE 2: Subcategory
      await prisma.category.delete({
        where: { id: categoryId },
      });

      return "Subcategory deleted successfully";
    }
  }
}

export default new categoryService();
