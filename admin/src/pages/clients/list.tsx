import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ClientList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={70} />
        <Table.Column dataIndex="name" title="Наименование" />
        <Table.Column dataIndex="idno" title="IDNO" />
        <Table.Column dataIndex="director_name" title="Администратор" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="phone" title="Телефон" />
        <Table.Column
          title="Действия"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
