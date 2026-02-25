import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const ClientEdit: React.FC = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps, queryResult } = useForm({
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });

  React.useEffect(() => {
    const data = queryResult?.data?.data;
    if (data) {
      formProps.form?.setFieldsValue(data);
    }
  }, [queryResult?.data?.data, formProps.form]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Card title={t("clients.fields.basic_info")} size="small" style={{ marginBottom: 16 }}>
          <Form.Item
            label={t("clients.fields.name")}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Space size="large" style={{ display: "flex" }}>
            <Form.Item label={t("clients.fields.idno")} name="idno" rules={[{ max: 13 }]}>
              <Input />
            </Form.Item>
            <Form.Item label={t("clients.fields.vat_code")} name="vat_code">
              <Input />
            </Form.Item>
          </Space>
          <Form.Item label={t("clients.fields.director_name")} name="director_name">
            <Input />
          </Form.Item>
          <Form.Item label={t("clients.fields.country")} name="country">
            <Select
              options={[
                { label: t("common.countries.Moldova"), value: "Moldova" },
                { label: t("common.countries.Other"), value: "Other" },
              ]}
            />
          </Form.Item>
          <Form.Item label={t("clients.fields.legal_address")} name="legal_address">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label={t("clients.fields.physical_address")} name="physical_address">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label={t("clients.fields.notes")} name="notes">
            <Input.TextArea />
          </Form.Item>
        </Card>

        <Card title={t("clients.fields.bank_accounts")} size="small" style={{ marginBottom: 16 }}>
          <Form.List name="bank_accounts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16, border: '1px solid #f0f0f0', padding: 12, borderRadius: 4 }}>
                    <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                    </Space>
                    <Form.Item
                      {...restField}
                      label={t("common.fields.bank_name")}
                      name={[name, "bank_name"]}
                    >
                      <Input />
                    </Form.Item>
                    <Space wrap>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.iban")}
                        name={[name, "iban"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.swift_bic")}
                        name={[name, "swift_bic"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.bank_code")}
                        name={[name, "bank_code"]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t("common.buttons.add_bank_account")}
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title={t("clients.fields.contacts")} size="small">
          <Form.List name="contacts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16, border: '1px solid #f0f0f0', padding: 12, borderRadius: 4 }}>
                    <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                    </Space>
                    <Space wrap align="baseline">
                      <Form.Item
                        {...restField}
                        label={t("common.fields.position")}
                        name={[name, "position"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.first_name")}
                        name={[name, "first_name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.last_name")}
                        name={[name, "last_name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.phone")}
                        name={[name, "phone"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={t("common.fields.email")}
                        name={[name, "email"]}
                        rules={[{ type: 'email' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  {t("common.buttons.add_contact")}
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      </Form>
    </Edit>
  );
};
