const express = require('express');
const { User , Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

//로그인🍰
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }

        if(info){
            return res.status(401).send(info.reason);
        }

        return req.login(user, async(loginErr)=>{
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            try{
                const fullUserWithoutPassword = await User.findOne({
                    where: { id:user.id},
                    attributes:{
                        exclude:['password']
                    },
                    include:[{
                        model:Post
                    },{
                        model:User,
                        as:'Followings'
                    },{
                        model:User,
                        as:'Followers'
                    }]
                })

                return res.status(200).json(fullUserWithoutPassword);

            }catch(e){
                console.error(e);
            }
        })
    })(req, res, next);
});

//회원가입🍰
router.post('/', async (req, res, next)=>{

    try{
        const exUser = await User.findOne({
            where : {
                email : req.body.email
            }
        });

        if(exUser){
            return res.status(403).send('이미 사용중인 아이디');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword
        })
    }catch(e){
        console.error(e);
        next(e); //500
    }

    res.status(201).send('ok');
});

//로그아웃🍰
router.post('/user/logout', (req, res, next) => {
    console.log(req.user);
    req.logout();
    req.session.destroy();
    res.send('ok');
})

module.exports = router;