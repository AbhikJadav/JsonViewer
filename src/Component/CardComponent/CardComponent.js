import React from "react";
import styles from "./CardComponent.module.scss";
import {  Card, Col, Row } from "antd";
const CardComponent = ({
  op = "",
  path = "",
  value = "" || {},
  action = [],
}) => {
  return (
    <Card title="Card title" className={styles.cardContainer} actions={action}>
      <div className={styles.cardWrappeer}>
        <div>
          <b>Operation</b> : {op}
        </div>
        <div>
          <b>Path</b> : {path}
        </div>
        <div>
          <b>Value</b> : {JSON.stringify(value)}
        </div>
      </div>
    </Card>
  );
};

export default CardComponent;
