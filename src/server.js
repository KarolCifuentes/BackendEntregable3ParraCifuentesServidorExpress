import express from "express"
import ProductManager from "./components/fileSystem.js"

const app = express();
app.use(express.urlencoded({extended : true}))

const product = new ProductManager()

const readProduct = product.readProduct()
//console.log(await readProduct)

app.get("/product", async (req, res) => {
res.send(await readProduct)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error en el servidor $(error)`))