import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function AllPages(props) {
  const [numPagesState, setNumPages] = useState(null);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf } = props;

  return (
    <Document
      file={pdf}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
      // onLoadSuccess={(obj) => numPagesNew = obj. }

    >
      {Array.from(new Array(numPagesState), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
