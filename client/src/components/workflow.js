import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios';
import { Grid, Paper, Button, Container, Typography, TextField } from '@material-ui/core'
import Header from './worflowheader'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
const roles = [
    {
        role: 'CEO',
    },
    {
        role: 'COO',
    },
    {
        role: 'Office Manager',
    },
    {
        role: 'Marketing Manager',
    },
    {
        role: 'Accountant',
    },
    {
        role: 'Receptionist',
    },
    {
        role: 'Software Developer',
    },

]


class Workflow extends Component {
    constructor() {
        super();


        this.ID = 0;
        this.actionname="";
        this.state = {

            workkflow_list: [],
            change: false,
            role: "CEO",
            save: false,
            ApprovalDialog: false,
            ReviewDialog: false,
            change: false,
            useraccesslist: [],
            email: "",
            checkedA: true,
            checkedB: false,
            flag: false,
            approveuser: "",
            reviewuser: "",
            
        }
    }

    handleChangeA = (event) => {
        event.preventDefault();
        if (this.state.checkedA === true) {
            this.setState({
                checkedA: true
            })
        }
        else {
            this.setState({
                checkedA: true,
                checkedB: false
            })
        }

        this.setState({
            save: false,
            change: false,
            useraccesslist: []
        })

    }
    handleChangeB = (event) => {
        event.preventDefault();
        if (this.state.checkedB === true) {
            this.setState({
                checkedB: true
            })
        }
        else {
            this.setState({
                checkedB: true,
                checkedA: false,

            })

            this.setState({
                useraccesslist: [],
                save: true
            })

        }

    }

    deleteEvent = (index) => {
        const copyuseraccesslist = Object.assign([], this.state.useraccesslist);
        copyuseraccesslist.splice(index, 1);
        this.setState({
            useraccesslist: copyuseraccesslist

        })
    }
    deleteActionEvent = (index) => {
        const copyworkflow_list = Object.assign([], this.state.workkflow_list);
        copyworkflow_list.splice(index, 1);
        this.setState({
            workkflow_list: copyworkflow_list

        })
    }
    setemail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    addemail = () => {
        this.ID = this.ID + 1;
        this.state.useraccesslist.push({
            id: this.ID,
            role: this.state.role
        })
        this.setState({
            useraccesslist: this.state.useraccesslist
        })
    }
    onsave = () => {
        this.setState({
            save: false,
            issaved: true,
            change: true,
        })
    }
    onchange = () => {
        this.setState({
            save: true,
            change: false
        })
    }
    setrole = (e) => {
        this.setState({
            role: e.target.value
        })
    }
    handleClickApproval = () => {
        this.setState({
            ApprovalDialog: true
        })
    }
    handleApprovalClose = () => {
        this.setState({
            ApprovalDialog: false
        })
    }
    setapproveuser = (e) => {
        this.setState({
            approveuser: e.target.value
        })
    }
    Approveactionadd = () => {
        this.state.workkflow_list.push({
            id: 1,
            user: this.state.approveuser,
        })
        this.setState({
            ApprovalDialog: false,
            workkflow_list: this.state.workkflow_list
        })
    }
    handleClickReview = () => {
        this.setState({
            ReviewDialog: true
        })
    }
    handleReviewClose = () => {
        this.setState({
            ReviewDialog: false
        })
    }
    setreviewuser = (e) => {
        this.setState({
            reviewuser: e.target.value
        })
    }

    Reviewactionadd = () => {
        this.state.workkflow_list.push({
            id: 0,
            user: this.state.reviewuser
        })
        this.setState({
            ReviewDialog: false,
            workkflow_list: this.state.workkflow_list
        })
    }
    onsaveworkflow =(e) => {
        e.preventDefault();
        var data = localStorage.getItem("form_temp")
        console.log(typeof(data))
        var obj = JSON.parse(data);
        console.log(obj)
        var title = obj[0].label;
        console.log(typeof(this.state.workkflow_list))
        var list = JSON.stringify(this.state.workkflow_list)
        var userlist = JSON.stringify(this.state.useraccesslist)
        axios.post('http://localhost:8000/forms',{name : title, form : data, roles : list,access : userlist})
          .then(res => {
            console.log(res);
            if (res.data.error) {
              alert("form already exists")
            }
            if (res.data.out) {
              alert("sucess");
            }
          }
          )
          .catch (error => {
          alert(error.response);
          });
    alert("the form is saved")
    this.setState({
        flag: true
    })

        
    }
    render() {
        if(this.state.flag)
        {
            return <Redirect to="/dashboard"/>
        }
        else{
        return (
            <Fragment>
                <Header />
                <div>
                    <Grid container sm>
                        <Grid item sm>
                            <Paper style={{ padding: 20, marginTop: 10, marginBottom: 10 }}>
                                Add your Workflow
                    </Paper>

                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={3}>
                        <Grid item sm={6}>

                            <Paper style={{ height: 600, margin: 10 ,overflowY:'auto'}}>
                                <Button style={{ height: 40, margin: 20 }} variant="outlined" color="primary" onClick={this.handleClickApproval}>Add your Approval Action </Button>
                                <Dialog open={this.state.ApprovalDialog} onClose={this.handleApprovalClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Who can Approve</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            The Selected User is added in the approval sequence List. You can Either Remove or add Users for the
                                            Aprrocal.
                                                </DialogContentText>
                                        <TextField

                                            id="standard-basic"
                                            select
                                            label="Select"
                                            value={this.state.approveuser}
                                            fullWidth
                                            onChange={this.setapproveuser}
                                            helperText="Please select your Users"
                                            required>
                                            {roles.map((option) => (
                                                <MenuItem key={option.role} value={option.role}>
                                                    {option.role}
                                                </MenuItem>
                                            ))}

                                        </TextField>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleApprovalClose} color="primary">
                                            Cancel
                                                </Button>
                                        <Button onClick={this.Approveactionadd} color="primary">
                                            Done
                                                </Button>
                                    </DialogActions>
                                </Dialog>
                                <br />
                                <Button style={{ height: 40, margin: 20 }} variant="outlined" color="primary" onClick={this.handleClickReview}>Add your Comment Action </Button>
                                <Dialog open={this.state.ReviewDialog} onClose={this.handleReviewClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Who can Review</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            The Selected User is added in the Review sequence List. You can Either Remove or add Users for the
                                            Aprrocal.
                                                </DialogContentText>
                                        <TextField

                                            id="standard-basic"
                                            select
                                            label="Select"
                                            value={this.state.reviewuser}
                                            fullWidth
                                            onChange={this.setreviewuser}
                                            helperText="Please select your Users"
                                            required>
                                            {roles.map((option) => (
                                                <MenuItem key={option.role} value={option.role}>
                                                    {option.role}
                                                </MenuItem>
                                            ))}

                                        </TextField>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleReviewClose} color="primary">
                                            Cancel
                                                </Button>
                                        <Button onClick={this.Reviewactionadd} color="primary">
                                            Done
                                                </Button>
                                    </DialogActions>
                                </Dialog>
                                <hr />

                                {
                                    <div>
                                        {
                                            this.state.workkflow_list.map((workflow, index) => {

                                                if (workflow.id === 1) {
                                        
                                                    this.actionname = "Approve Action"
                                        
                                                }
                                                else {
                                                    this.actionname="Review Action"
                                                }
                                                return (
                                                    <Grid Container>
                                                        <Grid item xs={12}>
                                                            <Paper style={{ padding: 20, height: 100, margin: 10 }}>
                                                                <Grid container>
                                                                    <Grid item xs={6}>
                                                                        <Typography variant="h6" align="left">{index} {this.actionname}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <IconButton aria-label="delete" onClick={this.deleteActionEvent.bind(this, index)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>

                                                                    </Grid>
                                                                </Grid>

                                                                <Typography variant="Subtitle" align="left"> Who can Acces this Action</Typography>

                                                                <Typography variant="Subtitle" align="left">{workflow.user}</Typography>



                                                            </Paper>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }

                                            )
                                        }
                                    </div>
                                }






                            </Paper>
                        </Grid>
                        <Grid item sm={6}>

                            <Paper style={{ padding: 20, height: 500, margin: 10, overflowY: 'auto' }}>

                                <Typography
                                    padding="20px"
                                    variant="h6" align="left">
                                    Who can start this app?

                                </Typography>
                                <div >
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.checkedA}
                                                    onChange={this.handleChangeA}
                                                    name="checkedA"
                                                />}
                                            label="All users"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.checkedB}
                                                    onChange={this.handleChangeB}
                                                    name="checkedB"
                                                    color="primary"
                                                />}
                                            label="Only selected users"
                                        />
                                    </FormGroup>
                                    <hr />
                                    <div>
                                        {
                                            this.state.change &&
                                            <Typography>Total {this.state.useraccesslist.length} can use this access this Workflow</Typography>

                                        }
                                        {
                                            !this.state.change &&
                                            <div>
                                                <div>
                                                    <ul>
                                                        {
                                                            this.state.useraccesslist.map((users, index) => {
                                                                if (!users) {
                                                                    return null
                                                                }
                                                                else {
                                                                    return (
                                                                        <Grid container>
                                                                            <Grid item xs={6}>
                                                                                <Typography variant="subtitle1">{users.role}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={6}>
                                                                                <IconButton aria-label="delete" onClick={this.deleteEvent.bind(this, index)}>
                                                                                    <DeleteIcon />
                                                                                </IconButton>

                                                                            </Grid>


                                                                        </Grid>

                                                                    )
                                                                }

                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                <div >
                                                    {
                                                        this.state.checkedB &&
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <TextField

                                                                    id="standard-basic"
                                                                    select
                                                                    label="Select"
                                                                    value={this.state.role}
                                                                    fullWidth
                                                                    onChange={this.setrole}
                                                                    helperText="Please select your Users"
                                                                    required>
                                                                    {roles.map((option) => (
                                                                        <MenuItem key={option.role} value={option.role}>
                                                                            {option.role}
                                                                        </MenuItem>
                                                                    ))}

                                                                </TextField>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Button variant="contained" color="primary" onClick={this.addemail}>Add User</Button>
                                                            </Grid>


                                                        </Grid>
                                                    }
                                                    {
                                                        this.state.checkedA && <Typography variant="subtitle1" align="left">All users are selected</Typography>
                                                    }

                                                </div>
                                            </div>

                                        }

                                    </div>
                                    <hr />
                                    <div>
                                        {
                                            this.state.save && <Button variant="contained" color="primary" onClick={this.onsave} >Save</Button>
                                        }
                                        {
                                            this.state.change && <Button variant="contained" color="primary" onClick={this.onchange} >Change</Button>
                                        }
                                    </div>






                                </div>


                            </Paper>
                        </Grid>


                    </Grid>
                </div>
                <div>
                   <Button variant ="contained" color="primary" size="large" fullWidth onClick={this.onsaveworkflow}>Save Workflow</Button>

                </div>

            </Fragment>
        )
        }
    }

}

export default withRouter(Workflow)