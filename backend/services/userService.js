// services/UserService.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class userService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        token: true,
        createdAt: true,
        updatedAt: true,
        // password excluded
      },
      orderBy: { id: 'asc' },
    });
  }




async updateUser(id, data) {
    const userId = parseInt(id, 10); // convert string to integer

    if (!data || Object.keys(data).length === 0) {
      throw new Error('No fields to update');
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

 // delete user by id
  async deleteUser(id) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: Number(id) }, // id must be number
      });
      return deletedUser;
    } catch (error) {
      // If user not found, Prisma throws an error
      if (error.code === 'P2025') {
        return null; // handle "record not found"
      }
      throw new Error(error.message);
    }
  }
  
}

export default new userService();
