import React from "react";

const NavBar = props => {
  if (props.isAuth !== null) {
    return <span>Logged in</span>;
  } else {
    return <span>Not logged in</span>;
  }
};
export default NavBar;





// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';


// export default class Navbar extends Component {

// flag = false
//   constructor(props) {
//     super(props)
//     if(props.auth){
//     this.setState({
//       flag : props.auth
//     })
//   }
    
//   }
  
//   // componentDidMount() {

//   //   const user = localStorage.getItem('user')
//   //   console.log(user)
//   //   if(user){
//   //     console.log('yep')
//   //     this.setState({
//   //       loggedIn:true,
//   //     })
//   //     console.log(this.state.loggedIn)
//   //   }
   
// //}


//   logOut(e){
//     e.preventDefult()
//     localStorage.clear("token")

//   }



//   render() {
//     const loginRegLink = (
//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/register" className="nav-link">
//             Register
//           </Link>
//         </li>
//       </ul>
//     )

//     const userLink=(
//       <ul className="navbar-nav">
      
//       <li className="nav-item">
//         <a href="/login" onClick={this.logOut.bind(this)} className="nav-link">
//           Logout
//         </a>
//       </li>
//     </ul>
//   )
    
//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarsExample10"
//         aria-controls="navbarsExample10"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon" />
//       </button>

//       <div
//         className="collapse navbar-collapse justify-content-md-center"
//         id="navbarsExample10"
//       >
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link to="/" className="nav-link">
//               Home
//             </Link>
//           </li>
//         </ul>
//         {this.flag? userLink : loginRegLink}
//       </div>
//     </nav>
//     );
//   }
// }

