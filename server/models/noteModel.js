const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'A note must have a unique title'],
        unique: true,
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'A note must have a content'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

noteSchema.index({title: 'text', content: 'text'});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;