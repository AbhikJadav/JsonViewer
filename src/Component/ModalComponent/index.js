import React from "react";
import { Form, Input, Modal } from "antd";
const ModalComponent = ({
  isModalOpen = false,
  handleModal = () => {},
  handleAcceptChange = () => {},
  op = "",
  path = "",
  value = "",
  setCreateJsonObj = () => {},
}) => {
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setCreateJsonObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <Modal
        title="Add Patch"
        open={isModalOpen}
        onOk={() => handleAcceptChange()}
        onCancel={() => handleModal(false)}
        okText="ADD"
        cancelText="Reject"
        okButtonProps={{ disabled: !op || !path || !value }}
      >
        <Form.Item
          label="Op"
          name="op"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input name="op" value={op} onChange={onHandleChange} />
        </Form.Item>
        <Form.Item
          label="Path"
          name="path"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input name="path" value={path} onChange={onHandleChange} />
        </Form.Item>
        <Form.Item
          label="Value"
          name="value"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input name="value" value={value} onChange={onHandleChange} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalComponent;
