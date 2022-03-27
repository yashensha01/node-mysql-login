# node-mysql-login

### ROUTE

```js
app.get('/',(req,res)=>{
   res.render('index')
})
```

### SERVER CONNECTION

```js
app.listen('5000',() =>{
    console.log('Server started on port 5000');
})
```
### DB CONNECTION

```js
const con = mysql.createConnection({
    host: host-name,
    user: username,
    password: password,
    database: database-name
  })
```

### PATH 

```js
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))
```





