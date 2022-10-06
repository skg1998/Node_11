const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geoCoder');

const BootCampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        unique: true,
        trim: true,
        maxLength: [50, "Name can not be more than 50 character"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, "please add a description"],
        maxLength: [500, "Description can not be more than 500 character"]
    },
    website: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "please use a valid path with http or https"],
    },
    phone: {
        type: String,
        maxLength: [20, "phone number can not be greater than 20 character"]
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please add a valid email"]
    },
    address: {
        type: String,
        required: [true, "Please add an valid address"]
    },
    location: {
        //GeoJSON Point
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Others']
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating must be not greater than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        deafult: false
    },
    jobAssitance: {
        type: Boolean,
        deafult: false
    },
    jobGuarantee: {
        type: Boolean,
        deafult: false
    },
    acceptGi: {
        type: Boolean,
        deafult: false
    },
    created_At: {
        type: Date,
        deafult: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//create bootcamp slug from the name
BootCampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

//Create Location Field
BootCampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].state,
        zipcode: loc[0].zipcode,
        country: loc[0].country
    }
    //Do not save address in DB
    this.address = undefined;
    next();
})

// Cascade delete courses when a bootcamp is deleted
BootCampSchema.pre('remove', async function (next) {
    console.log(`Courses being removed from bootcamp ${this._id}`);
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next();
});

// Reverse populate with virtuals
BootCampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false
});

module.exports = mongoose.model('BootCamp', BootCampSchema);