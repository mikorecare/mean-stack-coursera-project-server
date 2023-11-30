
import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document{
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
  
  const Article = mongoose.model<IArticle>('Article', articleSchema);
  
export default Article;