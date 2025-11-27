// controllers/UserController.js
import UserService from "../services/userService.js";

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }


async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No data provided to update' });
    }

    try {
      const updatedUser = await UserService.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: error.message });
    }
  }


   async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const deletedUser = await UserService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

export default new UserController();
