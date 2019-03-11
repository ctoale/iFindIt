import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import popMoviesAction from '../../actions/popMoviesAction';
import { bindActionCreators} from 'redux'
import { connect } from "react-redux";

class Home extends Component{
    constructor(){
        super()
        this.state = {
            popMovies: []
        }
    }

    componentDidMount(){
        console.log("component mounted")
        this.props.popMoviesAction()
        console.log(this.props)
        
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        this.state.popMovies = newProps.popMovie.map((movie)=>{
            const imagePath = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
            console.log(imagePath)
            return(
                <img src={imagePath} alt="movie poster"/>
            )
        })
    }

    render(){
        return (
            <div>
                <h1>Home page sanity check</h1>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Register</button></Link>
                {this.state.popMovies}

            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        popMoviesAction: popMoviesAction
    },dispatch)
}


function mapStateToProps(state){
    return{
        popMovie : state.popMovie
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);