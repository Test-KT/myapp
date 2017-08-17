var userSql={
    insert:'INSERT INTO user(id,name) VALUES(?,?)', 
    queryAll:'SELECT * FROM user',  
    getUserById:'SELECT * FROM user WHERE id = ? ',
};

module.exports=userSql;