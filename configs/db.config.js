const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mod-2-lab";

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch((error) => console.error('An error ocurred', error))