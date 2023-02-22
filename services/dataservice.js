

const db = require('./db')

// all-products
const allProducts = ()=>{
  return  db.Product.find().then(
    (result)=>{
    if(result){
        return{
            statusCode:200,
            products:result
        }
    }
    else{
        return{
            statusCode:404,
            message:"No data is present"
        }
    }
  })
}

// view-product
const viewProduct = (id)=>{
    return db.Product.findOne({
        id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"Product is unavailable"
            }
        }
    })
}

// addtowishlist
const addtowishlist = (product)=>{
    return db.Wishlist.findOne({
        id:product.id
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Product already in the wishlist"
            }
        }
        else{
            let newProduct = new db.Wishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: {
                    rate: product.rating.rate,
                    count: product.rating.count
                }
            })
            newProduct.save()
            return{
                statusCode:200,
                message:"Item added to yor wishlist"
            }
        }
    })
}

// getwishlist
const getwishlist = ()=>{
    return db.Wishlist.find().then(
        (result)=>{
        if(result){
            return{
                statusCode:200,
                wishlist:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"Wishlist is empty"
            }
        }
      })  
}

// deleteItemWishlist
const deleteItemWishlist = (id)=>{
    return db.Wishlist.deleteOne({id})
    .then((result)=>{
        if(result){
            // if deleted successfully then get the updated wishlist
            return db.Wishlist.find().then(
                (result)=>{
                if(result){
                    return{
                        statusCode:200,
                        wishlist:result
                    }
                }
                else{
                    return{
                        statusCode:404,
                        message:"Wishlist is empty"
                    }
                }
              })  
        }
        else{
            return{
                statusCode:404,
                message:"Item not Found"
            }
        }
    })
}

// register
const register = (uname,email,pswd) => {
    console.log('Inside register function in data service');
    // asynchronus function
    // check acno is in mongodb  - db.users.findOne()
    return db.User.findOne({
            username:uname
    }).then((result)=> {
        console.log(result);
        if(result){
            // uname already exist
            return {
                statusCode: 403,
                message: 'Account Already exist!!'
            }
        }
        else {
            // to add new user
            const newUser = new db.User({
                username: uname,
                email,
                password: pswd
            })
            // to save new user in mongodb use save()
            newUser.save()
            return {
                statusCode: 200,
                message: 'Registration Successfull.....'
            }
        }
    })
}

// login
const login = (uname,pswd)=>{
    console.log("Inside login function body");
    // asynchronus function
    // check acno is in mongodb  - db.users.findOne()
    return db.User.findOne({
        username:uname,
        password:pswd
    }).then((result) => {
        console.log(result);
        if(result){
            return {
                statusCode: 200,
                message: 'Login Successfull.....'
            }
        }
        else {
            return {
                statusCode:404,
                message:"Invalid Username / Password"
            }
        }
    })
}

module.exports = {
    allProducts,
    viewProduct,
    addtowishlist,
    getwishlist,
    deleteItemWishlist,
    register,
    login
}