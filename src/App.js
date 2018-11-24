import React, { Component } from 'react';
import Movies from './containers/Movies.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    calculateRating = (movie, newScore) => (movie.totalVotes * movie.rating + newScore) / (movie.totalVotes + 1);

    randomizeRatings() {
        this.setState({
            movies: [...this.state.movies]
                .map(movie => Object.assign({}, movie, { 
                    rating: this.calculateRating(movie, this.randomNumber1toN(10)),
                    totalVotes: movie.totalVotes + 1
                }))
                .sort(this.sortByRatingDesc)
        });
    }

    randomNumber1toN = n => Math.ceil(Math.random() * n);

    sortByRatingDesc = (curr, next) => next.rating - curr.rating;

    updateRating = (id, newScore) => {
        this.setState({
            movies: [...this.state.movies]
                .map(movie => movie.id === id ? Object.assign({}, movie, {
                    rating: this.calculateRating(movie, newScore),
                    totalVotes: movie.totalVotes + 1
                }) : movie)
                .sort(this.sortByRatingDesc)
        });
    }

    componentDidMount() {
        fetch('/data/movies.json')
            .then(res => res.json())
            .then(data => {
                if (data.movies) {
                    this.setState({
                        movies: data.movies.sort(this.sortByRatingDesc)
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="ui main container">
                <header className="ui dividing header">
                    <div className="ui two column grid">
                        <div className="column">
                            <h1>Movie list</h1>
                        </div>
                        <div className="column">
                            <button className="positive ui button right floated" 
                                onClick={ this.randomizeRatings.bind(this) }>
                                Randomize ratings
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <Movies />
                </main>
            </div>
        );
    }
}

export default App;
