import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export const InvoiceCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: clientSelectProps } = useSelect({
    resource: "clients",
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
        <Space>
          <Form.Item label="Number" name="number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Due Date" name="due_date">
            <DatePicker />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item label="Type" name="type" initialValue="one-time">
            <Select
              options={[
                { label: "One-time", value: "one-time" },
                { label: "Monthly", value: "monthly" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Status" name="status" initialValue="unpaid">
            <Select
              options={[
                { label: "Unpaid", value: "unpaid" },
                { label: "Partially", value: "partially" },
                { label: "Paid", value: "paid" },
              ]}
            />
          </Form.Item>
        </Space>

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    rules={[{ required: true, message: "Missing description" }]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <InputNumber placeholder="Qty" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "unit"]}
                    initialValue="pcs"
                  >
                    <Input placeholder="Unit" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <InputNumber placeholder="Price" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Space>
          <Form.Item label="Total Amount" name="total_amount" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Paid Amount" name="paid_amount" initialValue={0}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Currency" name="currency" initialValue="MDL">
            <Input />
          </Form.Item>
        </Space>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Create>
  );
};
