const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,

})

// db.connect((err) =>{
//     if(err){ console.error("ERROR connectiong to mysql", err.message)
//     return
//     }
//     console.log("connected to mysql");
    
// });
const testConnection =  async () =>{
    try{
        const conn = await db.getConnection();
        console.log('Connected to database successfully');
        conn.release(); 
    }catch (err) {
        console.error('Error connecting to database', err);
    }
}
testConnection(); 
module.exports = db;