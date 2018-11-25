const calculateRating = (movie, newScore) => (movie.totalVotes * movie.rating + newScore) / (movie.totalVotes + 1);
const randomNumber1toN = n => Math.ceil(Math.random() * n);
const sortByRatingDesc = (curr, next) => next.rating - curr.rating;

export default (state = { list: [], randomizer: undefined }, action) => {
    switch (action.type) {
        case 'MOVIES_LOADED':
            return {
                ...state,
                list: action.movies.sort(sortByRatingDesc)
            };
        case 'RANDOMIZE_RATINGS':
            return {
                ...state,
                list: [...state.list].map(movie => Object.assign({}, movie, {
                        rating: calculateRating(movie, randomNumber1toN(5)),
                        totalVotes: movie.totalVotes + 1
                    }))
                    .sort(sortByRatingDesc)
            };
        case 'SCORE_ADDED':
            return {
                ...state,
                list: [...state]
                    .map(movie => movie.id === action.id ? Object.assign({}, movie, {
                        rating: calculateRating(movie, action.newScore),
                        totalVotes: movie.totalVotes + 1
                    }) : movie)
                    .sort(sortByRatingDesc)
            };
        case 'START_INTERVAL':
            return {
                ...state,
                randomizer: action.interval
            };
        case 'STOP_INTERVAL':
            return {
                ...state,
                randomizer: undefined
            };
        default:
            return state;
    }
};
