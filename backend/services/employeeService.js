import { PrismaClient } from "@prisma/client";
import { SuccessResponse, ErrorResponse } from "../utils/return.js";

const prisma = new PrismaClient();

class EmployeeService {
  async createEmployee(data) {
    try {
      const { fullName, email, phone, designation, departmentId } = data;

      // Check if employee already exists
      const exists = await prisma.employee.findUnique({ where: { email } });
      if (exists) {
        return ErrorResponse(400, "Employee already exists");
      }

      const employee = await prisma.employee.create({
        data: {
          fullName,
          email,
          phone,
          designation,
          departmentId: departmentId ? Number(departmentId) : null,
        },
      });

      return SuccessResponse(201, "Employee created successfully", employee);
    } catch (err) {
      return ErrorResponse(500, err.message || "Server Error");
    }
  }

async getEmployees({ page, perpage, search }) {
  try {
    if (!page || !perpage) {
      return ErrorResponse(400, "Page and perpage are required");
    }

    let filters = {};

    // Search by fullName, email, phone, designation (multiple terms)
    if (search) {
      const terms = search.trim().split(/\s+/);
      filters = {
        AND: terms.map((term) => ({
          OR: [
            { fullName: { contains: term, mode: "insensitive" } },
            { email: { contains: term, mode: "insensitive" } },
            { phone: { contains: term, mode: "insensitive" } },
            { designation: { contains: term, mode: "insensitive" } },
          ],
        })),
      };
    }

    const total = await prisma.employee.count({ where: filters });

    const employees = await prisma.employee.findMany({
      where: filters,
      include: { department: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perpage,
      take: perpage,
    });
    
    //console.log("serviceback:", employees)

    return SuccessResponse(200, "Employees fetched successfully", {
      employees,
      total,
      page,
      perpage,
    });
  } catch (err) {
    return ErrorResponse(500, err.message || "Server Error");
  }
}


  async getEmployeeById(id) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) },
        include: { department: true },
      });

      if (!employee) return ErrorResponse(404, "Employee not found");

      return SuccessResponse(200, "Employee fetched successfully", employee);
    } catch (err) {
      return ErrorResponse(500, err.message || "Server Error");
    }
  }

  async updateEmployee(id, data) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) },
      });
      if (!employee) return ErrorResponse(404, "Employee not found");

      const updatedEmployee = await prisma.employee.update({
        where: { id: Number(id) },
        data: {
          fullName: data.fullName,
          phone: data.phone,
          designation: data.designation,
          status: data.status,
          departmentId: data.departmentId ? Number(data.departmentId) : null,
        },
      });

      return SuccessResponse(200, "Employee updated successfully", updatedEmployee);
    } catch (err) {
      return ErrorResponse(500, err.message || "Server Error");
    }
  }

  async deleteEmployee(id) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) },
      });
      if (!employee) return ErrorResponse(404, "Employee not found");

      await prisma.employee.delete({ where: { id: Number(id) } });

      return SuccessResponse(200, "Employee deleted successfully");
    } catch (err) {
      return ErrorResponse(500, err.message || "Server Error");
    }
  }
}

export default new EmployeeService();
