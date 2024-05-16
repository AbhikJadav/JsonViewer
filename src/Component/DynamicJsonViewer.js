import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./NewMain.css"; // Import custom CSS for styling
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import CardComponent from "./CardComponent/CardComponent";
import styles from "./main.module.scss";
import { Button } from "antd";
import TextAreaComponent from "./TextAreaComponent";
const DynamicJsonViewer = () => {
  const [baseObject, setBaseObject] = useState(BaseObject);
  const [patchOperations, setPatchOperations] = useState(JSONPatch);

  const applyPatch = () => {
    let updatedObject = { ...baseObject };

    patchOperations.forEach((operation) => {
      const { op, path, value } = operation;

      // Apply the operation to the base object
      if (op === "add" || op === "replace") {
        // Handle complex paths by splitting and traversing the object
        const pathParts = path.split("/");
        let target = updatedObject;

        for (let i = 1; i < pathParts.length - 1; i++) {
          if (!target[pathParts[i]]) {
            target[pathParts[i]] = {};
          }
          target = target[pathParts[i]];
        }

        const lastKey = pathParts[pathParts.length - 1];
        if (op === "add") {
          target[lastKey] = value;
        } else if (op === "replace") {
          target[lastKey] = value;
        }
      }
    });

    // Update the base object
    setBaseObject(updatedObject);
    // Clear the patch operations
    setPatchOperations([]);
  };

  const handleAcceptChange = () => {
    applyPatch();
  };

  const handleRejectChange = () => {
    // Clear the patch operations
    setPatchOperations([]);
  };
  const [popoverContent, setPopoverContent] = useState(null);
  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(baseObject, null, 2);
  const [selectedLineNumber, setSelectedLineNumber] = useState(null);
  const handleLineClick = (lineNumber) => {
    setSelectedLineNumber(lineNumber);
    // Perform analysis based on the selected line number
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");

    if (
      lineNumber > 0 &&
      lineNumber <= oldLines.length &&
      lineNumber <= newLines.length
    ) {
      const oldLine = oldLines[lineNumber - 1];
      const newLine = newLines[lineNumber - 1];

      if (oldLine !== newLine) {
        // Determine the type of change (insertion, deletion, modification)
        if (oldLine && !newLine) {
          console.log(`Line ${lineNumber}: Deletion - ${oldLine}`);
        } else if (!oldLine && newLine) {
          console.log(`Line ${lineNumber}: Insertion - ${newLine}`);
        } else {
          console.log(
            `Line ${lineNumber}: Modification - ${oldLine} => ${newLine}`
          );
        }
      }
    }
  };
  const handleLineHover = (lineNumber) => {
    setSelectedLineNumber(lineNumber);
    const content = (
      <Button onClick={() => handleLineClick(lineNumber)}>Accept</Button>
    );
    setPopoverContent(content);
  };

  return (
    <div className={styles.jsonContainer}>
      <h2>Remaining Patches</h2>
      {/* <TextAreaComponent
        name="remainingPatches"
        value={remainingPatches}
        onChange={handleChange}
      /> */}
      {patchOperations.length > 0 ? (
        <div>
          <p>There are {patchOperations.length} changes to apply:</p>
          <button onClick={handleAcceptChange}>Apply Patch</button>
          <button onClick={handleRejectChange}>Reject Patch</button>
        </div>
      ) : (
        <p>No changes to apply</p>
      )}
      <div className={styles.jsonViewerWraper}>
        <ReactDiffViewer
          oldValue={oldText}
          newValue={newText}
          splitView={true}
          onLineNumberClick={(lineNumber) => handleLineHover(lineNumber)}
          disableWordDiff={true}
          showDiffOnly={false}
          expand={false}
          leftTitle="Base Object"
          rightTitle="Updated Object"
        />
        {popoverContent && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              background: "#fff",
              padding: "10px",
              border: "1px solid #ccc",
              zIndex: 1000, // Ensure popover is above the diff viewer
            }}
          >
            {popoverContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicJsonViewer;
