import React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Pdf from "react-to-pdf";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ref = React.createRef();

const styleArticleDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "35vw",
  bgcolor: "background.paper",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  borderRadius: "25px",
  p: 4,
  overflowY: "auto",
  overflowX: "hidden",
};
function ModalMiseEnBar({ refs, vals, handleCloseMiseEnBar }) {
  return (
    <Box sx={styleArticleDetails}>
      <List ref={ref}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Réference
              </TableCell>
              <TableCell align="center" colSpan={2}>
              quantite
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              
                {refs.map((item) => { 
        
                  return<TableRow align="center" colSpan={4}> <TableCell align="center" colSpan={4}>{item}</TableCell><TableCell align="center" colSpan={4}>{Math.ceil(vals[refs.indexOf(item)])}</TableCell></TableRow>
                
              })}
              
            
            
          </TableBody>
        </Table>

       
      </List>
      <Button variant="outlined" color="error" onClick={handleCloseMiseEnBar}>
        Fermer
      </Button>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => (
          <Button variant="outlined" color="error" onClick={toPdf}>
            PDF
          </Button>
        )}
      </Pdf>
    </Box>
  );
}

export default ModalMiseEnBar;
