import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

export const InvoiceList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const showPdf = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/invoices/${id}/pdf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("View failed:", error);
    }
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="number" title="Number" />
        <Table.Column dataIndex={["my_company", "name"]} title="From" />
        <Table.Column dataIndex={["client", "name"]} title="To" />
        <Table.Column
          dataIndex="date"
          title="Date"
          render={(value) => value ? <DateField value={value} format="DD.MM.YYYY" /> : "-"}
        />
        <Table.Column dataIndex="total_amount" title="Total" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="type" title="Type" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <Button
                icon={<FilePdfOutlined />}
                size="small"
                onClick={() => showPdf(record.id)}
              />
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
