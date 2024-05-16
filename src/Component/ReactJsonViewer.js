import React from "react";
import ReactDiffViewer from "react-diff-viewer";

const ReactJsonViewer = ({ oldValue = "", newValue = "" }) => {
  return (
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={true} // Enable split view
      hideLineNumbers={false} // Show line numbers
      showDiffOnly={false} // Show entire file, not just diffs
      expand={true} // Enable expand lines
      disableWordDiff={true}
      onLineNumberClick={(lineNumber) =>
        console.log(`Clicked line ${lineNumber}`)
      }
    />
  );
};

export default ReactJsonViewer;
