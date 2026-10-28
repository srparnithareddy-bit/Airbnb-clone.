const sampleListings = [
    {
        title: "Cozy Beachfront Villa in Bali",
        description: "Wake up to panoramic ocean views in this contemporary beachfront villa. Features private infinity pool, outdoor lounge, and direct access to pristine sands.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
        },
        price: 240,
        location: "Seminyak, Bali",
        country: "Indonesia",
        category: "Beachfront",
        geometry: {
            type: "Point",
            coordinates: [115.1889, -8.4095]
        }
    },
    {
        title: "Modern Loft in Manhattan with Skyline Views",
        description: "Experience the pulse of New York City in this bright Soho loft with exposed brick walls, 14-foot ceilings, and high-end stainless steel appliances.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
        },
        price: 380,
        location: "Manhattan, New York",
        country: "United States",
        category: "Iconic Cities",
        geometry: {
            type: "Point",
            coordinates: [-74.0060, 40.7128]
        }
    },
    {
        title: "Luxury Alpine Chalet with Matterhorn View",
        description: "Ski-in/ski-out alpine chalet located in the Swiss Alps. Enjoy evenings next to the stone fireplace or unwinding in the private outdoor hot tub facing snowy peaks.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
        },
        price: 490,
        location: "Zermatt",
        country: "Switzerland",
        category: "Mountains",
        geometry: {
            type: "Point",
            coordinates: [7.7491, 45.9765]
        }
    },
    {
        title: "Historic 16th Century Scottish Highlands Castle",
        description: "Live like royalty in a restored medieval fortress overlooking a private loch. Includes 8 en-suite bedrooms, banquet hall, and 40 acres of private gardens.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=1200&q=80"
        },
        price: 850,
        location: "Scottish Highlands",
        country: "United Kingdom",
        category: "Castles",
        geometry: {
            type: "Point",
            coordinates: [-4.2026, 56.4907]
        }
    },
    {
        title: "Villa Sol with Cliffside Horizon Pool",
        description: "Perched high on the cliffs of Santorini, this whitewashed cave villa boasts an extraordinary infinity pool merging with the Aegean Sea horizon.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
        },
        price: 520,
        location: "Oia, Santorini",
        country: "Greece",
        category: "Amazing Pools",
        geometry: {
            type: "Point",
            coordinates: [25.4615, 36.3932]
        }
    },
    {
        title: "Enchanted Redwood Forest Glamping Dome",
        description: "Secluded geometric dome nestled high among coastal redwoods. Stargaze through transparent ceilings with queen memory-foam bed and cedar soaking tub.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80"
        },
        price: 185,
        location: "Big Sur, California",
        country: "United States",
        category: "Camping",
        geometry: {
            type: "Point",
            coordinates: [-121.8080, 36.2704]
        }
    },
    {
        title: "Rustic Tuscan Organic Vineyard Farmhouse",
        description: "Stately 18th-century stone farmhouse surrounded by rolling hills of olive groves and Chianti vineyards. Includes wine cellar tour and organic breakfast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
        },
        price: 295,
        location: "Tuscany",
        country: "Italy",
        category: "Farms",
        geometry: {
            type: "Point",
            coordinates: [11.2558, 43.7696]
        }
    },
    {
        title: "Glass Igloo Under the Aurora Borealis",
        description: "Sleep beneath the Northern Lights in a climate-controlled glass igloo surrounded by snow-covered pine forests and reindeer pastures.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80"
        },
        price: 430,
        location: "Lapland",
        country: "Finland",
        category: "Arctic",
        geometry: {
            type: "Point",
            coordinates: [27.0288, 67.5557]
        }
    },
    {
        title: "Traditional Machiya Townhouse in Historic Gion",
        description: "Authentic Kyoto wooden residence with tatami mat rooms, private zen courtyard garden, cedar wood soaking tub, and traditional tea ceremony lounge.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
        },
        price: 310,
        location: "Kyoto",
        country: "Japan",
        category: "Rooms",
        geometry: {
            type: "Point",
            coordinates: [135.7681, 35.0116]
        }
    },
    {
        title: "Boutique Oceanfront Penthouse with Rooftop Jacuzzi",
        description: "Ultra-luxury modern penthouse located right over Malibu sand. Floor-to-ceiling glass doors open directly to the Pacific soundscape.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        },
        price: 920,
        location: "Malibu, California",
        country: "United States",
        category: "Luxury",
        geometry: {
            type: "Point",
            coordinates: [-118.7798, 34.0259]
        }
    },
    {
        title: "Serene Heritage Haveli Suite",
        description: "Grand heritage palace suite overlooking Lake Pichola. Carved marble balconies, antique furnishings, and royal courtyard dining.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
        },
        price: 210,
        location: "Udaipur, Rajasthan",
        country: "India",
        category: "Trending",
        geometry: {
            type: "Point",
            coordinates: [73.7125, 24.5854]
        }
    },
    {
        title: "Tropical Treehouse with Private Lagoon",
        description: "Elevated bamboo sanctuary deep within the jungle canopy of Costa Rica. Wake to toucans and monkeys, with private swimming lagoon below.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
        },
        price: 260,
        location: "Manuel Antonio",
        country: "Costa Rica",
        category: "Trending",
        geometry: {
            type: "Point",
            coordinates: [-84.1481, 9.4087]
        }
    }
];

module.exports = { data: sampleListings };
