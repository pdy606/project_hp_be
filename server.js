const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
let db
const url = 'mongodb+srv://zzxxrrtt0011:qwer1234@admin12.px8ckax.mongodb.net/?retryWrites=true&w=majority&appName=admin12'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('web')
  app.listen(8080, ()=>{
    console.log('http://localhost:8080 running~')
  })
}).catch((err)=>{
  console.log(err)
})
app.get('/article', (req, res)=>{
  res.sendFile(__dirname+'/article.html')
})
app.get('/community', (req, res)=>{
  res.sendFile(__dirname+'/community.html')
})
app.get('/info', (req, res)=>{
  res.sendFile(__dirname+'/info.html')
})
app.get('/write', (req, res)=>{
  res.sendFile(__dirname+'/write.html')
})
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/homepage.html')
})
app.get('/fail2', (req, res)=>{
  res.sendFile(__dirname+'/fail2.html')
})
app.get('/homepage', (req, res)=>{
  res.sendFile(__dirname+'/homepage.html')
})
app.get('/test', (req, res)=>{
    res.send('테스트페이지에 접속하셨습니다.')
})
app.get('/success', (req, res)=>{
  res.sendFile(__dirname+'/success.html')
})
app.get('/fail', (req, res)=>{
  res.sendFile(__dirname+'/fail.html')
})
app.get('/userinfo', async(req, res)=>{
    let result = await db.collection('user').find().toArray()
    res.render('list.ejs',{users:result})
})
app.get('/login', async(req, res)=>{
  res.render('login.ejs')
})
app.get('/join', async(req, res)=>{
    res.render('join.ejs')
})
app.post('/join', (req, res)=>{
  console.log(req.body)
  db.collection('user').insertOne({
      userId : req.body.id,
      pw : req.body.pw
  })
})
app.get('/join', (req, res)=>{
  db.collection('user').insertOne({
      userId : 'test1',
      pw : 'qwer123'
  })
})
app.post('/login', async(req, res) => {
  let result = await db.collection('user').findOne({ userId: req.body.username })
  if (!result) {
      res.redirect('/fail2')
  }else{
      if(result.pw == req.body.password){
          res.redirect('/success')
      }else{
        res.redirect('/fail')
      }
  }
})