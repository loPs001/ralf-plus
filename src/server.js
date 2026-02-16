
import app from "./app.js"

const PORT = 3000 // Porta HTTP
//Conexão com o Server
app.listen(PORT, () => {
    console.log(`Servidor conectado com sucesso!\nAcesse: http://localhost:${PORT}/`)
})
