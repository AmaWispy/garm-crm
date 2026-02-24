import React from "react";
import {
  List,
  useTable,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const ActList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const downloadPdf = (id: string) => {
    window.open(`${API_URL}/acts/${id}/pdf`, "_blank");
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="number" title="Number" />
        <Table.Column dataIndex={["client", "name"]} title="Client" />
        <Table.Column
          dataIndex="date"
          title="Date"
          render={(value) => <DateField value={value} format="DD.MM.YYYY" />}
        />
        <Table.Column dataIndex="amount" title="Amount" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <Button
                icon={<FilePdfOutlined />}
                size="small"
                onClick={() => downloadPdf(record.id)}
              />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
