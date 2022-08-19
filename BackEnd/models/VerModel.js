const mongoose = require ('mongoose');

const verSchema = new mongoose.Schema ({
  reference: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
  },

  formule :{
    type: String,
    required: true,
  },

  serie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'serieSchema',
  },
});

module.exports = mongoose.model ('ver', verSchema);
