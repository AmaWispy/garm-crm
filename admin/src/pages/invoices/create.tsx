import React from "react";
import { Create, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Button, Space, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const InvoiceCreate: React.FC = () => {
  const { t } = useTranslation();
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
        <Form.Item 
          label={t("invoices.fields.due_date")} 
          name="due_date"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Space>
      <Space>
        <Form.Item label={t("invoices.fields.type")} name="type" initialValue="one-time">
          <Select
            options={[
              { label: "One-time", value: "one-time" },
              { label: "Monthly", value: "monthly" },
            ]}
          />
        </Form.Item>
        <Form.Item label={t("invoices.fields.status")} name="status" initialValue="unpaid">
          <Select
            options={[
              { label: "Unpaid", value: "unpaid" },
              { label: "Partially", value: "partially" },
              { label: "Paid", value: "paid" },
            ]}
          />
        </Form.Item>
      </Space>

      <Card title={t("invoices.fields.items")} size="small" style={{ marginBottom: 16 }}>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    rules={[{ required: true, message: t("notifications.required") }]}
                  >
                    <Input placeholder={t("invoices.labels.description")} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: t("notifications.required") }]}
                  >
                    <InputNumber placeholder={t("invoices.labels.quantity")} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "unit"]}
                  >
                    <Input placeholder={t("invoices.labels.unit")} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: t("notifications.required") }]}
                  >
                    <InputNumber placeholder={t("invoices.labels.price")} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add({ unit: "pcs" })} block icon={<PlusOutlined />}>
                  {t("common.buttons.add")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      <Space>
        <Form.Item label={t("invoices.fields.total_amount")} name="total_amount" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={t("invoices.fields.paid_amount")} name="paid_amount" initialValue={0}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={t("invoices.fields.currency")} name="currency" initialValue="MDL">
          <Select
            options={[
              { label: "MDL", value: "MDL" },
              { label: "USD", value: "USD" },
              { label: "EUR", value: "EUR" },
            ]}
          />
        </Form.Item>
      </Space>

      <Form.Item label={t("invoices.fields.notes")} name="notes">
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
