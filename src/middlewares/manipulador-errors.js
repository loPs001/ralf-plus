import ErrorBase from "./errors/ErrorBase.js";

// eslint-disable-next-line no-unused-vars
function manipuladorErrors (error, req, res, next) {
    if (error instanceof ErrorBase) {
        return error.enviarResposta(res);
    }

    return new ErrorBase().enviarResposta(res);
}

export default manipuladorErrors;