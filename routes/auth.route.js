const authController= require('../controllers/user.controller');


module.exports= function(app){

    app.post('/users',authController.signup);

    app.post('/auth',authController.signin);


    
}