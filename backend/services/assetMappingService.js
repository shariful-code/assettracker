import { PrismaClient } from "@prisma/client";
import { SuccessResponse, ErrorResponse } from "../utils/return.js";

const prisma = new PrismaClient();

class AssetAssignmentService {
  async assignAssetsToEmployee(employeeId, assetIds) {
    try {
      if (!employeeId || !assetIds?.length) {
        return ErrorResponse(400, "Employee or assets missing");
      }

      const assignments = await Promise.all(
        assetIds.map((assetId) =>
          prisma.assetAssingmentEmployee.upsert({
            where: { assetId_employeeId: { assetId, employeeId } },
            update: {},
            create: { assetId, employeeId },
          })
        )
      );

      return SuccessResponse(200, "Assets assigned successfully", assignments);
    } catch (err) {
      console.error(err);
      return ErrorResponse(500, "Server error", err);
    }
  }

  async getAssetsByEmployee(employeeId) {
    try {
      const assets = await prisma.assetAssingmentEmployee.findMany({
        where: { employeeId },
        include: { asset: true },
      });

      return SuccessResponse(200, "Assets fetched successfully", assets);
    } catch (err) {
      console.error(err);
      return ErrorResponse(500, "Server error", err);
    }
  }

  async getEmployeesByAsset(assetId) {
    try {
      const employees = await prisma.assetAssingmentEmployee.findMany({
        where: { assetId },
        include: { employee: true },
      });

      return SuccessResponse(200, "Employees fetched successfully", employees);
    } catch (err) {
      console.error(err);
      return ErrorResponse(500, "Server error", err);
    }
  }
}

export default new AssetAssignmentService();
