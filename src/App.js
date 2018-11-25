import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moviesLoaded from './actions/moviesLoaded';
import randomizeRatings from './actions/randomizeRatings';
import scoreAdded from './actions/scoreAdded';
import Movie from './components/Movie.js';

class Movies extends Component {
    componentDidMount() {
        fetch('/data/movies.json')
            .then(res => res.json())
            .then(data => {
                if (data.movies) {
                    this.props.moviesLoaded(data.movies);
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
                                onClick={ this.props.randomizeRatings }>
                                Randomize ratings
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="ui three column grid">
                        {
                            this.props.movies && this.props.movies.map((movie, idx) =>
                                <Movie key={ idx }
                                    scoreAdded={ this.props.scoreAdded } 
                                    { ...movie } />
                            )
                        }
                    </div>
                </main>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => ({
    movies: state.movies
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    scoreAdded,
    moviesLoaded,
    randomizeRatings
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Movies);