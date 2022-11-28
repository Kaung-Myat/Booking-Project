const Admindb = require('../model/model')


//create and save
exports.create = (req,res)=>{
     //validate request
     if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
     }

     //new category
     const admin = new Admindb({
        description_title:req.body.descriptionTitle,
        description:req.body.description,
        start_time:req.body.date,
        limit:req.body.limit,
        phNo:req.body.phNo,
     })

     //save data in the database
     admin
        .save(admin)
        .then( data =>{
            
        res.redirect('/add')
            
            // res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occurred while creating an option"
            })
        })
}

//retreive and return all data / retreive and return single data
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Admindb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found with id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving"})
            })
    }else{
        Admindb.find()
        .then(data=>{
        res.send(data)
    })
        .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while finding data"})
    })
    }
}

exports.view = (req,res)=>{
        const id = req.params.id;
        Admindb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(400).send({message:"Error occurred!"});
                }
                else{
                    // res.send(data);
                    res.redirect('/add')

                }
            })
            .catch(err=>{
                res.send(err);
            })
   

}

//update data
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to update cannot be empty"})
    }
    console.log("request body", req.body);
    const id = req.params.id;

    //new category
    const update_data = {
        description_title:req.body.descriptionTitle,
        description:req.body.description,
        start_time:req.body.date,
        limit:req.body.limit,
        phNo:req.body.phNo,
     }

    Admindb.findByIdAndUpdate(id,update_data,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id} and user not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Error Update data"})
        })
}

//delete data
exports.delete = (req,res)=>{
    const id = req.params.id;
    Admindb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete with id${id} or id is wrong`})
            }
            else{
                res.send({
                    message:"Successfully Deleted!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete!"
            })
        })
}