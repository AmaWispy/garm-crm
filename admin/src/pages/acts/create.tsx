import React from "react";
import { Create, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Space } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const ActCreate: React.FC = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps, queryResult, action } = useForm({
    meta: {
      populate: ["client", "invoice", "myCompany"],
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
      <Space size="large" style={{ display: "flex" }}>
        <Form.Item
          label={t("invoices.fields.emitter")}
          name="my_company_id"
          rules={[{ required: true }]}
          style={{ minWidth: 200 }}
        >
          <Select {...myCompanySelectProps} />
        </Form.Item>
        <Form.Item
          label={t("invoices.fields.client")}
          name="client_id"
          rules={[{ required: true }]}
          style={{ minWidth: 200 }}
        >
          <Select {...clientSelectProps} />
        </Form.Item>
      </Space>
      
      <Form.Item
        label={t("acts.labels.to_invoice")}
        name="invoice_id"
      >
        <Select {...invoiceSelectProps} allowClear />
      </Form.Item>
      <Space>
        <Form.Item label={t("invoices.fields.number")} name="number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label={t("invoices.fields.date")} 
          name="date" 
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label={t("invoices.fields.total_amount")} name="amount" rules={[{ required: true }]} initialValue={0}>
          <InputNumber />
        </Form.Item>
      </Space>

      <Form.Item label={t("acts.labels.description_works")} name="details">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );

  return action === "create" ? (
    <Create saveButtonProps={saveButtonProps}>{FormContent}</Create>
  ) : (
    <Edit saveButtonProps={saveButtonProps}>{FormContent}</Edit>
  );
};
