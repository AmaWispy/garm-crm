import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { useTranslation } from "react-i18next";

export const MyCompanyList: React.FC = () => {
  const { t } = useTranslation();
  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });

  return (
    <List title={t("myCompanies.title.list")}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={70} />
        <Table.Column dataIndex="name" title={t("clients.fields.name")} />
        <Table.Column dataIndex="idno" title={t("clients.fields.idno")} />
        <Table.Column dataIndex="vat_code" title={t("clients.fields.vat_code")} />
        <Table.Column 
          dataIndex="contacts" 
          title={t("common.fields.email")} 
          render={(contacts: any[]) => contacts?.[0]?.email || "-"}
        />
        <Table.Column 
          dataIndex="contacts" 
          title={t("common.fields.phone")} 
          render={(contacts: any[]) => contacts?.[0]?.phone || "-"}
        />
        <Table.Column dataIndex="bank_name" title={t("common.fields.bank_name")} />
        <Table.Column
          title={t("buttons.actions")}
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
