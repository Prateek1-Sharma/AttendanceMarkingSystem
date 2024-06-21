
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const dbConnect=require("./utils/databse")
const Student=require("./models/user")
const Attendance=require("./models/attendance");
const sequelize = require("sequelize");
const { FORCE } = require("sequelize/lib/index-hints");
const app=express();
app.use(bodyParser.json())
app.use(cors());

app.get("/getStudentList",async(req,res)=>{
    const studentList=await Student.findAll();
    return res.json({studentList});
})
// app.post("/addStudent",async(req,res)=>{
//     const name=["vishal","prateek","deepak","babu b","chaitan","kausal","rajShekhar","abhishek"];
//     name.forEach(async(item)=>{
//         await User.create({name:item})
//     })
// })
app.post("/addAttendance",async(req,res)=>{
    const {date, studentData}=req.body
    studentData.forEach(element => {
        Attendance.create({date:date,name:element.name,attendance:element.attendance})
    });
    return res.json({message:"Data Saved Success"})
    })
 app.post("/getAttendanceDate",async(req,res)=>{
    const {date}= req.body;
    const availableDate= await Attendance.findAll({where:{date}})
    console.log(availableDate);
    return res.json({availableDate})
 })

 app.get("/report",async(req,res)=>{
const query1=`select count(distinct date) AS totalDate1 from attendances`
const query2=`select name,count(case when attendance="present" then "present" else null end) as totalAttendes from attendances group by name`
const result1=await dbConnect.query(query1,{type:sequelize.QueryTypes.SELECT})
const totalDate=result1[0].totalDate1;
const result2=await dbConnect.query(query2,{type:sequelize.QueryTypes.SELECT})
const result3=result2.map((item)=>{
    return {...item,attend:`${item.totalAttendes}/${totalDate}`,percentage:(item.totalAttendes/totalDate)*100}
}) 
return res.json({fetchData:result3})
 })


dbConnect.sync().then(()=>{
    app.listen(4000);
    console.log("Databse Connected ");    
})

