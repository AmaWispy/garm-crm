import React from "react";
import { Show, DateField, NumberField, TextField } from "@refinedev/antd";
import { Typography, Card, Table, Descriptions, Tag, Space, Button } from "antd";
import { useShow } from "@refinedev/core";
import { FilePdfOutlined } from "@ant-design/icons";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

export const InvoiceShow: React.FC = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["client", "myCompany", "items"],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const downloadPdf = async () => {
    if (record?.id) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/invoices/${record.id}/pdf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${record.number}.pdf`;
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
      <Card title="Общая информация" style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Номер">{record?.number}</Descriptions.Item>
          <Descriptions.Item label="Дата">
            {record?.date ? <DateField value={record?.date} format="DD.MM.YYYY" /> : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Срок оплаты">
            {record?.due_date ? <DateField value={record?.due_date} format="DD.MM.YYYY" /> : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Тип">
            <Tag color={record?.type === 'monthly' ? 'blue' : 'green'}>
              {record?.type}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={record?.status === 'paid' ? 'green' : record?.status === 'partially' ? 'orange' : 'red'}>
              {record?.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Валюта">{record?.currency}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Space direction="horizontal" style={{ width: '100%', marginBottom: 16 }} size="large">
        <Card title="Отправитель (Моя компания)" style={{ flex: 1 }}>
          <Descriptions column={1}>
            <Descriptions.Item label="Название">{record?.my_company?.name}</Descriptions.Item>
            <Descriptions.Item label="IDNO">{record?.my_company?.idno}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Получатель (Клиент)" style={{ flex: 1 }}>
          <Descriptions column={1}>
            <Descriptions.Item label="Название">{record?.client?.name}</Descriptions.Item>
            <Descriptions.Item label="IDNO">{record?.client?.idno}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>

      <Card title="Позиции в счете">
        <Table
          dataSource={record?.items || []}
          pagination={false}
          rowKey="id"
        >
          <Table.Column dataIndex="description" title="Описание" />
          <Table.Column dataIndex="quantity" title="Кол-во" render={(v) => <NumberField value={v} />} />
          <Table.Column dataIndex="unit" title="Ед. изм." />
          <Table.Column dataIndex="price" title="Цена" render={(v) => <NumberField value={v} />} />
          <Table.Column dataIndex="total" title="Итого" render={(v) => <NumberField value={v} />} />
        </Table>
        
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Title level={4}>Итоговая сумма: {record?.total_amount} {record?.currency}</Title>
          <Title level={5} type="secondary">Оплачено: {record?.paid_amount} {record?.currency}</Title>
          <Title level={4} type={record?.total_amount - record?.paid_amount > 0 ? 'danger' : 'success'}>
            Остаток: {record?.total_amount - record?.paid_amount} {record?.currency}
          </Title>
        </div>
      </Card>

      {record?.notes && (
        <Card title="Заметки" style={{ marginTop: 16 }}>
          <TextField value={record?.notes} />
        </Card>
      )}
    </Show>
  );
};
