import React,{useState} from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios'

const style = {
  display: "flex",
  flexWrap: "wrap",
  position: "absolute",
  justifyContent: "space-between",
  contentAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
  overflowY: "auto",
  overflowX: "hidden",
};

function ModalAjoutSousArticle({articleID,handleCloseSousArticle}) {

    const [sousArticle, setSousArticle] = useState({ Nom: "" });

    const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSousArticle({ ...sousArticle, [name]: value });
  };

  const ajoutSousArticle = (e) => {

    axios.post("http://localhost:4000/app/Ajout_sousArticle", { Nom: sousArticle.Nom, article: articleID })
      .then((response) => console.log(response.data));
    handleCloseSousArticle()
    e.preventDefault()
  };
  return (
    <Box sx={style}>

                <p className="td_table_Modal">
                  <TextField
                    label="Filled success"
                    variant="filled"
                    color="success"
                    focused
                    value={sousArticle.Nom}
                    name="Nom"
                    onChange={handleChangeInput}
                  />
                </p>
                <p className="td_table_Modal">
                  <Button
                    onClick={ajoutSousArticle}
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    Ajouter sous article
                  </Button>
                </p>
                <p className="td_table_Modal" onClick={handleCloseSousArticle}>
                  <h2 className="exit_modal">x</h2>
                </p>

        </Box>
  )
}

export default ModalAjoutSousArticle