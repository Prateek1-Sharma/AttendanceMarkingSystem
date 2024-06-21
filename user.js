const sequelize= require("sequelize");
const db= require("../utils/databse");

const User=db.define("user",{
    name:{
        type:sequelize.STRING
    }
});
module.exports=User;