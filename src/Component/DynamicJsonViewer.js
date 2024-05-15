import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./NewMain.css"; // Import custom CSS for styling
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import CardComponent from "./CardComponent/CardComponent";
import styles from "./main.module.scss";
import { Button } from "antd";
import TextAreaComponent from "./TextAreaComponent";
const DynamicJsonViewer = () => {
  const [object, setObject] = useState(BaseObject);
  const [remainingPatches, setRemainingPatches] = useState([]);
  console.log("remainingPatches",typeof remainingPatches);
  const handleChange = (e) => {
    setRemainingPatches(e.target.value);
  };
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

  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(object, null, 2);

  const handleAddJson = () => {
    const jsonPatchArray = JSON.parse(remainingPatches);

    console.log('jsonPatchArray', jsonPatchArray)
    const updateJson = jsonPatchArray.map((element) => {
      const { op, path, value } = element;
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
        prevPatches.filter((patchItem) => patchItem !== element)
      );
    });
    return updateJson;
  };
  return (
    <div className={styles.jsonContainer}>
      <h2>Remaining Patches</h2>
      <TextAreaComponent
        name="remainingPatches"
        value={remainingPatches}
        onChange={handleChange}
      />
      <Button onClick={handleAddJson}>Add Json</Button>
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
        />
      </div>
    </div>
  );
};

export default DynamicJsonViewer;
