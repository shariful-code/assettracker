import AssetAssignmentService from "../services/assetMappingService.js";

class AssetAssignmentController {
  async assignAssets(req, res) {
    const { employeeId, assetIds } = req.body;
    const result = await AssetAssignmentService.assignAssetsToEmployee(employeeId, assetIds);
    res.status(result.responseCode).json(result);
  }

  async getAssetsByEmployee(req, res) {
    const employeeId = parseInt(req.params.id);
    const result = await AssetAssignmentService.getAssetsByEmployee(employeeId);
    res.status(result.responseCode).json(result);
  }

  async getEmployeesByAsset(req, res) {
    const assetId = parseInt(req.params.id);
    const result = await AssetAssignmentService.getEmployeesByAsset(assetId);
    res.status(result.responseCode).json(result);
  }
}

export default new AssetAssignmentController();
