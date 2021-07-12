import React, { useEffect } from "react";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import axios from "axios";

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./sample.pdf";
import { useScrollPercentage } from "react-scroll-percentage";
import "./styles.css";
import Dialog from "./MUI/Dialog";

const animals = [];
const MINUTE_MS = 1000;
export default function App() {
  return (
    // <div className="App" ref={ref}>
    //   <AllPagesPDFViewer className="all-page-container" pdf={samplePDF} />
    // </div>
    <div>
      <Dialog />
    </div>
  );
}
