import express from "express"; //Importação Express
import ProdutosController from "../controllers/produtos-controllers.js"
import PagesController from "../controllers/pages-controllers.js";


const routes = express.Router();

//Rotas de renderização:
routes.get("/", PagesController.PaginaPrincipal);
routes.get("/:situacao", PagesController.PaginaComSituacao);
routes.get("/editar/:codigo", PagesController.AbaEdicao);
//CRUD básico:
routes.post("/cadastrar", ProdutosController.CriarProduto );
routes.get("/remover/:codigo&:imagem", ProdutosController.DeletarProdutos);
routes.post("/edicao", ProdutosController.EdicaoProduto);

export default routes;