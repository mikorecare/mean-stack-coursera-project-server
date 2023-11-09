import { Request, Response, NextFunction } from 'express';
import Employee from '../schemas/employee-model';
import mongoose from 'mongoose';

class EmployeeController {
  async createEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName,lastName, age, role } = req.body;

    const employee = new Employee({firstName, lastName, age, role });
    await employee.save()
    .then((save)=>{
      res.status(200).send(save);
    })
    .catch((err:any)=>{
      next({err});
    })
    
  }

  async getAllEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    await Employee.find({})
      .then((employees: any) => {
        res.send(employees);
      })
      .catch((err: any) => {
        console.error('Error fetching employees:', err);
        res.status(500).send('Internal Server Error');
      });
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(req.params.id)
    const id = req.params.id
    await Employee.findById(id)
      .then((employee: any) => {
        if (!employee) {
          res.status(404).send('Employee not found');
        } else {
          res.send(employee);
        }
      })
      .catch((err: any) => {
        console.error('Error fetching employee by ID:', err);
        res.status(500).send('Internal Server Error');
      });
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const { firstName,lastName, age, role } = req.body;
    await Employee.findByIdAndUpdate(id, { firstName,lastName, age, role }, { new: true })
      .then((employee: any) => {
        if (!employee) {
          res.status(404).send('Employee not found');
        } else {
          res.send(employee);
        }
      })
      .catch((err: any) => {
        console.error('Error updating employee:', err);
        res.status(500).send('Internal Server Error');
      });
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    console.log(id)
    await Employee.findOneAndDelete({_id:id})
      .then((employee: any) => {
        if (!employee) {
          res.status(404).send([]);
        } else {
          res.status(200).send(employee);
        }
      })
      .catch((err: any) => {
        console.error('Error deleting employee:', err);
        res.status(500).send('Internal Server Error');
      });
  }
}

export default EmployeeController;