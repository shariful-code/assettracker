import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AssetService {
  // CREATE
  async createAsset(data) {
    const {
      assetName,
      brandId,
      specs,
      status,
      notes,
      purchaseDate,
      purchasePrice,
      categoryId,
      subCategoryId,
      vendorId,
    } = data;

    if (!assetName) {
      throw new Error("Asset name is required");
    }

    const asset = await prisma.asset.create({
      data: {
        assetName,
        brandId: brandId ? Number(brandId) : null,
        specs,
        status,
        notes,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        purchasePrice: purchasePrice ? Number(purchasePrice) : null,
        categoryId: categoryId ? Number(categoryId) : null,
        subCategoryId: subCategoryId ? Number(subCategoryId) : null,
        vendorId: vendorId ? Number(vendorId) : null,
      },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        vendor: true,
      },
    });

    return asset;
  }

  // GET ALL
  async getAssets() {
    return await prisma.asset.findMany({
      orderBy: { id: "desc" },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        vendor: true,
      },
    });
  }

  // GET BY ID
  async getAssetById(id) {
    const asset = await prisma.asset.findUnique({
      where: { id: Number(id) },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        vendor: true,
      },
    });

    if (!asset) {
      throw new Error("Asset not found");
    }

    return asset;
  }

  // UPDATE
  async updateAsset(id, data) {
    const asset = await prisma.asset.findUnique({
      where: { id: Number(id) },
    });

    if (!asset) {
      throw new Error("Asset not found");
    }

    return await prisma.asset.update({
      where: { id: Number(id) },
      data,
    });
  }

  // DELETE
  async deleteAsset(id) {
    const asset = await prisma.asset.findUnique({
      where: { id: Number(id) },
    });

    if (!asset) {
      throw new Error("Asset not found");
    }

    await prisma.asset.delete({
      where: { id: Number(id) },
    });

    return { message: "Asset deleted successfully" };
  }
}

export default new AssetService();
