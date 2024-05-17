import React, { useEffect, useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { AfterBaseObject, BaseObject, JSONPatch } from "./Constant";
import { Button, message } from "antd";
import styles from "./main.module.scss";
import ModalComponent from "./ModalComponent";

const SingleDynamicJson = () => {
  const initialJsonObject = {
    op: "",
    path: "",
    value: "",
  };
  const [createJsonObj, setCreateJsonObj] = useState(initialJsonObject);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { op = "", path = "", value = "" } = createJsonObj;
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setCreateJsonObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [baseObject, setBaseObject] = useState(BaseObject);
  const [patchOperations, setPatchOperations] = useState([]);
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
        target[lastKey] = value;
      }
    });

    setBaseObject(updatedObject);
    setPatchOperations("");
  };
  const handleModal = (value) => {
    setIsModalOpen(value);
    setCreateJsonObj(initialJsonObject);
  };
  const handleAcceptChange = () => {
    try {
      setPatchOperations([...patchOperations, createJsonObj]);
      setCreateJsonObj(initialJsonObject);
      handleModal(false);
      message.success("Changes applied successfully!");
    } catch (error) {
      message.error("Invalid JSON format! Please check your input.");
    }
  };

  useEffect(() => {
    if (patchOperations) applyPatch();
  }, [patchOperations]);
  const [popoverContent, setPopoverContent] = useState(null);
  const oldText = JSON.stringify(AfterBaseObject, null, 2);
  const newText = JSON.stringify(baseObject, null, 2);
  const handleRejectChange = () => {
    setCreateJsonObj(initialJsonObject);
  };

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
  return (
    <div className={styles.singleJsonContainer}>
      <div>
        <p>There are changes to apply:</p>
        <div className={styles.actionBtnContainer}>
          <Button
            type="primary"
            onClick={() => handleModal(true)}
            className={styles.btnContainer}
          >
            Add Patch
          </Button>

          <Button onClick={handleRejectChange} className={styles.btnContainer}>
            Reject
          </Button>
        </div>
      </div>
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
      {isModalOpen && (
        <ModalComponent
          isModalOpen={isModalOpen}
          handleModal={handleModal}
          handleAcceptChange={handleAcceptChange}
          op={op}
          path={path}
          value={value}
          onHandleChange={onHandleChange}
          setCreateJsonObj={setCreateJsonObj}
        />
      )}
    </div>
  );
};

export default SingleDynamicJson;
