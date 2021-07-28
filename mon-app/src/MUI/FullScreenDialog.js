import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import { useEffect, useState } from "react";
import { mobileVendor, getUA, deviceDetect, browserName, CustomView } from 'react-device-detect';
import { useWindowWidth } from '@wojtekmaj/react-hooks'

import samplePDF from "../sample.pdf";
import AllPagesPDFViewer from "../components/pdf/all-pages";
import "./Dialog.css";


let external = 0;
let p = 0
let count = 0
let eventType = 3
let maxEventType = 3;
let time = 3;
let id = 0;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getOperatingSystem(window) {
  let operatingSystem = 'Not known';
  if (window.navigator.appVersion.indexOf('Win') !== -1) { operatingSystem = 'Windows OS'; }
  if (window.navigator.appVersion.indexOf('Mac') !== -1) { operatingSystem = 'MacOS'; }
  if (window.navigator.appVersion.indexOf('X11') !== -1) { operatingSystem = 'UNIX OS'; }
  if (window.navigator.appVersion.indexOf('Linux') !== -1) { operatingSystem = 'Linux OS'; }
  return operatingSystem;
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function FullScreenDialog(props) {
  const w = useWindowWidth();
const h= window.screen.height;
const rapport= w/h;
  //creating IP state
  const [ip, setIP] = useState('');
  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    // console.log(res.data);
    setIP(res.data.IPv4)
  }

  // console.log(getOperatingSystem(window));
  // console.log(browserName);
  const userAgent = getUA;
  //return mobile vendor (LG ,Iphone ..)
  console.log(mobileVendor);
  


  const timer = setInterval(() => {
    if (external > 25) {
      eventType = 4;
    }
    if (eventType > maxEventType) {
      maxEventType = eventType;
    }
    if (external > 50) {
      eventType = 5;
    }
    if (eventType > maxEventType) {
      maxEventType = eventType;
    }
    if (external > 75) {
      eventType = 6;
    }
    if (eventType > maxEventType) {
      maxEventType = eventType;
    }
    if (external == 100) {
      eventType = 7;
    }
    if (eventType > maxEventType) {
      maxEventType = eventType;
    }
    if (external == p) {
      count += 1;
    }
    else {
      p = external;
      count = 0;

    }

    if (count == 1) {
    let EventTimeStamp = Math.round((new Date().getTime()) / 1000);
    const scrollAdd = { ipAddress: ip.toString(), userAgent: userAgent.toString(), eventType: maxEventType.toString(), currentPoint: external.toString(), eventTimestamp: EventTimeStamp.toString(), entryId: window.location.href.toString(), referrer: "pdf", delay: time.toString() };
    axios({
        method: "post",
        url: "http://localhost:1337/activity-logs",
        data: scrollAdd
      });
    id += 1;
    console.log("Post");
    time = 3;
    }
    if (count > 1) {
      time += 3;
      
      console.log("put");
      axios.put('http://localhost:1337/activity-logs/' + id.toString(), { delay: time.toString() })
    }
    if (p != external) {

      count = 0;
    }
  }, 3000)


  useEffect(() => {
    getData()
    return () => {
      clearInterval(timer);

    }
  })
  console.log('----------------------', ip)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        onScroll={(e) => { external = (e.target.scrollTop)/rapport }}

      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {props.children}
        <div className="parent">
          <div className="child1">
            <AllPagesPDFViewer className="all-page-container" pdf={samplePDF} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
