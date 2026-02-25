import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { useTranslation } from "react-i18next";

export const InvoiceList: React.FC = () => {
  const { t } = useTranslation();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title={t("invoices.invoices")}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="number" title={t("invoices.fields.number")} />
        <Table.Column dataIndex={["my_company", "name"]} title={t("invoices.fields.emitter")} />
        <Table.Column dataIndex={["client", "name"]} title={t("invoices.fields.client")} />
        <Table.Column
          dataIndex="date"
          title={t("invoices.fields.date")}
          render={(value) => value ? <DateField value={value} format="DD.MM.YYYY" /> : "-"}
        />
        <Table.Column dataIndex="total_amount" title={t("invoices.labels.total")} />
        <Table.Column dataIndex="status" title={t("invoices.fields.status")} />
        <Table.Column dataIndex="type" title={t("invoices.fields.type")} />
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
