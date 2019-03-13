import React, { Component } from 'react';
// import Axios from 'axios';
import { bindActionCreators } from 'redux';
import movieSearchAction from '../../actions/movieSearchAction';
import { connect } from 'react-redux';
import Card from '../utilities/Card';
import "../css/home.css";

class MovieSearch extends Component {



    movieSearchHandler = (event) => {
        event.preventDefault();
        const movieTitle = document.getElementById("movieTitle").value
        this.props.movieSearchAction({
            movieTitle
        })

    }

    

    render() {
        console.log(this.props.movie)

        if (this.props.movie === null) {
            return (
                <form onSubmit={this.movieSearchHandler}>
                    <input type="text" id="movieTitle" name="movieTitle" placeholder="Enter your movie search here" />
                    <input type="submit" value="Search" />
                </form>
            )
        } else {
            console.log(this.props.movie.results)
            const movieSearch = this.props.movie.results.map((movie, index) => {
                const imagePath = `http://image.tmdb.org/t/p/w300${movie.poster_path}`
                return (
                    <Card key={index} imagePath={imagePath} releaseDate={movie.release_date} title={movie.title} />
                )
            })
            return (
                <div className = "container">
                    <div className= "bodySearch">
                    <form onSubmit={this.movieSearchHandler}>
                        <input type="text" id="movieTitle" name="movieTitle" placeholder="Enter your movie search here" />
                        <input type="submit" value="Search" />
                    </form>
                    {movieSearch}
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    console.log(state.movie)
    return {
        movie: state.movie
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        movieSearchAction: movieSearchAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);