import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./NewMain.css"; // Import custom CSS for styling
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import CardComponent from "./CardComponent/CardComponent";
import styles from "./main.module.scss";
import { Button } from "antd";
const JsonViewerWithCard = () => {
  const newStyles = {
    line: {
      padding: "10px",
    },
    contentText: {
      color: "red",
    },
  };

  // const [acceptedText, setAcceptedText] = useState(newText);

  // const handleAcceptChanges = () => {
  //   setAcceptedText(newText);
  //   // You can perform additional actions here, like saving the accepted text.
  // };

  // const handleRejectChanges = () => {
  //   // Perform actions to revert to the original text or previous version.
  //   // For example, you might fetch the original text from a server or reset state.
  //   setAcceptedText(oldText);
  // };
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
  // const differ = new Differ({
  //   detectCircular: true, // default `true`
  //   maxDepth: Infinity, // default `Infinity`
  //   showModifications: true, // default `true`
  //   arrayDiffMethod: "lcs", // default `"normal"`, but `"lcs"` may be more useful
  // });
  // const diff = differ.diff(AfterBaseObject, object);
  const [value, setValue] = useState([]);
  const handleChange = (event) => {
    setValue([...value, event.target.value]);
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
                <Button type="primary" onClick={() => handleAccept(element)}>
                  Add
                </Button>,
                <Button onClick={() => handleReject(element)}> Delete</Button>,
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
          onLineNumberClick={(lineNumber) =>
            console.log(`Clicked line ${lineNumber}`)
          }
          disableWordDiff={true}
          showDiffOnly={false}
          expand={false}
          leftTitle="Base Object"
          rightTitle="Updated Object"
          styles={newStyles}
        />
        {/* Arrows for accepting and rejecting changes */}
        {/* <div className="action-arrows">
          <div className="arrow" onClick={handleAcceptChanges}>
            &#8594;
          </div>
          <div className="arrow" onClick={handleRejectChanges}>
            &#8592;
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default JsonViewerWithCard;
