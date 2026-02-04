const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String, default: "High quality organic produce." }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
