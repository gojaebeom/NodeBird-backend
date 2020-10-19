const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.export = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        //id가 기본적으로 들어있다.
        content:{
            type : DataTypes.TEXT,
            allowNull:false,
        }
        /**
         * belongsTo의 경우 컬럼으로 인자값으로 받은 테이블의 아이디를 받는다 
         * ex) db.Comment.belongsTo(db.Post); -> postId
         */
    },{
        charset : 'utf8mb4',//이모티콘을 쓸경우 mb4를 넣어줘야함
        collate: 'utf8mb4_general_ci', //이모티콘저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };

    return Comment;
}