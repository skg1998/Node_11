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
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ]);

    try {
        if (obj[0]) {
            await this.model("BootCamp").findByIdAndUpdate(bootcampId, {
                averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
            });
        } else {
            await this.model("BootCamp").findByIdAndUpdate(bootcampId, {
                averageCost: undefined,
            });
        }
    } catch (err) {
        console.error(err);
    }
};

//Call getAvarageCost after save
CourseSchema.post('save', async function () {
    await this.constructor.getAverageCost(this.bootcamp)
})

//Call getAvarageCost after remove
CourseSchema.post('remove', async function () {
    await this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema);