import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

const ROLES = ["admin", "accountant"];

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps } = useForm();

  const onFinish = (values: Record<string, unknown>) => {
    const next = { ...values };
    if (!next.password || (next.password as string).trim() === "") {
      delete next.password;
      delete next.password_confirmation;
    }
    return formProps.onFinish?.(next);
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinish}>
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
          rules={[{ min: 8 }]}
          extra={t("users.password_leave_blank")}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
        <Form.Item
          label={t("users.fields.password_confirmation")}
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
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
          <Input.Password placeholder="••••••••" />
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
    </Edit>
  );
};
