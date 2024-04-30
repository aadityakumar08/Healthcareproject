var exp=require('express');
var obj=exp();
var body1=require('body-parser')
var encoded = body1.urlencoded({extended:false})
obj.get('/form',(req,res)=>{
    res.sendFile(__dirname+"/donate.html")
})
obj.post('/formprocess',encoded,(req,res)=>{
    res.send({
        name:req.body.fullname,
        email:req.body.email,
        bloodgroup:req.body.bloodgroup,
        total:req.body.total,
        age:req.body.age,
        gender:req.body.gender,

        
    })
})

obj.listen(3000,()=>{

    console.log("running");

})

