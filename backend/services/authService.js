
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//////
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

class AuthService {
  async signup(data) {
    const { first_name, last_name, phone, email, password } = data;

    if (!first_name || !last_name || !phone || !email || !password) {
      return {
        success: false,
        status: 400,
        error: "All fields are required",
      };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        status: 400,
        error: "Email is already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    delete user.password;

    return {
      success: true,
      status: 201,
      message: "User registered successfully",
      data: user,
    };
  }


  // ---------------- LOGIN ----------------
  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      return {
        success: false,
        status: 400,
        error: "All fields are required",
      };
    }

    // find user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        success: false,
        status: 400,
        error: "Invalid email or password",
      };
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        status: 400,
        error: "Invalid email or password",
      };
    }

    // create token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // save token in DB
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    // remove password field before sending
    delete updatedUser.password;

    return {
      success: true,
      status: 200,
      message: "Login successful",
      token,
      data: updatedUser,
    };
  }

  // ---------------- LOGOUT ----------------
  async logout() {
    return {
      success: true,
      status: 200,
      message: "Logged out successfully",
    };
  }

}

export default new AuthService(); // Singleton instance
