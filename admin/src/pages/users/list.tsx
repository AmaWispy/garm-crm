import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useTranslation } from "react-i18next";

const ROLE_COLORS: Record<string, string> = {
  admin: "red",
  accountant: "gold",
};

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation();
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={70} />
        <Table.Column dataIndex="name" title={t("users.fields.name")} />
        <Table.Column dataIndex="email" title={t("users.fields.email")} />
        <Table.Column
          dataIndex="role"
          title={t("users.fields.role")}
          render={(role: string) => (
            <Tag color={ROLE_COLORS[role] ?? "default"}>
              {t(`users.roles.${role}`)}
            </Tag>
          )}
        />
        <Table.Column
          title={t("buttons.actions")}
          dataIndex="actions"
          width={120}
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                meta={{ id: record.id }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
