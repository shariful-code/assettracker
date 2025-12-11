import employeeService from "../services/employeeService.js";

class EmployeeController {

  // Create Employee
  async createEmployee(req, res) {
    const result = await employeeService.createEmployee(req.body);
    return res.status(result.responseCode).json(result);
  }

  // Get All Employees with pagination & search
  async getEmployees(req, res) {
    const { page, perpage, search } = req.query;
    const result = await employeeService.getEmployees({
      page: Number(page),
      perpage: Number(perpage),
      search: search || "",
    });
    return res.status(result.responseCode).json(result);
  }

  // Get Employee by ID
  async getEmployeeById(req, res) {
    const result = await employeeService.getEmployeeById(req.params.id);
    return res.status(result.responseCode).json(result);
  }

  // Update Employee
  async updateEmployee(req, res) {
    const result = await employeeService.updateEmployee(req.params.id, req.body);
    return res.status(result.responseCode).json(result);
  }

  // Delete Employee
  async deleteEmployee(req, res) {
    const result = await employeeService.deleteEmployee(req.params.id);
    return res.status(result.responseCode).json(result);
  }
}

export default new EmployeeController();
