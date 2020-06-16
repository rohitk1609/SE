import $ from "jquery";
import React, { Component } from "react";
import axios from 'axios';
import { withRouter,Redirect } from 'react-router-dom'
import { Grid, Paper, Button, Container, Typography, TextField, Card, CardContent } from '@material-ui/core'
import roles from '../roles.json'
import MenuItem from '@material-ui/core/MenuItem';
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js');


export default class FormBuilder extends Component {
  //fb = createRef();
  //formdata1 = formData;
  state = {
    selecteduser:'',
    userdata:[],
    formData:'',
    formBuilder:'',
    formarray: [] ,
    flag : false
  }
  
  //data = localStorage.getItem("form")
  componentDidMount = async ()=>{
    var formData = JSON.parse(localStorage.getItem("form_view")).form;
    //$(this.fb.current).formBuilder({formData});
   var fbEditor = document.getElementById('fb-editor');
   var formBuild = $(fbEditor).formRender({formData});
   this.getlist()
   this.setState({
     formData : formData,
     formBuilder: formBuild
   })

   

  }

  //this functions gets the user filled data and sends to the backend,
  //to create the ticket.
  saveforward = (e) => {
    e.preventDefault();
    console.log(this.state.formBuilder.userData);
    var form_obj = JSON.parse(localStorage.getItem("form_view"))
    form_obj.form = this.state.formBuilder.userData
    console.log(form_obj)
    var userid = JSON.parse(localStorage.getItem("user_id"))
    console.log(userid.user._id)
    var info = {
      user: userid.user._id,
      user_email: localStorage.getItem("role"),
      form_data: form_obj,
      target: this.state.selecteduser._id,
      target_email: this.state.selecteduser.email
    }
    axios.post('http://localhost:8000/create_ticket',{info})
          .then(res => {
            console.log("fghjk")
            console.log("fghj",res);
            
          }
          )
          .catch (error => {
          alert(error.response);
          });
          this.setState({
            flag: true
          })
  }

  
  getlist = () => {
    var list = JSON.parse(localStorage.getItem("form_view")).workflow;
    console.log(list[0].user);
    var final_list;
    axios.get('http://localhost:8000/getusers',{params:{in:list[0].user}})
          .then(res => {
            console.log(res.data);
              final_list=res.data;
              console.log("users",final_list)
          this.setState({
            userdata:final_list
          })
          }
          )
          .catch (error => {
          alert(error.response);
          });
          
  }
  setapproveuser=(e)=>{

    console.log(e.target.value)
    this.setState({
      selecteduser:e.target.value
    })

  }

  render() {

    if(this.state.flag === true)
    {
      return <Redirect to='/dashboard'/> 
    }
    
    //console.log(this.state.userdata)
    if(!this.state.userdata.length)
    {
      return (
        <div>  
        <div id="fb-editor" />
        </div>
      );
    }
    else
    {
    return (
    <div>  
    
    
    <div id="fb-editor" />;

    <div>
    <TextField
        id="standard-basic"
        select
        label="Select"
        helperText="Please select your Users"
        onChange={this.setapproveuser}
        required>
        {this.state.userdata.map((option) => (
            <MenuItem value={option}>
                {option.email}
            </MenuItem>
        ))}
      </TextField>
        
      <Button variant="contained" color="secondary" onClick={this.saveforward}>Save and Forward</Button>
    </div>
    
    
     </div>);
    }
    
  }
}

//export default withRouter(FormBuilder)
//ReactDOM.render(<FormBuilder />, document.getElementById("root"));
