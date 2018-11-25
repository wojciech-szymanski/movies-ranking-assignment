import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import App from './App';
import MovieReducer from './reducers/MovieReducer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    ReactDOM.render(    
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

describe('Reducers', () => {
    it('returns new list of movies sorted by rating', () => {
        let newState = MovieReducer(undefined, {
            type: 'MOVIES_LOADED',
            movies: [{
                id: '123',
                rating: 4.5,
                totalVotes: 34
            }, {
                id: '456',
                rating: 4.9,
                totalVotes: 27
            }]
        });

        expect(newState.list[0].id).toEqual('456');
        expect(newState.list[1].id).toEqual('123');
    });

    it('calculates rating for one movie correctly', () => {
        let newState = MovieReducer({
            list: [{
                id: '123',
                rating: 4,
                totalVotes: 2
            }]
        }, {
            type: 'SCORE_ADDED',
            id: '123',
            newScore: 1
        });

        expect(newState.list[0].rating).toEqual(3);
        expect(newState.list[0].totalVotes).toEqual(3);
    });

    it('generates random ratings for all movies', () => {
        let newState = MovieReducer({
            list: [{
                id: '123',
                rating: 4.5,
                totalVotes: 34
            }, {
                id: '456',
                rating: 3.2,
                totalVotes: 27
            }]
        }, {
            type: 'RANDOMIZE_RATINGS'
        });

        expect(newState.list[0].rating).not.toEqual(4.5);
        expect(newState.list[0].totalVotes).toEqual(35);
        expect(newState.list[1].rating).not.toEqual(3.2);
        expect(newState.list[1].totalVotes).toEqual(28);
    });
});