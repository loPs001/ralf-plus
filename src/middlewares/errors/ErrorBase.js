class ErrorBase extends Error {
    constructor (mensagem = "houve um problema no servidor...", status = 500) {
        super();
        this.mensagem = mensagem
        this.status = status
    }
    
    enviarResposta (res) {
        res.status(this.status).send({
            mensagem: this.mensagem,
            status: this.status
        }) 
    }
}

export default ErrorBase;
