const scoreAdded = (id, newScore) => {
    return {
        type: 'SCORE_ADDED',
        id,
        newScore
    }
};

export default scoreAdded;