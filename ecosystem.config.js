exports.module = {
    apps:[{
        name: "meteoapp",
        script: "./app.js",
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
}