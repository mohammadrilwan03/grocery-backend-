const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 120 }
});

const Product = mongoose.model('Product', productSchema);

const MONGO_URI = 'mongodb://localhost:27017/freshmarket';

const products = [
    { name: "Premium Bananas", price: 45, category: "Fruits", image: "https://loremflickr.com/600/600/bananas", rating: 4.8 },
    { name: "Fresh Avocado", price: 120, category: "Vegetables", image: "https://loremflickr.com/600/600/avocado", rating: 4.9 },
    { name: "Red Strawberries", price: 180, category: "Fruits", image: "https://loremflickr.com/600/600/strawberries", rating: 4.7 },
    { name: "Whole Milk", price: 65, category: "Dairy", image: "https://loremflickr.com/600/600/milk", rating: 4.5 },
    { name: "Artisan Bread", price: 55, category: "Bakery", image: "https://loremflickr.com/600/600/bread", rating: 4.8 },
    { name: "Fresh Spinach", price: 30, category: "Vegetables", image: "https://loremflickr.com/600/600/spinach", rating: 4.6 },
    { name: "Orange Juice", price: 95, category: "Beverages", image: "https://loremflickr.com/600/600/orangejuice", rating: 4.4 },
    { name: "Farm Eggs (12pk)", price: 85, category: "Dairy", image: "https://loremflickr.com/600/600/eggs", rating: 4.9 },
    { name: "Green Apples", price: 140, category: "Fruits", image: "https://loremflickr.com/600/600/apple", rating: 4.7 },
    { name: "Organic Carrots", price: 40, category: "Vegetables", image: "https://loremflickr.com/600/600/carrots", rating: 4.5 },
    { name: "Greek Yogurt", price: 75, category: "Dairy", image: "https://loremflickr.com/600/600/yogurt", rating: 4.8 },
    { name: "Chocolate Croissant", price: 60, category: "Bakery", image: "https://loremflickr.com/600/600/croissant", rating: 4.9 },
    { name: "Cold Brew Coffee", price: 150, category: "Beverages", image: "https://loremflickr.com/600/600/coffee", rating: 4.7 },
    { name: "Red Grapes", price: 110, category: "Fruits", image: "https://loremflickr.com/600/600/grapes", rating: 4.6 },
    { name: "Bell Peppers", price: 90, category: "Vegetables", image: "https://loremflickr.com/600/600/peppers", rating: 4.5 },
    { name: "Cheddar Cheese", price: 210, category: "Dairy", image: "https://loremflickr.com/600/600/cheese", rating: 4.8 },
    { name: "Blueberry Muffins", price: 45, category: "Bakery", image: "https://loremflickr.com/600/600/muffin", rating: 4.7 },
    { name: "Green Tea", price: 130, category: "Beverages", image: "https://loremflickr.com/600/600/greentea", rating: 4.4 },
    { name: "Watermelon", price: 80, category: "Fruits", image: "https://loremflickr.com/600/600/watermelon", rating: 4.9 },
    { name: "Broccoli", price: 70, category: "Vegetables", image: "https://loremflickr.com/600/600/broccoli", rating: 4.7 },
    { name: "Butter (500g)", price: 240, category: "Dairy", image: "https://loremflickr.com/600/600/butter", rating: 4.8 },
    { name: "Whole Wheat Bun", price: 25, category: "Bakery", image: "https://loremflickr.com/600/600/bun", rating: 4.5 },
    { name: "Sparkling Water", price: 40, category: "Beverages", image: "https://loremflickr.com/600/600/sparklingwater", rating: 4.6 },
    { name: "Pineapple", price: 90, category: "Fruits", image: "https://loremflickr.com/600/600/pineapple", rating: 4.7 },
    { name: "Cherry Tomatoes", price: 60, category: "Vegetables", image: "https://loremflickr.com/600/600/tomatoes", rating: 4.8 },
    { name: "Almond Milk", price: 190, category: "Dairy", image: "https://loremflickr.com/600/600/almondmilk", rating: 4.4 },
    { name: "Bagels (4pk)", price: 110, category: "Bakery", image: "https://loremflickr.com/600/600/bagel", rating: 4.6 },
    { name: "Pomegranate Juice", price: 160, category: "Beverages", image: "https://loremflickr.com/600/600/pomegranate", rating: 4.8 },
    { name: "Kiwi Fruit", price: 130, category: "Fruits", image: "https://loremflickr.com/600/600/kiwi", rating: 4.7 },
    { name: "Sweet Corn", price: 35, category: "Vegetables", image: "https://loremflickr.com/600/600/corn", rating: 4.5 }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Successfully seeded 30 products!');

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
    }
}

seed();
