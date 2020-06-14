import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Paper, Button, Container, Typography, TextField, Card, CardContent } from '@material-ui/core'
export default class float extends Component {

    state = {
        floatformlist: [],
    }
    componentDidMount() {
        this.getlist();

    }

    floating(a){
        //e.preventDefault();
        console.log("into");
        console.log(a);
    }

    getlist=()=>{
        var role = localStorage.getItem("role")

        
        var obj = {
            role: role
        }

        axios.get("http://localhost:8000/float", obj).then(result => {

            this.setState({
                floatformlist: result.data,
            })
            console.log('asas', this.state.floatformlist);
        })
    }
    displaylist = (floatformlist) => {
        if (!floatformlist.length) {
            return null
        }

        return this.state.floatformlist.map((list, index) => (
            <div key={index}  >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography>{list.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color="secondary" onClick={this.floating(list)}>float</Button>
                    </Grid>
                </Grid>
            </div>
        ))
    }
    render() {
        return (
            <Container>
                <div>
                    {
                        this.displaylist(this.state.floatformlist)
                    }
                </div>




            </Container>
        )
    }
}
