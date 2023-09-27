/*const fs = require('fs')*/
/*import {promises as fs} from "fs"

const persona = async()=>{
    await fs.writeFile("./persona.txt", "Prueba de archivo") //writeFile crear y actualizar
    await fs.appendFile("./persona.txt", "\n archivo listo")  //appendFile agregar sin pisar
    let respuesta  = await fs.readFile("./persona.txt", "utf-8") //devuelve bytes Toca pasar un formato
    console.log(respuesta)
    await fs.unlink("./persona.txt") //oculta el archivo
};

persona()*/


import {promises as fs} from "fs"

 export default class ProductManager {
    constructor() {
        this.patch = "./product.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++
        let newProduct ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }
        //console.log(newProduct)
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }


    readProduct = async () => {

        let productTxt = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(productTxt)
    }


    getProduct = async () => {

        let resProductTxt = await this.readProduct()
        return console.log(resProductTxt)
    }


     getProductById = async (id) => {
        let resProduct = await this.readProduct()
        //let filter = resProduct.find(product => product.id === id)
        //console.log(filter)
        if(!resProduct.find(product => product.id === id)){
            console.log("El producto no se encuentra")
        }else{
            console.log(resProduct.find(product => product.id === id))
        }
     }


     deleteProductById = async (id) => {
        let delProduct = await this.readProduct()
        let productFilter = delProduct.filter(product => product.id != id)

        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("El producto "+id+" se elimino")
     }


     updateProduct = async ({id, ...product}) => {
        await this.deleteProductById(id)

        let productOld = await this.readProduct()
        //console.log(productOld)

        let productModified = [{ ...product, id}, ...productOld];
        //console.log(productModified)
        await fs.writeFile(this.patch, JSON.stringify(productModified))
     }
 }

//const product = new ProductManager()

/*product.addProduct("title1", "description1", 500, "thumbnail1", "0001", 2)
 product.addProduct("title2", "description2", 1.000, "thumbnail2", "0002", 1)
 product.addProduct("title3", "description3", 200, "thumbnail3", "0003", 7)
 product.addProduct("title4", "description4", 900, "thumbnail4", "0004", 18)
 product.addProduct("title5", "description5", 3.000, "thumbnail5", "0005", 98)
 product.addProduct("title6", "description6", 70, "thumbnail6", "0006", 4)
 product.addProduct("title7", "description7", 1, "thumbnail7", "0007", 7)
 product.addProduct("title8", "description8", 77, "thumbnail8", "0008", 9)
 product.addProduct("title9", "description9", 66, "thumbnail9", "0009", 16)
 product.addProduct("title10", "description10", 98, "thumbnail10", "00010", 34)*/

//product.getProduct()

//product.getProductById(4)

//product.deleteProductById(2)

/*product.updateProduct({
     title: 'title1',
     description: 'description1',
     price: 800,
     thumbnail: 'thumbnail1',
     code: '0001',
     stock: 44,
     id: 1
})*/
