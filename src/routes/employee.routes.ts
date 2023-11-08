import { Router } from "express";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.get('/employees',employeeController.getAllEmployees);
employeeRouter.get('/employees/:id',employeeController.getEmployeeById);
employeeRouter.post('/employees',employeeController.createEmployee);
employeeRouter.put('/employees/:id',employeeController.updateEmployee);
employeeRouter.delete('/employees/:id',employeeController.deleteEmployee);

export default employeeRouter;
