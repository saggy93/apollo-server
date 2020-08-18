const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    avtar: String,
    songs: [{
    id: String,    
    name: String,
    composer: String,
    writer: String,
    moviename: String,
    rating: String,
    
  
}]

});

module.exports = mongoose.model('Event', eventSchema)     