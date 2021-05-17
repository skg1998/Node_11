const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    weeks: {
        type: String,
        required: [true, "Please add the number of weeks"]
    },
    tuition: {
        type: Number,
        required: [true, "Please add a tuition cost"]
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add minimum skill"],
        enum: ["beginner", "intermediate", "advanced"]
    },
    scholarShipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'BootCamp',
        required: true
    }
})

module.exports = mongoose.model('Course', CourseSchema);