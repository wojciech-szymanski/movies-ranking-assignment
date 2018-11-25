const startInterval = (interval) => {
    return {
        type: 'START_INTERVAL',
        interval
    }
};

export default startInterval;