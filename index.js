
// import express
const express = require('express')
const cors = require('cors')
const dataService = require('./services/dataservice')
const server = express() 
server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json()) 

server.listen(3000,()=>{
    console.log('e-commerce server is listening at port number 3000');
})


// all-products Api
server.get('/all-products',(req,res)=>{
    dataService.allProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

  // view-product api
server.get('/view-products/:productId',(req,res)=>{
    dataService.viewProduct(req.params.productId)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
}) 

  // addtowishlist api
  server.post('/add-to-wishlist',(req,res)=>{
    dataService.addtowishlist(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
}) 

// get-wishlist Api
server.get('/get-wishlist',(req,res)=>{
    dataService.getwishlist()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// remove-item-wishlist api
server.delete('/remove-item-wishlist/:productId',(req,res)=>{
    dataService.deleteItemWishlist(req.params.productId)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// register app call resolving
server.post('/register',(req,res) => {
    console.log('Inside register Api');
    console.log(req.body);
    // asynchronus 
    dataService.register(req.body.uname,req.body.email,req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// login app call resolving
server.post('/login',(req,res) => {
    console.log('Inside login Api');
    console.log(req.body);
    // asynchronus 
    dataService.login(req.body.uname,req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})