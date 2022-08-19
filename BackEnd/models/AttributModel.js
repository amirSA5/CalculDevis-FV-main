const mongoose = require ('mongoose');

const attributSchema = new mongoose.Schema ({
  Nom: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
  },

  serie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'serieSchema',
  },
});

module.exports = mongoose.model ('Attribut', attributSchema);
