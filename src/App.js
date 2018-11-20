import React, { Component } from 'react';
import Movie from './components/Movie.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    randomNumber1toN = n => Math.ceil(Math.random() * n);

    randomRating = rating => Math.round((rating + this.randomNumber1toN(10)) / 2 * 10) / 10;

    randomizeRatings() {
        this.setState({
            movies: [...this.state.movies]
                .map(movie => Object.assign({}, movie, { rating: this.randomRating(movie.rating) }))
                .sort(this.sortByRatingDesc)
        });
    }

    sortByRatingDesc = (curr, next) => next.rating - curr.rating;

    componentDidMount() {
        fetch('/data/movies.json')
            .then(res => res.json())
            .then(data => {
                if (data.movies) {
                    this.setState({ movies: data.movies.sort(this.sortByRatingDesc) });
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
                            <button className="positive ui button right floated" onClick={ this.randomizeRatings.bind(this) }>
                                Randomize ratings
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="ui three column grid">
                        { this.state.movies.map((movie, idx) => <Movie key={idx} {...movie} />) }
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
