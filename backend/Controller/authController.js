// controllers/authController.js
import authService from "../services/authService.js";

class AuthController {
  async signup(req, res) {
    try {
      const result = await authService.signup(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }

  async logout(req, res) {
    try {
      const result = await authService.logout();
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error during logout",
      });
    }
  }
}

export default new AuthController();
