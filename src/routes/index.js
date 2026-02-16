//recebe app como parametro.
import produtosRotas from "./routes-produtos.js"

const router = (app) => {
    app.use(produtosRotas);
}

export default router;
