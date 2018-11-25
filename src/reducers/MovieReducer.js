const calculateRating = (movie, newScore) => (movie.totalVotes * movie.rating + newScore) / (movie.totalVotes + 1);
const randomNumber1toN = n => Math.ceil(Math.random() * n);
const sortByRatingDesc = (curr, next) => next.rating - curr.rating;

export default (state = null, action) => {
    switch (action.type) {
        case 'MOVIES_LOADED':
            return action.movies.sort(sortByRatingDesc);
        case 'RANDOMIZE_RATINGS':
            return [...state]
                .map(movie => Object.assign({}, movie, {
                    rating: calculateRating(movie, randomNumber1toN(5)),
                    totalVotes: movie.totalVotes + 1
                }))
                .sort(sortByRatingDesc);
        case 'SCORE_ADDED':
            return [...state]
                .map(movie => movie.id === action.id ? Object.assign({}, movie, {
                    rating: calculateRating(movie, action.newScore),
                    totalVotes: movie.totalVotes + 1
                }) : movie)
                .sort(sortByRatingDesc);
        default:
            return state;
    }
};
