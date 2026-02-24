import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, Typography } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

export const ClientEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Card title="Основная информация" size="small" style={{ marginBottom: 16 }}>
          <Form.Item
            label="Наименование"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Space size="large" style={{ display: "flex" }}>
            <Form.Item label="IDNO (13 цифр)" name="idno" rules={[{ max: 13 }]}>
              <Input />
            </Form.Item>
            <Form.Item label="НДС" name="vat_code">
              <Input />
            </Form.Item>
          </Space>
          <Form.Item label="Администратор" name="director_name">
            <Input />
          </Form.Item>
          <Form.Item label="Юридический адрес" name="legal_address">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Физический адрес" name="physical_address">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Заметки" name="notes">
            <Input.TextArea />
          </Form.Item>
        </Card>

        <Card title="Банковские реквизиты" size="small" style={{ marginBottom: 16 }}>
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
                      label="Название банка"
                      name={[name, "bank_name"]}
                    >
                      <Input />
                    </Form.Item>
                    <Space wrap>
                      <Form.Item
                        {...restField}
                        label="IBAN"
                        name={[name, "iban"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="SWIFT/BIC"
                        name={[name, "swift_bic"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Код Банка"
                        name={[name, "bank_code"]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить банковский счет
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Контактные данные" size="small">
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
                        label="Должность"
                        name={[name, "position"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Имя"
                        name={[name, "first_name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Фамилия"
                        name={[name, "last_name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Телефон"
                        name={[name, "phone"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Email"
                        name={[name, "email"]}
                        rules={[{ type: 'email' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Space>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить контактное лицо
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      </Form>
    </Edit>
  );
};
