const express= require('express')
const router = express.Router();
const members=require('../../members')
const uuid = require('uuid')

//get a Json file
router.get('/',(req,res)=>{
    res.json(members)
})

//get a single member
router .get('/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id))

    if (found){
        res.json(members.filter(member=> member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg: 'Member not found'})
    }
})

//create new member
router.post('/',(req,res)=>{
   // res.send(req.body)

   const newMember={
       id: uuid.v4(),
       name: req.body.name,
       age: req.body.age,
   }

   if(!newMember.name || !newMember.age){
       return res.status(400).json({msg: "Please enter both name and age "})
   }

   members.push(newMember)
   //res.json(members)
   res.redirect('/')
})

//update a  member
router .put('/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id))

    if (found){
        const updMember=req.body
        members.forEach(member=>{
            if (member.id === parseInt(req.params.id)){
                member.name= updMember.name? updMember.name: member.name
                member.age= updMember.age? updMember.age: member.age
                res.json({ msg:"Member updated", member})
            }
            
        })
       
    } else{
        res.status(400).json({msg: 'Member not found'})
    }
})

//delete a single member
router.delete('/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id))
 
    if (found){
        res.json({msg: "Member deleted",members : members.filter(member=> member.id !== parseInt(req.params.id))});
    } else{
        res.status(400).json({msg: 'Member not found'})
    }
})

module.exports=router;