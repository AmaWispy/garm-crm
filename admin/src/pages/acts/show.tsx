import React from "react";
import { Show, DateField, NumberField, TextField } from "@refinedev/antd";
import { Typography, Card, Descriptions, Button } from "antd";
import { useShow } from "@refinedev/core";
import { FilePdfOutlined } from "@ant-design/icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

export const ActShow: React.FC = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["client", "invoice"],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const downloadPdf = async () => {
    if (record?.id) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/acts/${record.id}/pdf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `act-${record.number}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  return (
    <Show 
      isLoading={isLoading}
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button 
            icon={<FilePdfOutlined />} 
            onClick={downloadPdf}
            type="primary"
          >
            Download PDF
          </Button>
        </>
      )}
    >
      <Card title="Информация об акте" style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Номер">{record?.number}</Descriptions.Item>
          <Descriptions.Item label="Дата">
            {record?.date ? <DateField value={record?.date} format="DD.MM.YYYY" /> : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Клиент">{record?.client?.name}</Descriptions.Item>
          <Descriptions.Item label="Связанный инвойс">{record?.invoice?.number || "-"}</Descriptions.Item>
          <Descriptions.Item label="Сумма" span={2}>
            <NumberField value={record?.amount} />
          </Descriptions.Item>
          <Descriptions.Item label="Детали" span={2}>
            <TextField value={record?.details} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Show>
  );
};
