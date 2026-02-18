import express from "express"; // Importação express
import router from "./routes/index.js"; // Importação do router
import { engine } from "express-handlebars"; // Importação do express-handlebars
import conexao from "./connection/connection-sql.js"; // Importação da conexão.
import fileUpload from "express-fileupload"; // Fazer UPLOADS de arquivos;
import manipuladorErrors from "./middlewares/manipulador-errors.js";


const app = express(); //APP
//Adiciona o bootstrap:
app.use ("/bootstrap", express.static("./node_modules/bootstrap/dist")); 
//Configuração do Express-Handlebars:
app.engine ("handlebars", engine({ defaultLayout: "main",//"{ defaultLayout: "main" }" => Define como layout padrão !IMPORTANTE PARA CARREGAR A PÁGINA!
    helpers: {
      // Função auxiliar para verificar igualdade
      condicionalIgualdade: function (parametro1, parametro2, options) {
        return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
      }
    }
 }));

app.set('view engine', 'handlebars'); 
app.set('views', './views');
app.use("/css", express.static("./public/css")); // Ativação do CSS
app.use("/banco-imagens", express.static("./banco-imagens/"));//ref de pasta de arquivo, leitura.4c

app.use(fileUpload()) // Habilitação para fazer UPLOAD de arquivos.

//Conectando ao banco de dados:
conexao.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log("Conexão com o servidor MYSQL feita com sucesso!");
    }
});

// Rotas:
app.use(express.json());
app.use(express.urlencoded({extended: false}))/*Ele transforma dados do tipo texto em objeto. !IMPORTANTE PARA QUE O EXPRESS LEIA AS REQUISIÇÕES!*/


router(app);

app.use(manipuladorErrors); //Ele tem que ficar abaixo de router(app)


export default app;
