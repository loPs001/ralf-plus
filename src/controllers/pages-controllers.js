import conexao from "../connection/connection-sql.js";


class PagesController {

    static PaginaPrincipal (req, res) {
        const sql = `SELECT*FROM produtos`;

        conexao.query(sql, (error, retorno) => {
            if (error) {
                throw error;
            } else {
                res.render('formulario', {produtos:retorno})// retorno do obejto.
            }
        })

    }

    static PaginaComSituacao (req, res) {
        const sql = `SELECT*FROM produtos`;
        conexao.query(sql, (error, retorno) => {
            if (error) {
                throw error;
            } else {
                res.render("formulario", {produtos:retorno,  situacao: req.params.situacao})
            }
        });
    }



     static AbaEdicao (req, res) {
        
        try {
            const sql = `SELECT * FROM produtos WHERE codigo = ${req.params.codigo}`;
        conexao.query(sql, (error, retorno) =>{
            if (error) {
                throw error;
            } else {
                res.render("formularioEditar", {produtos:retorno[0]});
            }
        });
        } catch (error) {
            return error;
        }
        
    }

}

export default PagesController;