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

    console.log(req.query.in)
    await Form.find({$or:[{"access.role":req.query.in},{"access":{$size:0}}]}).then((float, err) => {

        //console.log("aaaaaaaaaaaaaaaaaaa", float)
        //res.json(float);

        if (float) {
            res.send(float);
        }
    })
}

const getusers = async (req, res) => {

    console.log(req.query)
    await User.find({"role":req.query.in}).then((float, err) => {

        console.log("aaaaaaaaaaaaaaaaaaa", float)
        //res.json(float);

        if (float) {
            res.send(float);
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

const create_ticket = async (req, res) => {
    console.log("mak");
    console.log(req.body);
    var tic_name = req.body.info.user + req.body.info.form_data.name;
    var flow = req.body.info.form_data.workflow[0];
    flow.person = req.body.info.target_email;
    console.log(flow)
    req.body.info.form_data.workflow[0] = flow;
    Ticket.create({
        ticket: tic_name,floated_user:req.body.info.user,status:0,child: req.body.info.form_data,
        current_holder: req.body.info.target,close:false,
    }).then((forms) => {

        console.log("user",forms);
        console.log("id",forms._id);
        User.findOneAndUpdate({_id: forms.floated_user},{$push: { intickets: forms._id }}).then((res) => {
            
            User.findOneAndUpdate({_id: forms.target},{$push: { outtickets: forms._id }}).then((re)=>{
                console.log(re);
            })
            console.log(res)
            return { out: "sucess"}; 
        })
        return { out: "sucess" };
    }).catch((error) => {
        console.log(error);
        return { error };
    });
}



module.exports = { users, login, register, forms, float, getusers, create_ticket }