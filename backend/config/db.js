const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mailing_system:mailing_system@cluster0.vzjk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

module.exports = connectDB;