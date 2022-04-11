const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    // categories : 1 - starter , 2 - beverages , 3 - main course , 4 - soups
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "restaurant"
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    },
    name: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    availableStatus: {
        type: Number,
        default: 1,
        required: true
    }    
})

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
      if (v.constructor.name === 'Decimal128')
        prev[i] = v.toString();
      else
        Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
  };
  
  menuSchema.set('toJSON', {
    transform: (doc, ret) => {
      decimal2JSON(ret);
      return ret;
    }
  });
  
module.exports = new mongoose.model("menu" , menuSchema)    