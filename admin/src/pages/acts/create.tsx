import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Space } from "antd";

export const ActCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: clientSelectProps } = useSelect({
    resource: "clients",
  });

  const { selectProps: invoiceSelectProps } = useSelect({
    resource: "invoices",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Client"
          name="client_id"
          rules={[{ required: true }]}
        >
          <Select {...clientSelectProps} />
        </Form.Item>
        <Form.Item
          label="Invoice (Optional)"
          name="invoice_id"
        >
          <Select {...invoiceSelectProps} allowClear />
        </Form.Item>
        <Space>
          <Form.Item label="Number" name="number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        </Space>
        <Form.Item label="Details" name="details">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Create>
  );
};
