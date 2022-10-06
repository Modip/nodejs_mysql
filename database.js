const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
   'library_nodejs','root',
    '',{
        dialect : "mysql",
        host : "localhost"
    }

)


const connect = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Successfully connected");
    }
    catch(error){
        console.log(error)
    }
}

module.exports = { sequelize, connect };