import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import randomizeRatings from '../actions/randomizeRatings';
import startInterval from '../actions/startInterval';
import stopInterval from '../actions/stopInterval';

class Randomizer extends Component {
    toggleRandomRatings() {
        if (this.props.movies.randomizer) {
            clearInterval(this.props.movies.randomizer);
            this.props.stopInterval();
        } else {
            this.props.startInterval(setInterval(() => { this.props.randomizeRatings(); }, 1000));
        }
    }

    componentWillUnmount() {
        clearInterval(this.props.movies.randomizer);
        this.props.stopInterval();
    }

    render () {
        return (
            <button className={"ui button right floated " + (this.props.movies.randomizer ? 'negative' : 'positive')}
                onClick={ () => this.toggleRandomRatings() }>
                { !this.props.movies.randomizer ? 'Start' : 'Stop' } randomizing ratings
            </button>
        )
    }
}

const mapStateToProps = (state) => ({
    movies: state.movies
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    randomizeRatings,
    startInterval,
    stopInterval
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Randomizer);