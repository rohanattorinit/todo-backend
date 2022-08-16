const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        default: null
    },
    isComplete: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('task',taskSchema);