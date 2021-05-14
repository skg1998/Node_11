const mongoose = require('mongoose');
const slugify = require('slugify');

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
        //Geojson Point
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
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
})

//create bootcamp slug from the name
BootCampSchema.pre('save', (next) => {
    this.slug = slugify(this.name, { lower: true })
    next();
})

module.exports = mongoose.model('BootCamp', BootCampSchema);