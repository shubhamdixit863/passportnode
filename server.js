const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const passport=require("passport");
const initializePassport=require("./passport-config");
const flash=require("flash");
const session=require("express-session");
app.set('view engine', 'ejs');

const users=[

];

initializePassport(passport,function(email){
    return users.find(user=>user.email===email)

});


app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"keyboardcat",
    resave:false,
    saveUninitialized:false


}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });




app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true

}))


app.get("/register",(req,res)=>{
    res.render("register")
})


app.post("/register",async(req,res)=>{
    try {
        const hashed=await bcrypt.hash(req.body.password,10);
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashed

        }
    

        )
        res.redirect("/login")
        
    } catch (error) {
        res.redirect("/register")
        
    }
   
})




app.listen(9000,()=>{
    console.log("App running at port ")
})