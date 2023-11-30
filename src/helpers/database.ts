import mongoose, { Schema, Document } from 'mongoose';

interface Employee extends Document {
  name: string;
  age: number;
  role: string;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
});

const Employee = mongoose.model<Employee>('Employee', EmployeeSchema);

interface Article extends Document{
  id: string;
  url: string;
  author: string;
  publishedAt: Date;
  title: string;
  type: string;
  featureImgUrl?: string;
  description?: string;
  videoUrl?: string;
  adBannerUrl?: string;
}

const articleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  featureImgUrl: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  adBannerUrl: { type: String },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;

export default Employee;