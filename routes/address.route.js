const addressController= require('../controllers/address.controller');
const addMiddleWares= require('../middlewares/auth')

module.exports= function(app){

    app.post('/addresses',addMiddleWares.verifyToken,addressController.addAddress);

    
}