import conexao from "../connection/connection-sql.js";
import ErrorBase from "../middlewares/errors/ErrorBase.js";


//Para ativar __dirname, já que no ES Modules(import&export) não possui esse método:
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



class ProdutosController {

    static CriarProduto (req, res, next) {
        try {
            let nome = req.body.nome;
            let valor = req.body.valor;

            if(nome == "" || nome.length < 2 || valor == "" || isNaN(valor)) {
                return res.redirect("/falhaCadastro");            
            }
            if (!req.files || !req.files.imagem ) {
                return res.redirect("/falhaCadastro")
            }
            let imagem = req.files.imagem.name;

            //comando SQL:
            const sql = `INSERT INTO produtos (nome, valor, imagem) VALUE ( '${nome}', ${valor}, '${imagem}')`;

            conexao.query(sql, (error, retorno) => {
                if (error) {
                    return next(new ErrorBase())
                } else {
                    /*Variavel que guarda o caminho. Objetivo, se colocarmos normalmente, exemplo: 
                        req.files.imagem.mv(__dirname + "../../bancoimg + req..."));
                    Dará falha ao achar o arquivo "../../bancoimg", já que ele interpretará que essearquivos está em: src/routes/routes-produtos.js.
                    */

                    const caminhoDestino = path.resolve (__dirname, "..", "..", "banco-imagens", req.files.imagem.name);
                    req.files.imagem.mv(caminhoDestino);
                    console.log(retorno)

                    res.redirect("/okCadastro");//Redirecionamento
                }            
            });
        } catch  {
                res.redirect("/falhaCasdastro")       
        }
    }   

    static DeletarProdutos (req, res) {
        try {
               const sql = `DELETE FROM produtos WHERE codigo=${req.params.codigo};`
            conexao.query(sql, (error, retorno) => {
                if (error) {    
                    throw error;
                } else {
                    const caminhoDestino = path.resolve(__dirname, "..", "..", "banco-imagens", req.params.imagem);
                    fs.unlink(caminhoDestino, (error_imagem) => {
                        if (error_imagem) {
                            console.log("Houve um erro ao deletar a imagem");
                        } else {
                            console.log("Imagem deletada com sucesso")
                        }
                    });
                    console.log(retorno)
                }
            });
            res.redirect("/okRemover");
        } catch {
            res.redirect("/falhaRemover");
        }
 
    }

    static EdicaoProduto (req, res) {

        let nome = req.body.nome;
        let valor = req.body.valor;
        let codigo = req.body.codigo;//Identificar produto
        let nomeImagem = req.body.nomeImagem;
        
        try {
            if(nome == "" || nome.length < 2 || valor == "" || isNaN(valor)) {
                return res.redirect("/falhaEdicao");            
            }

            let imagem = req.files.imagem;

            let sql = `UPDATE produtos SET nome="${nome}", valor=${valor}, imagem="${imagem.name}" WHERE codigo=${codigo}`;

            conexao.query(sql, (error, retorno) => {
                if (error) {
                    throw error;
                } else {
                    const deletarImagem = path.resolve(__dirname, "..", "..", "banco-imagens", nomeImagem);
                    fs.unlink(deletarImagem, (error_imagem) =>{
                        if (error_imagem) {
                            console.log("Houve um erro ao deletar a imagem");
                        } else {
                            console.log("Imagem deletada com sucesso");
                        }
                    });
                    const substituirImagem = path.resolve(__dirname,"..", "..", "banco-imagens", imagem.name);
                    imagem.mv(substituirImagem);
                    console.log(retorno);
                } 
            });
            res.redirect("/okEdicao");
        } catch {
            let sql = `UPDATE produtos SET nome="${nome}", valor=${valor} WHERE codigo=${codigo}`;

            conexao.query(sql, (error) => {
                if (error) {
                    throw error;
                }
            });
            res.redirect("/okEdicao")
        }
    }
}

export default ProdutosController