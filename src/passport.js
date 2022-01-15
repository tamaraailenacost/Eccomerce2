const { Strategy: LocalStrategy } = require('passport-local')




const initialize = (passport) => {


    passport.use('register', new LocalStrategy({
            passReqToCallback: true,
        },
        (req, email, password, done) => {

            //const { password, password2, email, name } = req.body;
            console.log(email, passport)

            const userExist = Usuarios.find().findOne({ email: email })
            if (userExist) {
                return done(null, false, {
                    error: "User has already been registered"
                })
            }
            const user = new Usuarios(req.body)
            user.save()
            console.log('User Registration succesful')
            return done(null, user)
        }

    ));

    passport.use('login', new LocalStrategy(
        (email, password, done) => {

            console.log(email, passport)

            const user = Usuarios.findOne({ email: email })
            if (!user) {
                return done(null, false, { error: "User incorrect" });
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, { error: "Password incorrect" });
            }
            return done(null, user)
        }

    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        done(null, user)
    })




}

module.exports = initialize