/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddTwoTone,
  Delete,
  DeleteTwoTone,
  FileDownloadDoneTwoTone,
  FileUploadTwoTone,
  UploadFileTwoTone,
  Visibility,
} from "@mui/icons-material";
import { GiCrossedChains } from "react-icons/gi";
import {
  Divider,
  Button,
  Tooltip,
  CircularProgress,
  IconButton,
  Link,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";

import { IPFS_NODE, SERVER_URL } from "../../../../Data/serveur";
import { AddEtudiant } from "./addEtudiant";
import { notifier } from "../../../../redux/notifSlice";
import ImportDialog from "./importDialog";
const Certifies = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [openDialogImport, setopenDialogImport] = useState(false);
  const user = useSelector((state) => state.user.data);
  let [etudiants, setetudiants] = useState(null);

  const [isLoading, setisLoading] = useState(false);

  const dis = useDispatch();
  const Close = () => {
    setopenDialog(false);
  };
  useEffect(() => {
    getetudiants();
  }, []);
  function getetudiants() {
    setisLoading(true);

    axios
      .get(SERVER_URL + "/mesEtudiants/getAll/3/" + user.etablissement_id._id)
      .then((v) => {
        setetudiants(v.data);
      })
      .catch((v) => console.log(v.response))
      .finally(() => setisLoading(false));
  }

  return (
    <div className="py-8 px-4 bg-white border-[1px]">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-2 justify-between">
            <h2>Liste des certifiés</h2>
            <div className="flex flex-row gap-2 items-center"></div>
          </div>
          <Divider />
          {etudiants ? (
            <ItemCertif etudiants={etudiants.reverse()} />
          ) : (
            <p className="pt-4 opacity-30">Vous n'avez aucun étudiant</p>
          )}
        </>
      )}
    </div>
  );
};

export default Certifies;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ItemCertif({ etudiants, deleteEtudiant }) {
  const getDateTime = (t) => {
    const today = new Date(t);
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" className="">
          <TableHead
            style={{ background: "orange" }}
            className="bg-accentué-normal"
          >
            <TableRow>
              <StyledTableCell>Nom</StyledTableCell>

              <StyledTableCell>Prenom</StyledTableCell>
              <StyledTableCell>Intitulé</StyledTableCell>
              <StyledTableCell>Hash</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {etudiants.map((row, i) => {
              return (
                <>
                  <StyledTableRow
                    key={i}
                    className="group transition-all duration-300 "
                  >
                    <StyledTableCell component="th" scope="row" className="">
                      <p className=" font-semibold mb-1 font-corps_1 uppercase">
                        {row.nom}
                      </p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <p className="">{row.prenom}</p>
                    </StyledTableCell>

                    <StyledTableCell>
                      <p className="opacity-70 underline underline-offset-2">
                        {row.intitule}
                      </p>
                    </StyledTableCell>

                    <StyledTableCell>{row.diplome.hash}</StyledTableCell>
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
