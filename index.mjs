import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Init Express instance
const app = expres();
// Bind following app-level middleware
app.use(cors({
  credentials:true,    // enable HTTP cookies over CORS
  origin: FRONTEND_URL // restrict AJAX acess to single origin
}))
// Set Express view engine to expect EJS template
app.set('view engine', ejs);
// Parse cookie header and handle cookie separation & encoding
app.use(cookieParser());
// Parse incoming requests with JSON payloads
app.use(express.json());
// Parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Serve static files stored in public folder
app.use(express.static('public'));


// Start Express server and listen on given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);