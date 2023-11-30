import { Router } from "express";
import ArticleController from "../controllers/article.controller";

const articleRouter = Router();
const articleController = new ArticleController();

articleRouter.get('/employees',articleController.getAllArticles);

export default articleRouter;
