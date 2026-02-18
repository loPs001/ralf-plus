import ErrorBase from "./ErrorBase.js";

class Error404 extends ErrorBase {
    constructor (mensagem = "Não foi possivel encontrar o produto...") {
        super(mensagem, 404)
    }
}

export default Error404;