import React from "react";
import { Show } from "@refinedev/antd";
import { Typography, Card, Table, Descriptions } from "antd";
import { useShow } from "@refinedev/core";

export const MyCompanyShow: React.FC = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card title="Основная информация" style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Наименование">{record?.name}</Descriptions.Item>
          <Descriptions.Item label="IDNO">{record?.idno}</Descriptions.Item>
          <Descriptions.Item label="НДС">{record?.vat_code}</Descriptions.Item>
          <Descriptions.Item label="Администратор">{record?.director_name}</Descriptions.Item>
          <Descriptions.Item label="Страна">{record?.country === 'Moldova' ? 'Молдова' : 'Другая'}</Descriptions.Item>
          <Descriptions.Item label="Юридический адрес" span={2}>{record?.legal_address}</Descriptions.Item>
          <Descriptions.Item label="Физический адрес" span={2}>{record?.physical_address}</Descriptions.Item>
          <Descriptions.Item label="Заметки" span={2}>{record?.notes}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Банковские счета" style={{ marginBottom: 16 }}>
        <Table
          dataSource={record?.bank_accounts || []}
          pagination={false}
          rowKey="id"
          size="small"
        >
          <Table.Column dataIndex="bank_name" title="Банк" />
          <Table.Column dataIndex="iban" title="IBAN" />
          <Table.Column dataIndex="swift_bic" title="SWIFT/BIC" />
          <Table.Column dataIndex="bank_code" title="Код Банка" />
        </Table>
      </Card>

      <Card title="Контактные лица">
        <Table
          dataSource={record?.contacts || []}
          pagination={false}
          rowKey="id"
          size="small"
        >
          <Table.Column dataIndex="position" title="Должность" />
          <Table.Column
            title="ФИО"
            render={(_, item: any) => `${item.first_name} ${item.last_name}`}
          />
          <Table.Column dataIndex="phone" title="Телефон" />
          <Table.Column dataIndex="email" title="Email" />
        </Table>
      </Card>
    </Show>
  );
};
