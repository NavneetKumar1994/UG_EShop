const Product= require('../models/product.model');



exports.saveProduct= async (req,res)=>{

    const productBody= {
        name:req.body.name,
        availableItems:req.body.availableItems,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        imageUrl:req.body.imageUrl,
        manufacturer: req.body.manufacturer
     }
     try{
     const product= await Product.create(productBody);
        res.status(201).send({
            name:product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            manufacturer: product.manufacturer,
            availableItems: product.availableItems
        })
     }catch(err){
        if(err){
            res.status(400).send({
                message: err.message
            })
        }else{
        res.send(500).send({
            message:"Internal server error."
        })
    }
    }

}


exports.findProduct= async (req,res)=>{

    let productQuery={};
    let categoryReq= req.query.category;
    let directionReq= req.query.direction;
    let nameReq= req.query.name;
    let sortByReq= req.query.sortBy;


    if(categoryReq){
          productQuery.category= categoryReq;
    }if(directionReq){
        productQuery.direction= directionReq;
    }if(categoryReq){
        productQuery.nameReq= nameReq;
    }if(categoryReq){
        productQuery.sortBy= sortByReq;
    }
    try{

        const product= await Product.findOne(productQuery);
        res.status(200).send(product);

    }catch(err){
        res.send(500).send({
            message:"Internal server error."
        })
    }

}


exports.Categories= async  (req,res)=>{

    var categories=[];

    const products= await Product.find({});
    
    products.forEach((product)=>{  
        if(!categories.includes(product.category)){ 
           categories.push(product.category)
        }
    })
    res.status(200).send(categories);
}



exports.productById= async (req,res)=>{
    const idReq= req.params._id;

    try{
        const product= await Product.findOne({_id:idReq});

        if(!product){
            res.status(404).send(`No product found for ID-${idReq}!`)
        }

        const productRes= {
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            manufacturer: product.manufacturer,
            availableItems: product.availableItems,
            imageUrl: product.imageUrl
        }

        res.status(200).send(productRes);
        

    }catch(err){
        if(err){
            res.status(400).send({
                message: err.message
            })
        }else{
        res.send(500).send({
            message:"Internal server error."
        })
    }
    }
}


exports.update= async (req,res)=>{
    const idReq= req.params._id;

    try{
        const product= await Product.findOne({_id:idReq});

        if(!product){
            res.status(404).send(`No product found for ID-${idReq}!`);
        }

        product.name=req.body.name?req.body.name:product.name;
        product.category=req.body.category?req.body.category:product.category;
        product.price=req.body.price?req.body.price:product.price;
        product.description=req.body.description?req.body.description:product.description;
        product.manufacturer=req.body.manufacturer?req.body.manufacturer:product.manufacturer;
        product.availableItems=req.body.availableItems?req.body.availableItems:product.availableItems;

        const newProduct= await product.save();

        res.status(201).send({
            name:newProduct.name,
            category: newProduct.category,
            price: newProduct.price,
            description: newProduct.description,
            manufacturer: newProduct.manufacturer,
            availableItems: newProduct.availableItems,
            imageUrl: newProduct.imageUrl

        })
    }catch(err){
        if(err){
            res.status(400).send({
                message: err.message
            })
        }else{
        res.send(500).send({
            message:"Internal server error."
        })
    }
    }
}

exports.deleteProduct= async (req,res)=>{
       const idReq= req.params._id;

       try{
        const product= await Product.findOne({_id:idReq});

        if(!product){
            res.status(404).send(`No product found for ID-${idReq}!`);
        }

        res.status(200).send(`Product with ID - ${idReq} deleted successfully!`)


          }catch(err){
        if(err){
            res.status(400).send({
                message: err.message
            })
        }else{
        res.send(500).send({
            message:"Internal server error."
        })
    }
    }


}