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
    userdata:[],
    formData:'',
    formBuilder:'',
    formarray: [] ,
    flag : false
  }
  
  //data = localStorage.getItem("form")
  componentDidMount() {
    var formData = JSON.parse(localStorage.getItem("form_view")).form;
    //$(this.fb.current).formBuilder({formData});
   var fbEditor = document.getElementById('fb-editor');
   var formBuild = $(fbEditor).formRender({formData});
   this.setState({
     formData : formData,
     formBuilder: formBuild
   })
  }

  saveforward = (e) => {
    e.preventDefault();
    console.log(this.state.formBuilder.userData);
    // var data = (this.state.formBuilder).actions.getData()
    // //console.log(data)
    // data = JSON.stringify(data)
    // //console.log(data)
    // localStorage.setItem("form_temp",data);
    // this.setState({
    //   flag : true
    // })
  }

  saveform = (e) => {
    e.preventDefault();
    //$(this.fb.current).formBuilder(options);
    //this.formData1 = this.fb.actions.getData()
    //localStorage.setItem("form",this.formData1)
    //console.log((this.state.formBuilder).actions.getData('json',true))
    const data = (this.state.formBuilder).actions.getData('json',true)
    console.log(data)
    axios.post('http://localhost:8000/forms',{data})
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
  }

  render() {
    var list = JSON.parse(localStorage.getItem("form_view")).workflow;
    axios.get('http://localhost:8000/getusers',{data:list[0].user})
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
    if(this.state.flag === true)
    {
      return <Redirect to='/workflow'/>  
    }
    else {
    return (
    <div>  
    
    
    <div id="fb-editor" />;

    <div>
    <TextField
        id="standard-basic"
        select
        label="Select"
        helperText="Please select your Users"
        required>
        {roles.map((option) => (
            <MenuItem key={option.title} value={option.title}>
                {option.title}
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
