const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().trim(),
        description: Joi.string().required(),
        location: Joi.string().required().trim(),
        country: Joi.string().required().trim(),
        price: Joi.number().required().min(0),
        category: Joi.string().valid(
            'Trending',
            'Rooms',
            'Iconic Cities',
            'Mountains',
            'Castles',
            'Amazing Pools',
            'Camping',
            'Farms',
            'Arctic',
            'Beachfront',
            'Luxury'
        ).default('Trending'),
        image: Joi.alternatives().try(
            Joi.string().allow('', null),
            Joi.object({
                url: Joi.string().allow('', null),
                filename: Joi.string().allow('', null)
            })
        )
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required().trim()
    }).required()
});

module.exports.bookingSchema = Joi.object({
    booking: Joi.object({
        checkIn: Joi.date().iso().required(),
        checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(),
        guestsCount: Joi.number().integer().min(1).default(1),
        specialRequests: Joi.string().allow('', null).trim()
    }).required()
});
