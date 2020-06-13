const User = require("../models/User");
const Form = require("../models/Forms");
const Ticket = require("../models/Tickets");

const users = async (req, res) => {
    User.find().then((users) => {
        res.json(users)
    }
    ).catch((error) => {
        res.send(error)
    })
}

const login = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if (user.password === req.body.password) {
                    return { user: user }
                }
                return { error: "password mismatch" }
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

const float = async (req, res) => {

    console.log(req.body)
    await Form.find({"access.role":"CEO"}).then((err, float) => {

        console.log("aaaaaaaaaaaaaaaaaaa", float)
        //res.json(float);

        if (err) {
            res.send(err);
        }
    })
}
const register = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return { error: "user already exists" };
            }
            else {
                User.create({
                    email: req.body.email, password: req.body.password, name: req.body.name, role: req.body.role
                })
                    .then((users) => {
                        res.json(users)
                    }).catch((error) => {
                        console.log("asdsd")
                        return { error };
                    });
            }
        }).catch((error) => {
            res.send(error)
            console.log("a")
        })
}

const forms = async (req, res) => {
    console.log("mak");
    console.log(req.body);
    Form.findOne({ form: req.body.name })
        .then((form) => {
            if (form) {
                return { error: "form already exists" };
            }
            else {
                Form.create({
                    name: req.body.name, form: req.body.form, workflow:req.body.roles, access: req.body.access
                })
                    .then((forms) => {
                        return { out: "sucess" };
                    }).catch((error) => {
                        return { error };
                    });
            }
        }).catch((error) => {
            res.send(error)
        });
}

module.exports = { users, login, register, forms, float }