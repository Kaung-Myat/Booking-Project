const express = require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller');
const { application } = require('express');

// route.use(function(req, res, next){
//     if(req.session.isLoggined){
//         next();
//     }else{
//         return res.redirect('/login');
//     }
// });


/** 
 * @description Root Route
 * @method GET
*/
route.get('/',services.homeRoute)


/**
 * @description get admin login
 * @method GET
 */
 route.get('/login',services.getLogin);


/** 
 * @description client result
 * @method GET
*/
route.get('/result',services.result)


/** 
 * @description admin dashboard
 * @method GET
*/
route.get('/admin',services.admin)


/** 
 * @description admin add description
 * @method GET
*/
route.get('/add',services.add_description)


/**
 * @description admin view 
 * @method GET
 */
route.get('/api/admin/:id/view',services.view_description)

//client add user
route.post('/student',services.addStudent)


/**
 * @description post data from admin login
 * @method POST
 */
route.post('/login',services.postLogin)

//API
route.post('/api/admin',controller.create)
route.get('/api/admin',controller.find)
route.put('/api/admin/:id',controller.update)
route.delete('/api/admin/:id',controller.delete)


module.exports = route;