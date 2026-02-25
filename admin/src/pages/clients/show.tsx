import React from "react";
import { Show } from "@refinedev/antd";
import { Card, Table, Descriptions } from "antd";
import { useShow } from "@refinedev/core";
import { useTranslation } from "react-i18next";

export const ClientShow: React.FC = () => {
  const { t } = useTranslation();
  const { queryResult } = useShow({
    meta: {
      populate: ["bankAccounts", "contacts"],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card title={t("clients.fields.basic_info")} style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label={t("clients.fields.name")}>{record?.name}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.idno")}>{record?.idno}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.vat_code")}>{record?.vat_code}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.director_name")}>{record?.director_name}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.country")}>{record?.country ? t(`common.countries.${record.country}`) : "-"}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.legal_address")} span={2}>{record?.legal_address}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.physical_address")} span={2}>{record?.physical_address}</Descriptions.Item>
          <Descriptions.Item label={t("clients.fields.notes")} span={2}>{record?.notes}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title={t("clients.fields.bank_accounts")} style={{ marginBottom: 16 }}>
        <Table dataSource={record?.bank_accounts || []} pagination={false} rowKey="id" size="small">
          <Table.Column dataIndex="bank_name" title={t("common.fields.bank_name")} />
          <Table.Column dataIndex="iban" title={t("common.fields.iban")} />
          <Table.Column dataIndex="swift_bic" title={t("common.fields.swift_bic")} />
          <Table.Column dataIndex="bank_code" title={t("common.fields.bank_code")} />
        </Table>
      </Card>

      <Card title={t("clients.fields.contacts")}>
        <Table dataSource={record?.contacts || []} pagination={false} rowKey="id" size="small">
          <Table.Column dataIndex="position" title={t("common.fields.position")} />
          <Table.Column title={t("common.fields.full_name")} render={(_, item: any) => `${item.first_name} ${item.last_name}`} />
          <Table.Column dataIndex="phone" title={t("common.fields.phone")} />
          <Table.Column dataIndex="email" title={t("common.fields.email")} />
        </Table>
      </Card>
    </Show>
  );
};
