import { Request, Response, NextFunction } from 'express';
import Article from '../schemas/article-model';

class ArticleController{
    async getAllArticles(req:Request,res:Response,next:NextFunction): Promise<void> {
        await Article.find({})
        .then((articles: any) => {
          res.send(articles);
        })
        .catch((err: any) => {
          console.error('Error fetching employees:', err);
          res.status(500).send('Internal Server Error');
        });
    }



}

export default ArticleController