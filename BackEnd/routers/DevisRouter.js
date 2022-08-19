const express = require ('express');
const router = express.Router ();
const DevisTemplate = require ('../models/DevisModel');


router.post ('/Ajout_Devis', async (req, res) => {
  try {
    const {Nom_Client,Prenom_Client,Num_tel,typeElement,elementDevis,montant} = req.body;

    const newDevis = new DevisTemplate({Nom_Client,Prenom_Client,Num_tel,typeElement,elementDevis,montant});

    await newDevis.save ();
    res.json ({msg: 'Created a Devis'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});


router.get ('/Liste_Devis', async (req, res) => {
  try {
    const devis = await DevisTemplate.find();
    res.json (devis);
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.put ('/update_Devis/:id', async (req, res) => {
  try {
    const {Nom_Client,Prenom_Client,Num_tel,typeElement,elementDevis,montant} = req.body;
    await DevisTemplate.findOneAndUpdate({_id: req.params.id},  {Nom_Client,Prenom_Client,Num_tel,typeElement,elementDevis,montant});

    res.json ({msg: 'Updated a Devis'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.delete ('/delete_Devis/:id', async (req, res) => {
  try {
    await DevisTemplate.findByIdAndDelete(req.params.id);
    res.json ({msg: 'Deleted a Devis'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});


module.exports = router