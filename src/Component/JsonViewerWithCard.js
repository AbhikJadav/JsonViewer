import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./NewMain.css";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import styles from "./main.module.scss";
import { Button } from "antd";
import CardComponent from "../Component/CardComponent/CardComponent";
const JsonViewerWithCard = () => {
  const newStyles = {
    line: {
      padding: "10px",
    },
    contentText: {
      color: "red",
    },
  };

  const [object, setObject] = useState(BaseObject);
  const [remainingPatches, setRemainingPatches] = useState(JSONPatch);
  const handleAccept = (patch) => {
    const { op, path, value } = patch;
    if (op === "replace") {
      setObject((prevObject) => {
        const newObj = { ...prevObject };
        const pathParts = path.split("/").filter((part) => part !== "");
        let current = newObj;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;
        return newObj;
      });
    } else if (op === "add") {
      setObject((prevObject) => {
        const newObj = { ...prevObject };
        const pathParts = path.split("/").filter((part) => part !== "");
        let current = newObj;
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {};
          }
          current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;
        return newObj;
      });
    }
    setRemainingPatches((prevPatches) =>
      prevPatches.filter((patchItem) => patchItem !== patch)
    );
  };

  const handleReject = (patch) => {
    setRemainingPatches((prevPatches) =>
      prevPatches.filter((patchItem) => patchItem !== patch)
    );
  };

  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(object, null, 2);

  return (
    <div className={styles.jsonContainer}>
      <h2>Remaining Patches</h2>
      <div className={styles.patchWrapper}>
        {remainingPatches.map((element, index) => {
          const { op, path, value } = element;
          return (
            <CardComponent
              op={op}
              path={path}
              value={value}
              action={[
                <div className={styles.actionBtn}>
                  <Button
                    type="primary"
                    onClick={() => handleAccept(element)}
                    className={styles.btnContainer}
                  >
                    Accept
                  </Button>
                  ,
                  <Button
                    onClick={() => handleReject(element)}
                    className={styles.btnContainer}
                  >
                    Reject
                  </Button>
                  ,
                </div>,
              ]}
            />
          );
        })}
      </div>
      <div className={styles.jsonViewerWraper}>
        <ReactDiffViewer
          oldValue={oldText}
          newValue={newText}
          splitView={true}
          onLineNumberClick={(lineNumber, type) =>
            console.log(`Clicked line ${lineNumber}`)
          }
          disableWordDiff={true}
          showDiffOnly={false}
          expand={false}
          leftTitle="Base Object"
          rightTitle="Updated Object"
          // styles={newStyles}
          onLineContentClick={(line, type) =>
            console.log(`Line content ${line} clicked on ${type} side`)
          }
        />
      </div>
    </div>
  );
};

export default JsonViewerWithCard;
