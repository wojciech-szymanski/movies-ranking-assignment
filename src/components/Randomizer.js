import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import randomizeRatings from '../actions/randomizeRatings';

class Randomizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomRatings: undefined
        };
    }

    toggleRandomRatings() {
        if (this.state.randomRatings) {
            clearInterval(this.state.randomRatings);
            this.setState({
                randomRatings: undefined
            });
        } else {
            this.setState({
                randomRatings: setInterval(() => { this.props.randomizeRatings(); }, 1000)
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.randomRatings);
        this.randomRatings = undefined;
    }

    render () {
        return (
            <button className={"ui button right floated " + (this.state.randomRatings ? 'negative' : 'positive')}
                onClick={ () => this.toggleRandomRatings() }>
                { !this.state.randomRatings ? 'Start' : 'Stop' } randomizing ratings
            </button>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    randomizeRatings
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Randomizer);