import React, { Component } from 'react'
import { withRouter,Redirect } from 'react-router-dom'

class FormDetails extends Component {

  constructor() {
    super();

    this.displayData = [];

    this.state = {
      showdata : this.displayData,
      postVal : "yashaswi",
      flag : false
    }
  };
  start = (e) => {
    e.preventDefault();
    if(this.state.flag === false)
    {
      this.displayData.push(<div  id="display-data">
      <pre>{this.state.postVal}</pre>
      <button onClick={this.restrict}>Restrict Users</button>
      <button onClick={this.aprove}>Add Approval</button>
      <button onClick={this.forward}>Add review</button>
      </div>
      );
         this.setState({
            showdata : this.displayData,
            postVal : "",
            flag : true
         });
    }
  }
  restrict = (e) => {
    e.preventDefault();

  }

  aprove = (e) => {
    e.preventDefault();
  }

  restrict = (e) => {
    e.preventDefault();
  }

    componentDidMount() {
      this.displayData.push(<div  id="display-data">
      <pre>{this.state.postVal}</pre>
      <button onClick={this.start}>START</button>
      </div>
      );
         this.setState({
            showdata : this.displayData,
            postVal : ""
         });
    }



  render() {
    return (
    <div id="thison1">
    {this.displayData}
    </div>
    )  
  }
}




export default withRouter(FormDetails)