import conexao from "../connection/connection-sql.js";
import ErrorBase from "./errors/ErrorBase.js";
import Error404 from "./errors/Error404.js";
 
function Verificador (req, res, next) {
    const codigo = req.params.codigo;
        const sql = `SELECT EXISTS (SELECT 1 FROM produtos WHERE codigo=${codigo}) AS existe`;
        
        conexao.query(sql, (error, retorno) => {
            if (error) {
                return new ErrorBase();
            } else {
                const produtoExistente = retorno[0].existe === 1;
                if (produtoExistente !== true) {
                    return next(new Error404);
                } else {
                     return next();
                }
            }
        });
}

export default Verificador;