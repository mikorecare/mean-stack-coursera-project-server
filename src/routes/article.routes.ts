import { Router } from "express";
import ArticleController from "../controllers/article.controller";

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.get('/articles',articleController.getAllArticles);
articleRouter.post('/articles',articleController.createArticle)
export default articleRouter;
