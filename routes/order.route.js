const orderController= require('../controllers/order.controller');
const orderMiddleware= require('../middlewares/auth');


module.exports= function(app){

    app.post('/orders',orderMiddleware.verifyToken,orderController.createOrder);
}