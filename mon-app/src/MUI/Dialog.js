import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import axios from "axios";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import samplePDF from "../sample.pdf";
import AllPagesPDFViewer from "../components/pdf/all-pages";
import "./Dialog.css";
import GenerateDiv from './GenerateDiv'

let external = 0;
let p = 0
var count = 0
var count1 = 3
let max = 3;
var d = 3;
var idii = 2;

export default function AlertDialog(props) {

  const [open, setOpen] = React.useState(false);

  const timer = setInterval(() => {

    if (external > 25) {
      count1 = 4;

    }
    if (count1 > max) {
      max = count1;
    }
    if (external > 50) {
      count1 = 5;

    }
    if (count1 > max) {
      max = count1;
    }
    if (external > 75) {
      count1 = 6;

    }
    if (count1 > max) {
      max = count1;
    }
    if (external == 100) {
      count1 = 7;

    }
    if (count1 > max) {
      max = count1;
    }
    
    if (external == p) {
      count += 1;
    }
    else {
      p = external;
      count = 0;


    }
    if (count == 1) {

      var d1 = Math.round((new Date().getTime()) / 1000);
      const scrollAdd = { eventType: max.toString(), currentPoint: external.toString(), eventTimestamp: d1.toString(), entryId: window.location.href.toString(), referrer: "pdf", delay: d.toString() };
      axios({

        // method: "post",
        url: "http://localhost:1337/activity-logs",
        data: scrollAdd
      });
      idii += 1;
      console.log("Post");
      d = 3;
    }
    if (count > 1) {
      d += 3;

      console.log("put");
      // axios.put('http://localhost:1337/activity-logs/'+idii.toString(), { delay: d.toString() })


    }
    if (p != external) {

      count = 0;
    }
  }, 3000)


  useEffect(() => {
    return () => {
      clearInterval(timer);

    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        //pour avoir la position du scroll Top
         onScroll={(e) => { external = e.target.scrollTop }}
        //#######pour avoir le pourcentage de scroll
        // onScroll={(e) => { external =((e.target.scrollTop +e.scrollHeight)*100)/ e.target.scrollHeight}}

      >
        <DialogContent>
          {props.children}
          <div className="parent">
            <div className="child1">
              <AllPagesPDFViewer className="all-page-container" pdf={samplePDF} />
            </div>
            <GenerateDiv ></GenerateDiv>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}