import express from "express"
import ProductManager from "./components/fileSystem.js"

    const app = express();
    app.use(express.urlencoded({extended : true}));

    const product = new ProductManager();

    const readProduct = product.readProduct();
    //console.log(await readProduct)

    app.get("/product", async (req, res) => {
        let limit = parseInt(req.query.limit)
        if(!limit) return res.send(await readProduct)

        let allProduct = await readProduct
        let productLimit = allProduct.slice(0, limit)
        //console.log(limit)
        res.send(productLimit)
    })

    app.get("/product/:id", async (req, res) => {
        let id = parseInt(req.params.id)
        let allProduct = await readProduct
        //console.log(id)

        let productById = allProduct.find(product => product.id === id)
        res.send(productById)
    })
    const PORT = 8080
    const server = app.listen(PORT, () => {
        console.log(`Express por Local Host ${server.address().port}`)
    })

    server.on("error", (error) => console.log(`Error en el servidor $(error)`))