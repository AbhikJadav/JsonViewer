import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import { Button } from "antd";
import styles from "./main.module.scss";
const DynamicJsonViewer = () => {
  const [baseObject, setBaseObject] = useState(BaseObject);
  const [patchOperations, setPatchOperations] = useState(JSONPatch);

  const applyPatch = () => {
    let updatedObject = { ...baseObject };

    patchOperations.forEach((operation) => {
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
        if (op === "add") {
          target[lastKey] = value;
        } else if (op === "replace") {
          target[lastKey] = value;
        }
      }
    });

    setBaseObject(updatedObject);
    setPatchOperations([]);
  };

  const handleAcceptChange = () => {
    applyPatch();
  };

  const handleRejectChange = () => {
    setPatchOperations([]);
  };
  const [popoverContent, setPopoverContent] = useState(null);
  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(baseObject, null, 2);

  const handleLineHover = (lineNumber) => {
    const content = (
      <Button
        onClick={() => setBaseObject(AfterBaseObject)}
        className={styles.btnContainer}
      >
        Reject
      </Button>
    );
    setPopoverContent(content);
  };

  return (
    <div className={styles.jsonContainer}>
      <h2>Remaining Patches</h2>
      {patchOperations.length > 0 ? (
        <div>
          <p>There are {patchOperations.length} changes to apply:</p>
          <div className={styles.actionBtnContainer}>
            <Button
              type="primary"
              onClick={() => handleAcceptChange()}
              className={styles.btnContainer}
            >
              Accept
            </Button>

            <Button
              onClick={() => handleRejectChange()}
              className={styles.btnContainer}
            >
              Reject
            </Button>
          </div>
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
