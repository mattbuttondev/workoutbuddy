const config = {
    development: {
        SERVER_URI: 'http://localhost:5000',
    },
    production: {
        SERVER_URI: 'https://workoutbuddy-api-c7d73d9422df.herokuapp.com',
    },
};

module.exports = config[process.env.NODE_ENV]