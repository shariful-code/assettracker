import assetService from "../services/assetService.js";

class AssetController {
  async createAsset(req, res) {
    try {
      const asset = await assetService.createAsset(req.body);
      res.status(201).json({
        message: "Asset created successfully",
        data: asset,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAssets(req, res) {
    try {
      const assets = await assetService.getAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAssetById(req, res) {
    try {
      const asset = await assetService.getAssetById(req.params.id);
      res.json(asset);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateAsset(req, res) {
    try {
      const asset = await assetService.updateAsset(req.params.id, req.body);
      res.json({
        message: "Asset updated successfully",
        data: asset,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteAsset(req, res) {
    try {
      const result = await assetService.deleteAsset(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new AssetController();
