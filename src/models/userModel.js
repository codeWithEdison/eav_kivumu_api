const db = require('../config/db.js');


// const User = {
//     async create ({name, email, password}){
//         try{
//             const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
//             const [result] = await db.query(query, [name, email, password], (err, results)=>{
//                 if(err) throw new Error(err.message);
//                 return result.insertId;
//             });
//         } catch(err){
//             throw new Error(err.message)
//         }
//     },
//     // find user by email

//     findByEmail: (email) =>{
//         const query = 'SELECT * FROM users WHERE email = ?';
//         db.query(query, [email],(err,  results)>{
//             if(err) {throw new Error(err.message)}
//         })

//     }
// }

// use funcrional procedure 

const createUser = async (userData) => {
    const { name, email, password} = userData;
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [results] = await db.query(query, [name, email, password]);
    return results.InsertedId;

};

// find user by  email

    const findByEmail = async (email) =>{
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(query, [email]);
        return results[0];
    }

    /// get all users

    const getAllUsers = async () => {
        const query = 'SELECT * FROM users';
        const [results] = await db.query(query); 
        return results;
    }

    // get user by id
    const getUserById = async (id) => {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [results] = await db.query(query, [id]);
        return results[0]; // Return the first user if it exists
    };
    // update user
    const updateUser = async (userId, userData) => {
        const { name, email } = userData;
        const query = `UPDATE users SET name =?, email =? WHERE id =?`;
        const [results] = await db.query(query, [name, email, userId]);
        return results.affectedRows > 0; // Return true if update was successful
    };
    // delete user
    const deleteUserById = async (userId) => {
        const query = `DELETE FROM users WHERE id =?`;
        const [results] = await db.query(query, [userId]);
        return results.affectedRows > 0; // Return true if deletion was successful
    };  

module.exports = {
    createUser,
    findByEmail,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById 
}