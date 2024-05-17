import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const TextAreaComponent = ({
  name = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  isTextArea = false,
}) => {
  return (
    <>
      {isTextArea ? (
        <TextArea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={4}
          placeholder="Enter your json here"
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={200}
        />
      ) : (
        <Input name={name} value={value} onChange={onChange} />
      )}
    </>
  );
};

export default TextAreaComponent;
