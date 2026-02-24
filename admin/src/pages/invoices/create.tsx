import React from "react";
import { Create, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const InvoiceCreate: React.FC = () => {
  const { formProps, saveButtonProps, queryResult, action } = useForm({
    meta: {
      populate: ["client", "myCompany", "items"],
    },
  });

  const { selectProps: clientSelectProps } = useSelect({
    resource: "clients",
    optionLabel: "name",
  });

  const { selectProps: myCompanySelectProps } = useSelect({
    resource: "my-companies",
    optionLabel: "name",
  });

  // Handle date conversion for edit mode
  React.useEffect(() => {
    const data = queryResult?.data?.data;
    if (data) {
      const values = { ...data };
      if (values.date && typeof values.date === "string") {
        values.date = dayjs(values.date);
      }
      if (values.due_date && typeof values.due_date === "string") {
        values.due_date = dayjs(values.due_date);
      }
      formProps.form?.setFieldsValue(values);
    }
  }, [queryResult?.data?.data, formProps.form]);

  const FormContent = (
    <Form 
      {...formProps} 
      layout="vertical"
    >
      <Space size="large" style={{ display: "flex" }}>
        <Form.Item
          label="Компания-эмитент"
          name="my_company_id"
          rules={[{ required: true }]}
          style={{ minWidth: 200 }}
        >
          <Select {...myCompanySelectProps} />
        </Form.Item>
        <Form.Item
          label="Клиент"
          name="client_id"
          rules={[{ required: true }]}
          style={{ minWidth: 200 }}
        >
          <Select {...clientSelectProps} />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item label="Number" name="number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Date" 
          name="date" 
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item 
          label="Due Date" 
          name="due_date"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" />
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
              <Button type="dashed" onClick={() => add({ unit: "pcs" })} block icon={<PlusOutlined />}>
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
          <Select
            options={[
              { label: "MDL", value: "MDL" },
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
            ]}
          />
        </Form.Item>
      </Space>

      <Form.Item label="Notes" name="notes">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );

  return action === "create" ? (
    <Create saveButtonProps={saveButtonProps}>{FormContent}</Create>
  ) : (
    <Edit saveButtonProps={saveButtonProps}>{FormContent}</Edit>
  );
};
