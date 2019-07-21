const express = require('express'),
    bodyParser = require('body-parser');
const app = express(),
    mongoose = require("mongoose"),
    Books = require("./models/book"),
    Details = require('./models/detail');
const passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    session = require("express-session");

const User = require('./models/user');

//mongoose.connect("mongodb://localhost/bookdb");

//app.use(cookieParser('mySecretKey'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://new-user_1:sunbear@firstcluster-soyrc.mongodb.net/bookdb?retryWrites=true&w=majority");


// ============= Authentication Methods ==========
app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: false,
    session: true
}));
//  code to set up passport to work in our app -> THESE TWO METHODS/LINES ARE REQUIRED EVERY TIME
app.use(passport.initialize());
app.use(passport.session());
passport.use('user', new LocalStrategy(User.authenticate())); //passport authenticate middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ============= Book ==============
app.get('/', (req, res) => {
    Books.find({}, (err, books) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index.ejs", { books: books });
        }
    });
});

app.get('/books/:id', (req, res) => {
    console.log("req.user._id  " + req.user._id);
    Books.findById({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.params.id);
            res.render("book_desc.ejs", { result: result, userId: req.user._id });
        }
    })
});

app.get('/books/:id1/user/:id2/address', (req, res) => {
    console.log(req.params.id1);
    var name = req.user.username;
    console.log(name);

    // const userId = await User.findById(req.params.id2);
    // const res=await Details.find({firstname:name});

    User.findById(req.params.id2, (err, r) => {
        if (err) {
            console.log("In User FindbyId");
            console.log(err);
            console.log("End of User FindbyId");
        } else {
            Details.find({ firstname: name }, (err, res1) => {
                if (err) {
                    console.log("In Details find");
                    console.log(err);
                    console.log("End of Details find");
                } else {
                    console.log(res1);
                    res.render("address2.ejs", { res1: res1 });
                }
            });
        }
    })

});

app.get('/user/address', (req, res) => {
    res.render('address1.ejs');
});

app.post('/user/address', (req, res) => {
    var firstname = req.body.firstname,
        lastname = req.body.lastname,
        contactno = req.body.contactno,
        age = req.body.age,
        gender = req.body.gender,
        area = req.body.area,
        zipcode = req.body.zipcode,
        state = req.body.state,
        city = req.body.city;

    var newUser = {
        firstname: firstname,
        lastname: lastname,
        age: age,
        contactno: contactno,
        gender: gender,
        area: area,
        zipcode: zipcode,
        state: state,
        city: city
    };

    Details.create(newUser, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newUser);
            res.redirect('/');
        }
    });
});
// ============= Sign Up ===========
app.get('/user/signup', (req, res) => {
    res.render("signup.ejs");
});

app.post('/user/signup', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('/user/signup');
        }
        passport.authenticate('user')(req, res, function() {
            console.log("SignUp Successful")
            res.redirect('/');
        });
    });
});
app.get('/user/login', (req, res) => {
    res.render("login.ejs");
});
app.post('/user/login', passport.authenticate('user', {
    successRedirect: "/",
    failureRedirect: "/user/login"
        //   session: true
}), function(req, res) {
    console.log("Login Successful");
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    console.log("Logout Successful")
});

// ============ MIDDLEWARE ==========
function isLoggedin1(req, res, next) {
    if (req.isAuthenticated()) {
        return next;
    }
    res.redirect('/');
}
// ==================================
app.listen(process.env.PORT || 3000);