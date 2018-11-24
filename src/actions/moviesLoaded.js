const moviesLoaded = (movies) => {
    return {
        type: 'MOVIES_LOADED',
        movies
    }
};

export default moviesLoaded;