const sequelize= require("sequelize");
const db= require("../utils/databse");

const Attendance=db.define("attendance",{
    date:{
        type:sequelize.STRING
    },
    name:{
        type:sequelize.STRING
    },
    attendance:{
        type:sequelize.STRING
    }

});
module.exports=Attendance;