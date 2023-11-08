import mongoose, { Schema, Document } from 'mongoose';

interface Employee extends Document {
  name: string;
  age: number;
  role: string;
}

const roles = ["Entry-Level", "Junior-Developer", "Senior-Developer"];

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true, enum:roles },
});

const Employee = mongoose.model<Employee>('Employee', EmployeeSchema);

export default Employee;