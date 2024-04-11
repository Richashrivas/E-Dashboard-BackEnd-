const express = require('express');
const cors = require('cors');
const db = require('./Database/dbConfig');
const Product = require('./Database/productSchema');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const user = require('./Database/usersSchema')
// const upload = require('./Database/storage')
const app = express();

app.use(express.json());
app.use(cors());

// save Data in database
app.post('/register', async(req, res)=>{
    try{
        let data = new user(req.body);
        await data.validate();
        let result = await data.save();
        result.toObject(); //result object
        delete result.password; // here remove password field from object before sending to client
        console.log(result);
        Jwt.sign({data}, jwtKey, {expiresIn:'1h'}, (err, token)=>{
            if(err){
                res.send({result :'something went wrong, please try after sometime '})
            }
            res.send({ data, auth :token})
        })
    } catch(err){
        res.status(400).send(err.message);
    }
    
});

app.post('/login', async(req, res) => {
    if(req.body.password && req.body.email){
        let data = await user.findOne(req.body);
        if(data){
            Jwt.sign({data}, jwtKey, {expiresIn:'1h'}, (err, token)=>{
                if(err){
                    res.send({result :'something went wrong, please try after sometime '})
                }
                res.send({ data, auth :token})
            })
            
        }else{
            res.send({result : 'user not Found...'})
        }
    }else{
        res.send({result : 'user not Found...'})
    }
})

app.post('/add-product', async(req, res) =>{
    try{
        let product = new Product(req.body);
        await product.validate();
        let result = await product.save();
        res.send(result)
    }catch(err){
        // Internal server error message.
        res.status(400).send(err.message); 
    }
  
})

// Fetch data deom database 
app.get('/add-product-list', async(req, res) => {
    try{
        const products = await Product.find()
        if(products.length >0){
            res.send(products)
        }else{
            res.send({result:"No product Found.."})
        }
    } catch(err){
        res.status(500).send({error:'Internal Server Error.'});
    }
})

// delete api 
app.delete('/products/:id', async (req, res) =>{
    try{
        let data = await Product.deleteOne({_id:req.params.id
        })
        res.send(data)
    }catch(err){
        res.status(500).send({error:'Internal Server Error.'});
    }
})

// find one id for update product.
app.get('/products/:id', async(req, res)=>{
    try{
        let result = await Product.findOne({_id:req.params.id});
        if(result){
            res.send(result);
        }else{
            res.send({"result":"No Record Found"})
        }
    }catch(err){
        res.status(500).send({error:'Internal Server Error.'});
    }
    
});

app.put('/products/:id', async(req, res) =>{
    let result = await Product.updateOne(
        { _id: req.params.id },
        {$set: req.body}
        )
        res.send(result)
})

app.get('/search/:key', async(req, res) => {
    
    try{
        let result = await Product.find({
            "$or" :[
                { name: { $regex: req.params.key, $options: 'i' } }, // $options: 'i' use for search case-insensitive.
                { company: { $regex: req.params.key, $options: 'i'  } },
                { description: { $regex: req.params.key, $options: 'i'  } },
                // { price: req.params.key },
                { category: { $regex: req.params.key, $options: 'i' } }
            ]
        });
        res.send(result);
    } catch(err){
        res.status(500).send('Internal Server Error');
        console.log('Internal Server Error');
    }
})

// const Data =async()=>{
//     const product = await proShcema.find()
//     console.log(product)
// } 

// Data();

// const insertData= async()=>{
//     const product = await proShcema.insertMany({
//         name: 'LG Smart TV',
//         price: 15000,
//         brand: 'LG',
//         category: 'TV'
//     })
//     console.log(product)
// }

// insertData()

app.listen(5000, () => {
    console.log("Server is listening on Port 5000");
  });