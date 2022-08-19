const mongoose = require ('mongoose');


const DevisSchema = new mongoose.Schema({

    Nom_Client:{
        type: String,
        required: true
    },

    Prenom_Client:{
        type: String,
        required: true
    },

    Num_tel:{
        type: String,
        required: true
    },
    typeElement:{
        type: String,
        required: true
    },

    elementDevis:{
        type : [{}],
        default:[{}]
    },

    montant:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model ('Devis', DevisSchema);
