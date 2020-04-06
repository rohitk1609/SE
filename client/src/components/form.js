import $ from "jquery";
import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from 'react-router-dom'

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


/* 
The order of the imports and requires is very important, especially in the online enviornment.
The two jQuery libraries must be imported using Node's require(), and not ES6 import.
Also, these two requires MUST come after setting the global jQuery and $ symbols.

In my Babel/Webpack project, the type and order of the imports is a little less sensitive.
For my project, the following alternative works:

    import $ from 'jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'jquery-ui-sortable';

    window.jQuery = $;
    window.$ = $;

    require('formBuilder');
*/

class FormBuilder extends Component {
  //fb = createRef();
  formdata1 = formData;
  state = {
    formBuilder:'',
    formarray: [] 
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

  saveform = (e) => {
    e.preventDefault();
    //$(this.fb.current).formBuilder(options);
    //this.formData1 = this.fb.actions.getData()
    //localStorage.setItem("form",this.formData1)
    //console.log((this.state.formBuilder).actions.getData('json',true))
    const data = (this.state.formBuilder).actions.getData('json',true)
    console.log(data)
    axios.post('http://localhost:8000/forms',{data})
          // .then(res => {
          //   if (res.data.user) {
          //     localStorage.setItem('usertoken',res.data.user)
          //     localStorage.setItem('flag',true)
          //     localStorage.setItem('form_list',[])
          //     console.log(localStorage)                
          //     this.setState({
          //       isLoggedin: true,
          //       user: email
          //     });
              
          //   }
          //   if (res.data.error || res.error) {
          //       alert(res.data.error,res.error)
          //     }
          // })
          // .catch (error => {
          // alert(error.response);
          // });
    alert("the form is saved")
  }

  render() {
    return (
    <div>  
    
    <div>
      <button onClick={this.saveform}> export form</button>
    </div>
    <div id="fb-editor" />;
    
    
     </div>);
    
  }
}

export default withRouter(FormBuilder)
//ReactDOM.render(<FormBuilder />, document.getElementById("root"));
