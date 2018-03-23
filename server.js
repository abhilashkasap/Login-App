var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var Strategy1 = require('passport-google-oauth20').Strategy;
var ensure_log_in= require('connect-ensure-login');
var app = express();

passport.use(new Strategy({
    clientID: '176122083183452',
    clientSecret: '617b57ad8176682503a2072b2efa19c2',
    callbackURL: 'https://grindelwald.herokuapp.com/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  passport.use(new Strategy1({
    clientID: '1022982029608-c4585s10jd7ffnm33aqgv5cprunar43p.apps.googleusercontent.com',
    clientSecret: 'KB-o3oYeyxTnbvdI0CmJwLJ-',
    callbackURL: 'https://grindelwald.herokuapp.com/login/google/return'
  },
  function(accessToken, refreshToken, profile, cb) {
   return cb(null, profile);
  }));
  app.use(session({
    secret: 'ByPrateek',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));
app.use(passport.initialize());

app.get('/login/facebook',
passport.authenticate('facebook'));

app.get('/login/facebook/return', 
  passport.authenticate('facebook', {failureRedirect: '/' }),function(req,res){
    res.redirect(`/setup/${req.user.displayName}`);
  });
  app.get('/login/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/login/google/return', 
  passport.authenticate('google', { failureRedirect: '/' }),function(req, res) {
   
   res.redirect(`/setup/${req.user.displayName}`);
  });
  app.get('/setup/:displayName',function(req,res){
    req.session.auth = { email:req.params.displayName };
    console.log(req.session.auth.email);
    res.redirect(`/home/${req.params.displayName}`);
  });

 
var config = {
    user: 'fkdemjkv',
    database: 'fkdemjkv',
    host: 'stampy.db.elephantsql.com',
    port: '5432',
    password: '9amirlP5E70kqEuriSR3reY96-djhako'
};


app.get('/home/:user',function(req,res){
    
    //req.session.auth= {email:req.params.user};
if(req.session.auth)
{
    var html = `<!DOCTYPE html>
<html lang="en">
<head>
	<title>Home</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="/css/icon-font.min.css">
	<link rel="stylesheet" type="text/css" href="/css/animate.css">
	<link rel="stylesheet" type="text/css" href="/css/hamburgers.min.css">
	<link rel="stylesheet" type="text/css" href="/css/animsition.min.css">
	<link rel="stylesheet" type="text/css" href="/css/select2.min.css">
	<link rel="stylesheet" type="text/css" href="/css/daterangepicker.css">
	<link rel="stylesheet" type="text/css" href="/css/util.css">
    <link rel="stylesheet" type="text/css" href="/css/main.css">
    <link rel="stylesheet" type="text/css" href="/css/home.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
</head>

<body>
	<div class="container">
        <div class="row">
<div class="name"><h3>Welcome,${req.params.user}<span></span></h3></div>
            <a href="/applogout"><span class="glyphicon glyphicon-log-out"><p>Logout</p></span></a>
        </div>
    </div>
</body>
</html>
 `;
 res.send(html);
}
else
{
    res.redirect('/404.html');
}
});
app.use(morgan('short'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



var pool = new Pool(config);

app.get('/',function(req,resp){
  //  var auth= req.session.auth.email;
   // console.log(auth);
    if(req.session && req.session.auth && req.session.auth.email)
    {
    console.log(req.session.auth.email);
}
    else
    {
        console.log("Not logged in");
    }
 resp.sendFile(__dirname+ '/index.html');
});

app.get('/css/:filename',function(req,resp){
  resp.sendFile(path.join(__dirname,'css',req.params.filename));
});

app.get('/signup.html',function(req,resp){
    resp.sendFile(__dirname+ '/signup.html');
});
   
app.get('/script/:filename',function(req,resp){
    resp.sendFile(path.join(__dirname,'script',req.params.filename));
});
function hash(input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/testapi',function(req,res){
    res.send(req.session.auth.email);
})
app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});
app.get('/applogout', function(req, res) {
    delete req.session.auth;
    res.send('<http><head><meta http-equiv="Refresh" content="1; /"><h1>Logged Out</h1></head>');
});
app.post('/signup',function(req,resp){
  var email= req.body.email;
  var password=req.body.password;
  var fullname= req.body.fullname;
  var phone=req.body.phone;
  var dob=req.body.dob;
  var salt = crypto.randomBytes(128).toString('hex');
  var dbString = hash(password, salt);
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(reg.test(email))
  {
  pool.query('INSERT INTO user_data (email,password,fullname,phone,dob) VALUES ($1, $2,$3,$4,$5)', [email, dbString,fullname,phone,dob], function(err, result) {
      if (err) {
          resp.status(500).send(err.toString());
        } else {
            var data=`<http><head><meta http-equiv="Refresh" content="1; /signup.html"><h1>User Created !!!</h1></head>`;
            resp.send(data);
        }
    });
}
else
{
    resp.send('<http><head><meta http-equiv="Refresh" content="1; /signup.html"><h1>Invalid Email</h1></head> ');
}
});

app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.pass;

    pool.query('SELECT * FROM user_data WHERE email = $1', [email], function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(403).send('<http><head><meta http-equiv="Refresh" content="1; /"><h1>Invalid Credentials</h1></head>');
            } else {
                // Match the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                console.log(password);
                var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
                if (hashedPassword === dbString) {

                    // Set the session
                    req.session.auth = { email: result.rows[0].email };
                    // set cookie with a session id
                    // internally, on the server side, it maps the session id to an object
                    // { auth: {userId }}

                    res.redirect(`/home/${req.session.auth.email}`);

                } else {
                    res.status(403).send('<http><head><meta http-equiv="Refresh" content="1; /"><h1>Invalid Credentials</h1></head>');
                }
            }
        }
    });
});
app.get('/:anyname',function(req,res){
res.sendFile(__dirname + '/404.html');
});

var port = process.env.PORT||8086; // Use 8080 for local development

app.listen(port, function (){
  console.log(`test app listening on port ${port}!`);
});