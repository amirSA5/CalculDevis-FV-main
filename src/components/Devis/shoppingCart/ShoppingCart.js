import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Modal from "@mui/material/Modal";
import ModalMiseEnBar from "../Modal_Items_devis/ModalMiseEnBar";
import ModalMiseEnVer from '../Modal_Items_devis/ModalMiseEnVer';
import "../Step1_devis.css";
import ModalDevis from '../../historique/ModalDevis/ModalDevis'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShoppingCart({ elementsDevis }) {
  const [open, setOpen] = React.useState(false);

  const [openModalDevis, setOpenModalDevis] = React.useState(false);

  const [openMiseEnBar, setOpenMiseEnBar] = React.useState(false);

  const [miseEnVer, setOpenMiseEnVer] = React.useState(false);

  const [nomClient, setNomClient] = React.useState("");

  const [prenomClient, setPrenomClient] = React.useState("");

  const [numTel, setNumTel] = React.useState("");

  const [typeAl, setTypeAl] = React.useState("");

  const [montantAl, setMontantAl] = React.useState(0);

  const [montantVer, setMontantVer] = React.useState(0);

  const [montantMainOeuvre, setMontantMainOeuvre] = React.useState(0);

  const [refs, setRefs] = React.useState([]);

  const [vals, setVals] = React.useState([]);

  const [refsMV,setRefsMV]=React.useState([])

  const [valsMV,setValsMV]=React.useState([])

  const [quantiteVer,setQauntite]=React.useState([])

  const [element,setElemnt]=React.useState([])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenModalDevis = () => {
    setOpenModalDevis(true);
    const element={
        Nom_Client: nomClient,
        Prenom_Client: prenomClient,
        Num_tel: numTel,
        typeElement: typeAl,
        elementDevis: elementsDevis,
        montant: montantTotal,
    }
    setElemnt(element)
  };

  const handleCloseModalDevis = () => {
    setOpenModalDevis(false);
  };

  const handleChangeInputNomClient = (e) => {
    setNomClient(e.target.value);
  };
  const handleChangeInputPrenomClient = (e) => {
    setPrenomClient(e.target.value);
  };
  const handleChangeInputNumTel = (e) => {
    setNumTel(e.target.value);
  };
  const handleChangeInputTypeAl = (e) => {
    setTypeAl(e.target.value);
  };
  const handleChangeInputMontantAl = (e) => {
    setMontantAl(e.target.value);
  };
  const handleChangeInputMontantVer = (e) => {
    setMontantVer(e.target.value);
  };
  const handleChangeInputMontantMainOeuvre = (e) => {
    setMontantMainOeuvre(e.target.value);
  };
  const handleOpenMiseEnBar = () => {

    setOpenMiseEnBar(true);
    for (var i = 0; i < elementsDevis.length; i++) {
      for(var j=0;j<elementsDevis[i].profilerValue.length;j++){
        elementsDevis[i].profilerValue[j].formule=elementsDevis[i].profilerValue[j].formule && elementsDevis[i].profilerValue[j].formule.replace('H',elementsDevis[i].hauteur)
        elementsDevis[i].profilerValue[j].formule=elementsDevis[i].profilerValue[j].formule && elementsDevis[i].profilerValue[j].formule.replace('L',elementsDevis[i].largeur)
        var nb= Number(eval(elementsDevis[i].profilerValue[j].formule))*Number(elementsDevis[i].quantite)
        if(refs.includes(elementsDevis[i].profilerValue[j].reference)===false){
          refs.push(elementsDevis[i].profilerValue[j].reference)
          vals.push(nb)
        }else{
          var indice = refs.indexOf(elementsDevis[i].profilerValue[j].reference)
          vals[indice]=Number(vals[indice])+Number(nb)
        }
      }
  }
  };

  const handleCloseMiseEnBar = () => {
    setOpenMiseEnBar(false);
  };

  const handleOpenMiseEnVer = () => {
    setOpenMiseEnVer(true);
    for(var i=0;i<elementsDevis.length;i++){
      for(var j=0;j<elementsDevis[i].verValue.length;j++){
        elementsDevis[i].verValue[j].formule=elementsDevis[i].verValue[j].formule && elementsDevis[i].verValue[j].formule.replace('H',elementsDevis[i].hauteur)
        elementsDevis[i].verValue[j].formule=elementsDevis[i].verValue[j].formule && elementsDevis[i].verValue[j].formule.replace('L',elementsDevis[i].largeur)
       
        refsMV.push(elementsDevis[i].verValue[j].reference)
        valsMV.push(elementsDevis[i].verValue[j].formule)
        quantiteVer.push(Number(elementsDevis[i].quantite))

      }
      
  }
  };

  const handleCloseMiseEnVer = () => {
    setOpenMiseEnVer(false);
  };

  var montantTotal =
    Number(montantAl) + Number(montantVer) + Number(montantMainOeuvre);

  const ajoutDevis = () => {
    axios
      .post("http://localhost:4000/app/Ajout_Devis", {
        Nom_Client: nomClient,
        Prenom_Client: prenomClient,
        Num_tel: numTel,
        typeElement: typeAl,
        elementDevis: elementsDevis,
        montant: montantTotal,
      })
      .then((response) => console.log(response.data));
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Devis Final
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Devis Final
            </Typography>
            <Button autoFocus variant="contained"
                      color="error"onClick={handleClose}>
              Fermer
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          <span className="Devis_container">
            <span>
              <span>Nom Client :</span>
              <span>
                <TextField
                  variant="standard"
                  color="warning"
                  focused
                  value={nomClient}
                  onChange={handleChangeInputNomClient}
                />
              </span>
            </span>
            <span>
              <span>Prénom Client :</span>
              <span>
                <TextField
                  variant="standard"
                  color="warning"
                  focused
                  value={prenomClient}
                  onChange={handleChangeInputPrenomClient}
                />
              </span>
            </span>
            <span>
              <span>Num Téléphone :</span>
              <span>
                <TextField
                  variant="standard"
                  color="warning"
                  focused
                  value={numTel}
                  onChange={handleChangeInputNumTel}
                />
              </span>
            </span>
            <span>
              <span>Type Alamuinuim :</span>
              <span>
                <TextField
                  variant="standard"
                  color="warning"
                  focused
                  value={typeAl}
                  onChange={handleChangeInputTypeAl}
                />
              </span>
            </span>
          </span>
        </div>

        <List>
          {elementsDevis.map((item) => {
            return (
              <>
                <ListItem button>

                    <span>
                      <span>  {"- "+item.sousArticleNom}</span>
                      <span>
                        {item.largeur+" "}*{item.hauteur+" "}
                      </span>
                      <span>{item.quantite+" "}</span>
                      <span>{item.serieValue+" "}</span>
                    </span>

                </ListItem>

                <Divider />
              </>
            );
          })}
        </List>

        <div className="Devis_container">
          <span>
            <span>
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenMiseEnBar}
              >
                mise en bar
              </Button>
            </span>
            <span>
              <Button variant="outlined" color="error" onClick={handleOpenMiseEnVer}>
                ver
              </Button>
            </span>
          </span>
        </div>

        <div className="Devis_container">
          <span>
            <span>montant Alamuinuim</span>
            <span>
              <TextField
                variant="standard"
                color="warning"
                focused
                value={montantAl}
                onChange={handleChangeInputMontantAl}
              />
            </span>
          </span>
          <span>
            <span>montant ver</span>
            <span>
              <TextField
                variant="standard"
                color="warning"
                focused
                value={montantVer}
                onChange={handleChangeInputMontantVer}
              />
            </span>
          </span>
          <span>
            <span>montant main d'oeuvre</span>
            <span>
              <TextField
                variant="standard"
                color="warning"
                focused
                value={montantMainOeuvre}
                onChange={handleChangeInputMontantMainOeuvre}
              />
            </span>
          </span>
        </div>
        <br />
        <span>
          <span> <b>Montant Total :</b> </span>
          <span>{" "+montantTotal}Dt</span>
        </span>
        <br />

        <Button variant="outlined" color="success" onClick={handleClickOpenModalDevis}>
          Devis
        </Button>

        <Modal
          hideBackdrop
          open={openMiseEnBar}
          onClose={handleCloseMiseEnBar}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <ModalMiseEnBar
            refs={refs}
            vals={vals}
            handleCloseMiseEnBar={handleCloseMiseEnBar}
          />
        </Modal>
        <Modal
        hideBackdrop
        open={miseEnVer}
        onClose={handleCloseMiseEnVer}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
      <ModalMiseEnVer refsMV={refsMV} valsMV={valsMV} quantiteVer={quantiteVer} handleCloseMiseEnVer={handleCloseMiseEnVer} />
      </Modal>
      <Modal
          hideBackdrop
          open={openModalDevis}
          onClose={handleCloseModalDevis}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <ModalDevis
            element={element}
            handleClose={handleCloseModalDevis}
          />
        </Modal>
      </Dialog>
    </div>
  );
}
