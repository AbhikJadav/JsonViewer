import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant"; // Assuming JSONPatch is not used
import { Button, message } from "antd";
import styles from "./main.module.scss";
import TextAreaComponent from "./TextAreaComponent";

const DynamicJsonViewer = () => {
  const [baseObject, setBaseObject] = useState(BaseObject);
  const [patchOperations, setPatchOperations] = useState(
    JSON.stringify(JSONPatch, null, 2)
  );

  const applyPatch = (convertedJsonPatch) => {
    let updatedObject = { ...baseObject };

    convertedJsonPatch.forEach((operation) => {
      const { op, path, value } = operation;

      if (op === "add" || op === "replace") {
        const pathParts = path.split("/");
        let target = updatedObject;

        for (let i = 1; i < pathParts.length - 1; i++) {
          if (!target[pathParts[i]]) {
            target[pathParts[i]] = {};
          }
          target = target[pathParts[i]];
        }

        const lastKey = pathParts[pathParts.length - 1];
        target[lastKey] = value;
      }
    });

    setBaseObject(updatedObject);
    setPatchOperations("");
  };

  const handleAcceptChange = () => {
    try {
      const parsedData = JSON.parse(patchOperations);
      applyPatch(parsedData);
      message.success("Changes applied successfully!");
    } catch (error) {
      message.error("Invalid JSON format! Please check your input.");
    }
  };

  const handleRejectChange = () => {
    setPatchOperations("");
  };

  const [popoverContent, setPopoverContent] = useState(null);
  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(baseObject, null, 2);

  const handleLineHover = (lineNumber) => {
    const content = (
      <Button
        onClick={() => {
          setBaseObject(AfterBaseObject);
          setPopoverContent(null);
        }}
        className={styles.btnContainer}
      >
        Reject
      </Button>
    );
    setPopoverContent(content);
  };

  const handleChange = (event) => {
    setPatchOperations(event.target.value);
  };

  return (
    <div className={styles.jsonContainer}>
      <h2>Remaining Patches</h2>
      {!popoverContent && (
        <TextAreaComponent
          name="patchOperations"
          value={patchOperations}
          onChange={handleChange}
          isTextArea
        />
      )}
      {patchOperations.length > 0 ? (
        <div>
          <p>There are changes to apply:</p>
          <div className={styles.actionBtnContainer}>
            <Button
              type="primary"
              onClick={handleAcceptChange}
              className={styles.btnContainer}
            >
              Accept
            </Button>

            <Button
              onClick={handleRejectChange}
              className={styles.btnContainer}
            >
              Reject
            </Button>
          </div>
        </div>
      ) : (
        <p>No changes to apply</p>
      )}
      <div className={styles.jsonViewerWrapper}>
        <ReactDiffViewer
          oldValue={oldText}
          newValue={newText}
          splitView={true}
          onLineNumberClick={handleLineHover}
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
              zIndex: 1000,
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
