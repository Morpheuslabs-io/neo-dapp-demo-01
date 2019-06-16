"use strict";

const express = require('express');
const app = new express();
// load routings
// require('./routes/api')(app);
app.use(express.static('.'));

this.PORT = process.env.PORT || 3000;
 app.listen(this.PORT, () => console.log(`App listening on port ${this.PORT}!`));