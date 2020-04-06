const User = require("../models/User");
const Form = require("../models/Forms");

const users = async(req, res) => {
    User.find().then((users) => {
        res.json(users)
    }
    ).catch((error) => {
        res.send(error)
    })
}

const login = async(req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if (user.password === req.body.password) {
                    return { user: user }
                }
                return {error:"password mismatch"}
            }
            return { error: "no user found" }
            
        }).then((response) => {
          res.json(response)
        }
        ).catch((error) => {
        res.send(error)
    }
    )
}
    

const register = async(req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return { error: "user already exists" };
            }
            else {
                User.create({
                    email: req.body.email, password: req.body.password, name: req.body.name
                })
                    .then((users) => {
                        res.json(users)
                    }).catch((error) => {
                        return { error };
                    });
            }
        }).catch((error) => {
                        res.send(error)
                    });
}

const forms = async(req,res) => {
    console.log("mak");
    console.log(req.body);
    Form.create({
        form : req.body.data
    })
}
    
module.exports = { users, login ,register , forms }