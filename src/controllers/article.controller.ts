import { Request, Response, NextFunction } from 'express';
import Article from '../schemas/article-model';

class ArticleController{
    async getAllArticles(req:Request,res:Response,next:NextFunction): Promise<void> {
        await Article.find({})
        .then((articles: any) => {
            console.log(articles)
          res.send(articles);
        })
        .catch((err: any) => {
          console.error('Error fetching employees:', err);
          res.status(500).send('Internal Server Error');
        });
    }

    async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { url, author, publishedAt, title, type, featureImgUrl, adBannerUrl, videoUrl, description } = req.body; 
        const articleData: any = { url, author, publishedAt, title, type };
        if (featureImgUrl) articleData.featureImgUrl = featureImgUrl;
        if (adBannerUrl) articleData.adBannerUrl = adBannerUrl;
        if (videoUrl) articleData.videoUrl = videoUrl;
        if (description) articleData.description = description;
    
        const article = new Article(articleData);
    
        await article.save()
            .then((save) => {
                res.status(200).send(save);
            })
            .catch((err: any) => {
                next({ err });
            });
    }


}

export default ArticleController