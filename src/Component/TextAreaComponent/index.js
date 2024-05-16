import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const TextAreaComponent = ({ name = "", value = "", onChange = () => {} }) => {
  return (
    <>
      <TextArea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder="Enter your json here"
        autoSize={{ minRows: 3, maxRows: 5 }}
        maxLength={200}
      />
    </>
  );
};

export default TextAreaComponent;
