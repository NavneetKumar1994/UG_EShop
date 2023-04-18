const productController= require('../controllers/product.controller');
const authMiddleware= require('../middlewares/auth')


module.exports= function(app){

    app.post('/products',[authMiddleware.verifyToken,authMiddleware.isAdminCheck],productController.saveProduct);

    app.put('/products/:_id',[authMiddleware.verifyToken,authMiddleware.isAdminCheck],productController.update);

    app.get('/products',productController.findProduct);

    app.get('/products/categories',productController.Categories);

    app.get('/products/:_id',productController.productById);

    app.delete('/products/:_id',[authMiddleware.verifyToken,authMiddleware.isAdminCheck],productController.deleteProduct);
}