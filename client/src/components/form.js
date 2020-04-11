import $ from "jquery";
import React, { Component } from "react";
import axios from 'axios';
import { withRouter,Redirect } from 'react-router-dom'

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

var formData = [
  {
    type: "header",
    subtype: "h1",
    label: "New Form"
  },
  {
    type: "paragraph",
    label: "Start building your form from the options on the right."
  }
];


class FormBuilder extends Component {
  //fb = createRef();
  formdata1 = formData;
  state = {
    formBuilder:'',
    formarray: [] ,
    flag : false
  }
  
  //data = localStorage.getItem("form")
  componentDidMount() {
    //$(this.fb.current).formBuilder({formData});
   var fbEditor = document.getElementById('fb-editor');
   var formBuild = $(fbEditor).formBuilder({formData});
   this.setState({
     formBuilder: formBuild
   })
  }

  saveforward = (e) => {
    e.preventDefault();
    var data = (this.state.formBuilder).actions.getData()
    console.log(data)
    localStorage.setItem("form_temp",data);
    this.setState({
      flag : true
    })
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
    if(this.state.flag === true)
    {
      return <Redirect to='/workflow'/>  
    }
    else {
    return (
    <div>  
    
    <div>
      <button onClick={this.saveforward}> export form</button>
    </div>
    <div id="fb-editor" />;
    
    
     </div>);
    }
    
  }
}

export default withRouter(FormBuilder)
//ReactDOM.render(<FormBuilder />, document.getElementById("root"));
