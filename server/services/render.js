const axios = require('axios');
const { response } = require('express');
const adminDb = require('../model/model');
const { param } = require('../routes/router');
const mongoose = require('mongoose');

exports.homeRoute = (req,res)=>{
    adminDb.findOne({}, {}, { sort: { 'start_time' : -1 } }, function(err, data) {
        if(err){
            res.send(err);
        }else{
            let student_qty;
            if(data){
                 student_qty = data.students.length;
                
            }
            res.render('index', { title : 'home', admin : data || [], std_qty : student_qty || null});
        }
      });
}

exports.result = (req,res)=>{
    res.render('result',{title:"result"})
}

exports.admin = (req,res)=>{
    if(req.session.isLoggined){
        adminDb.find().then(data=>{
            res.render('admindashboard',{title:'admin',admin:data})
        }).catch(err=>{
            res.send(err)
        })
    }else{
        return res.redirect('/login');
    }

    
}

exports.add_description = (req,res)=>{ 
    adminDb.find()
        .then(data=>{
            res.render('dashboardAdd',{title:'add',admin:data})
        })
        .catch(err=>{
            res.send(err)
        })
}

exports.view_description = (req,res)=>{
    adminDb.findById(req.params.id)
        .then(data=>{
            res.render('dashboardViewAndUpdate',{title:'View',admin:data})
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.addStudent = (req,res)=>{
    adminDb.updateOne(
        { _id: req.body.category_id }, 
        { $push: { students: req.body } },
        (err, result) => {
            if(err){
                res.send("err", err);
            }else{
                // res.send("success");
                res.redirect('/result');
            }
        } 
    );
}

exports.getLogin = (req,res)=>{
    res.render('login',{title:'login',inputData: {},error:null});
}

exports.postLogin =(req,res)=>{
    if(req.body.userName == "admin" && req.body.password == "admin1234"){
        req.session.isLoggined = true;
        return res.redirect('/admin');
    }else{
        return res.render('login',{error:true,title:'login',inputData:null|| []})
    }
}