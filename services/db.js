const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/ecommerce',()=>{
    console.log('MongoDb connection Successful!!!');
})

// to store all products
const Product = mongoose.model('Product',
{
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
  }
)


// to store wishlist
const Wishlist = mongoose.model('Wishlist',
{
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
  }
)

// collection - users
const User = mongoose.model('User',{
    username:String,
    email:String,
    password:String
 })


module.exports = {
    Product,
    Wishlist,
    User
}