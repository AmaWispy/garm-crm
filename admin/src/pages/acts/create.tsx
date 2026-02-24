import React from "react";
import { Create, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Space } from "antd";
import dayjs from "dayjs";

export const ActCreate: React.FC = () => {
  const { formProps, saveButtonProps, queryResult, action } = useForm();

  const { selectProps: clientSelectProps } = useSelect({
    resource: "clients",
    optionLabel: "name",
  });

  const { selectProps: invoiceSelectProps } = useSelect({
    resource: "invoices",
    optionLabel: "number",
  });

  // Handle date conversion for edit mode
  React.useEffect(() => {
    const data = queryResult?.data?.data;
    if (data) {
      const values = { ...data };
      if (values.date) values.date = dayjs(values.date);
      formProps.form?.setFieldsValue(values);
    }
  }, [queryResult?.data?.data, formProps.form]);

  const FormContent = (
    <Form 
      {...formProps} 
      layout="vertical"
    >
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
        <Form.Item label="Amount" name="amount" rules={[{ required: true }]} initialValue={0}>
          <InputNumber />
        </Form.Item>
      </Space>
      <Form.Item label="Details" name="details">
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
