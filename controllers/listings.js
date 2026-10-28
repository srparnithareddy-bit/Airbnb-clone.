const Listing = require('../models/listing');

// Helper to provide realistic coordinates for popular travel locations if geocoding is offline
const cityCoordinates = {
    'goa': [73.8180, 15.2993],
    'mumbai': [72.8777, 19.0760],
    'delhi': [77.1025, 28.7041],
    'jaipur': [75.7873, 26.9124],
    'manali': [77.1892, 32.2432],
    'udaipur': [73.7125, 24.5854],
    'paris': [2.3522, 48.8566],
    'london': [-0.1278, 51.5074],
    'new york': [-74.0060, 40.7128],
    'tokyo': [139.6917, 35.6895],
    'bali': [115.1889, -8.4095],
    'santorini': [25.4615, 36.3932],
    'dubai': [55.2708, 25.2048],
    'rome': [12.4964, 41.9028],
    'barcelona': [2.1734, 41.3851],
    'amsterdam': [4.9041, 52.3676],
    'maldives': [73.5093, 3.2028],
    'kyoto': [135.7681, 35.0116],
    'switzerland': [8.2275, 46.8182],
    'zermatt': [7.7491, 45.9765],
    'aspen': [-106.8370, 39.1911],
    'malibu': [-118.7798, 34.0259],
    'banff': [-115.5708, 51.1784],
    'scotland': [-4.2026, 56.4907],
    'edinburgh': [-3.1883, 55.9533],
    'cape town': [18.4241, -33.9249],
    'sydney': [151.2093, -33.8688]
};

function getCoordinates(location = '', country = '') {
    const locLower = location.toLowerCase();
    const countryLower = country.toLowerCase();

    for (const [key, coords] of Object.entries(cityCoordinates)) {
        if (locLower.includes(key) || countryLower.includes(key)) {
            return coords;
        }
    }
    // Default safe coordinates (Paris)
    return [2.3522, 48.8566];
}

module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== 'All') {
        filter.category = category;
    }

    if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
            { category: regex }
        ];
    }

    const allListings = await Listing.find(filter).populate('reviews');
    res.render('listings/index.ejs', { allListings, selectedCategory: category || 'All', searchQuery: search || '' });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('owner');

    if (!listing) {
        req.flash('error', 'The listing you are looking for does not exist!');
        return res.redirect('/listings');
    }

    // Calculate rating summary
    let avgRating = 0;
    if (listing.reviews && listing.reviews.length > 0) {
        const sum = listing.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        avgRating = (sum / listing.reviews.length).toFixed(1);
    }

    res.render('listings/show.ejs', { listing, avgRating });
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Handle file upload
    if (req.file) {
        if (req.file.path.startsWith('http')) {
            // Cloudinary upload
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } else {
            // Local disk fallback
            newListing.image = {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename
            };
        }
    } else if (req.body.listing && req.body.listing.image && typeof req.body.listing.image === 'string' && req.body.listing.image.trim()) {
        newListing.image = {
            url: req.body.listing.image.trim(),
            filename: 'custom_image'
        };
    }

    // Setup coordinates for Leaflet Map
    const coords = getCoordinates(newListing.location, newListing.country);
    newListing.geometry = {
        type: 'Point',
        coordinates: coords
    };

    await newListing.save();
    req.flash('success', 'New Destination Listing successfully created!');
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing you are looking for does not exist!');
        return res.redirect('/listings');
    }

    let originalImageUrl = listing.image.url;
    if (originalImageUrl.includes('cloudinary')) {
        originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_300');
    }

    res.render('listings/edit.ejs', { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        if (req.file.path.startsWith('http')) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } else {
            listing.image = {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename
            };
        }
        await listing.save();
    } else if (req.body.listing && req.body.listing.imageUrl && req.body.listing.imageUrl.trim()) {
        listing.image = {
            url: req.body.listing.imageUrl.trim(),
            filename: 'custom_image'
        };
        await listing.save();
    }

    // Refresh coordinates if location changed
    if (req.body.listing.location || req.body.listing.country) {
        const coords = getCoordinates(req.body.listing.location || listing.location, req.body.listing.country || listing.country);
        listing.geometry = {
            type: 'Point',
            coordinates: coords
        };
        await listing.save();
    }

    req.flash('success', 'Listing details updated successfully!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/listings');
};
