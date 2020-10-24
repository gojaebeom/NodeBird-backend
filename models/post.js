module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        //id가 기본적으로 들어있다.
        content:{
            type : DataTypes.TEXT,
            allowNull:false,
        }
    },{
        charset : 'utf8mb4',//이모티콘을 쓸경우 mb4를 넣어줘야함
        collate: 'utf8mb4_general_ci', //이모티콘저장
    });
    Post.associate = (db) => {
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.User);
        db.Post.belongsTo(db.Post, { as : 'Retweet'});
        db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'});
        db.Post.belongsToMany(db.User,{through:'Like',  as : 'Likers'});
    };

    return Post;
}