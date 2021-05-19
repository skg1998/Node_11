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

//static method to get average of cost
CourseSchema.static.getAverageCost = async function (bootcampId) {
    console.log("Average cost ....".green);
    const obj = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ])

    try {
        await this.model('BootCamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        })
    } catch (err) {
        console.log(err)
    }
}

//Call getAvarageCost after save
CourseSchema.post('save', async function () {
    this.constructor.getAverageCost(this.bootcamp)
})

//Call getAvarageCost before save
CourseSchema.pre('remove', async function () {
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema);