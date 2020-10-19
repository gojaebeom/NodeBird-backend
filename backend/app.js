const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.post('/login') // 메인페이지를 가져온다



app.get('/', (req, res)=>{
    res.send('hello express');
})


app.get('/api', (req, res)=>{
    res.send('hello api');
})

app.get('/api/posts', (req, res)=>{
    
    res.json([
        {id : 1, content : 'hello1'},
        {id : 2, content : 'hello2'},
        {id : 3, content : 'hello3'}
    ]);
})

app.use('/post', postRouter); // '/post' <- prifix

app.listen(3065, ()=>{
    console.log('서버 실행중');
})