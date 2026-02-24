import React from "react";
import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const MyCompanyList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Мои компании">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={70} />
        <Table.Column dataIndex="name" title="Наименование" />
        <Table.Column dataIndex="idno" title="IDNO" />
        <Table.Column dataIndex="vat_code" title="НДС" />
        <Table.Column 
          dataIndex="contacts" 
          title="Email" 
          render={(contacts: any[]) => contacts?.[0]?.email || "-"}
        />
        <Table.Column 
          dataIndex="contacts" 
          title="Телефон" 
          render={(contacts: any[]) => contacts?.[0]?.phone || "-"}
        />
        <Table.Column dataIndex="bank_name" title="Банк" />
        <Table.Column
          title="Действия"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
