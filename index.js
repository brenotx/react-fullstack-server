const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise; // Fixing some warnning
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(
    cookieSession({
        // name: 'session',
        keys: [keys.cookieKey],
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
);

require('./routes/authRoutes')(app);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
