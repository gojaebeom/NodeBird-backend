const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async (email, password, done)=>{

        try{

            const user = await User.findOne({
                where: {email}
            });
    
            if(!user){
                //1. 서버에러 2. 성공여부 3. 클라이언트에러
                return done(null, false, {reason:'존재하지 않는 사용자'});
            }
    
            const result = await bcrypt.compare(password, user.password);
    
            if(!result){
                return done(null, false, {reason:'비밀번호 불일치'});
            }
    
            return done(null, user);

        }catch(e){
            console.error(e);
            return done(e)
        }
        
    }))
}