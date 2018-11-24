const sortByRatingDesc = (curr, next) => next.rating - curr.rating;
const calculateRating = (movie, newScore) => (movie.totalVotes * movie.rating + newScore) / (movie.totalVotes + 1);

export default (state = null, action) => {
    switch (action.type) {
        case 'SCORE_ADDED':
            return [...state]
                .map(movie => movie.id === action.id ? Object.assign({}, movie, {
                    rating: calculateRating(movie, action.newScore),
                    totalVotes: movie.totalVotes + 1
                }) : movie)
                .sort(sortByRatingDesc);
        case 'MOVIES_LOADED':
            return  action.movies.sort(sortByRatingDesc);
        default:
            return state;
    }
};
