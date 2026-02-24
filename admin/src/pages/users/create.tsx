import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

const ROLES = ["admin", "accountant"];

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("users.fields.name")}
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("users.fields.email")}
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label={t("users.fields.password")}
          name="password"
          rules={[{ required: true }, { min: 8 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("users.fields.password_confirmation")}
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("users.password_mismatch")));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("users.fields.role")}
          name="role"
          rules={[{ required: true }]}
        >
          <Select
            options={ROLES.map((r) => ({
              value: r,
              label: t(`users.roles.${r}`),
            }))}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
