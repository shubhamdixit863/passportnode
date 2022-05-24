const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');

function initializePassport(passport,getUserByEmail){
    const authenticateUser=async(email,password,done)=>{
        const user=getUserByEmail(email);
        console.log(user);

        if(user==null){
            return done(null,false,{messsage:"No user"});
        }

        try {
            console.log(user.password,password)
            const check=await bcrypt.compare(password,user.password);
            if(check){
                return done(null,user);
            }
            else{
                return done(null,false,{message:"Password Incorrect"});
            }
            
        } catch (error) {
            return done(error);
            
        }

    }

    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser));
    passport.serializeUser((user,done)=>{

    })

    passport.deserializeUser((user,done)=>{
        
    })


}

module.exports=initializePassport;