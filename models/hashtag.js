module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        //id가 기본적으로 들어있다.
        name:{
            type : DataTypes.STRING(20),
            allowNull:false,
        }
    },{
        charset : 'utf8mb4',//이모티콘을 쓸경우 mb4를 넣어줘야함
        collate: 'utf8mb4_general_ci', //이모티콘저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, {through:'PostHashtag'});
    };

    return Hashtag;
}