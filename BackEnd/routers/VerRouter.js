const express = require ('express');
const router = express.Router ();
const VerTemplate = require ('../models/VerModel');

router.post ('/Ajout_ver', async (req, res) => {
  try {
    const {reference,formule, serie} = req.body;
    const referenceVer = await VerTemplate.findOne ({reference});
    const attributSousArticle = await VerTemplate.findOne ({serie});
   

    const newVer = new VerTemplate({reference,formule,serie});

    await newVer.save ();
    res.json ({msg: 'Created ver'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.get ('/Liste_ver', async (req, res) => {
  try {
    const ver = await VerTemplate.find ();
    res.json (ver);
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.put ('/update_ver/:id', async (req, res) => {
  try {
    const {reference} = req.body;
    await VerTemplate.findOneAndUpdate ({_id: req.params.id}, {reference});

    res.json ({msg: 'Updated ver'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.delete ('/delete_ver/:id', async (req, res) => {
  try {
    await VerTemplate.findByIdAndDelete (req.params.id);
    res.json ({msg: 'Deleted ver'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

module.exports = router;
