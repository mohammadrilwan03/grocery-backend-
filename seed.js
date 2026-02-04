const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Organic Bananas",
        price: 1.29,
        category: "Fruits",
        image: "https://loremflickr.com/600/600/bananas",
        rating: 4.8
    },
    {
        name: "Fresh Avocado",
        price: 2.49,
        category: "Vegetables",
        image: "https://loremflickr.com/600/600/avocado",
        rating: 4.9
    },
    {
        name: "Red Strawberries",
        price: 3.99,
        category: "Fruits",
        image: "https://loremflickr.com/600/600/strawberries",
        rating: 4.7
    },
    {
        name: "Whole Milk",
        price: 1.99,
        category: "Dairy",
        image: "https://loremflickr.com/600/600/milk",
        rating: 4.5
    },
    {
        name: "Artisan Bread",
        price: 4.50,
        category: "Bakery",
        image: "https://loremflickr.com/600/600/bread",
        rating: 4.8
    },
    {
        name: "Fresh Spinach",
        price: 2.99,
        category: "Vegetables",
        image: "https://loremflickr.com/600/600/spinach",
        rating: 4.6
    },
    {
        name: "Orange Juice",
        price: 3.49,
        category: "Beverages",
        image: "https://loremflickr.com/600/600/orangejuice",
        rating: 4.4
    },
    {
        name: "Farm Eggs",
        price: 3.29,
        category: "Dairy",
        image: "https://loremflickr.com/600/600/eggs",
        rating: 4.9
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/freshmarket');
        console.log("Connected to MongoDB...");

        await Product.deleteMany({});
        console.log("Old products cleared.");

        await Product.insertMany(products);
        console.log("Database seeded successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDB();
