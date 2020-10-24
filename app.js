const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const passport = require('passport');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const cors = require('cors');
const db = require('./models/index');
const passportConfig = require('./passport');

db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공!');
    })
    .catch(console.error);

dotenv.config();
passportConfig();





const app = express();

app.use(cors({
    origin:'*',
    credentials:false
}));
app.use(express.json()); //프론트에서 json 형식의 데이터를 보냈을 때 req.body에 넣어줌
app.use(express.urlencoded({extended:true}));//폼 서브밋을 하면 urlencoded 방식으로 넘어오는데 데이터를 req.body에 넣어줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/post', postRouter); // '/post' <- prifix
app.use('/user', userRouter); 

app.listen(3065, ()=>{
    console.log('서버 실행중');
})