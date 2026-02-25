import React from "react";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Space, Button } from "antd";
import { useShow } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { PrinterOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const ActShow: React.FC = () => {
  const { t } = useTranslation();
  const { queryResult } = useShow({
    meta: {
      populate: ["client", "invoice", "myCompany"],
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Show isLoading={true} />;

  return (
    <Show 
      isLoading={isLoading}
      title={false}
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button 
            icon={<PrinterOutlined />} 
            onClick={handlePrint}
            type="primary"
          >
            {t("common.buttons.print")}
          </Button>
        </>
      )}
    >
      <div className="printable-content">
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tr className="top">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td className="title">
                      <div className="invoice-header-title">ACT</div>
                    </td>
                    <td>
                      <div className="invoice-label">{t("acts.labels.act_number")} {record?.number}</div>
                      <Text type="secondary">
                        <DateField value={record?.date} format="DD.MM.YYYY" />
                      </Text>
                      {record?.invoice && (
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary">{t("acts.labels.to_invoice")} {record.invoice.number}</Text>
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td>
                      <div className="invoice-label">{t("acts.labels.executor")}:</div>
                      <strong>{record?.my_company?.name || "GARM CRM"}</strong><br />
                      {record?.my_company && (
                        <>
                          IDNO: {record.my_company.idno}<br />
                          {record.my_company.legal_address}
                        </>
                      )}
                    </td>
                    <td>
                      <div className="invoice-label">{t("acts.labels.customer")}:</div>
                      <strong>{record?.client?.name}</strong><br />
                      IDNO: {record?.client?.idno}<br />
                      {record?.client?.legal_address}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>{t("acts.labels.description_works")}</td>
              <td>{t("acts.labels.amount")}</td>
            </tr>

            <tr className="item last">
              <td>
                {record?.details || t("acts.labels.statement_placeholder")}
              </td>
              <td>{record?.amount} MDL</td>
            </tr>

            <tr className="total">
              <td></td>
              <td>
                {t("acts.labels.total_to_pay")}: {record?.amount} MDL
              </td>
            </tr>
          </table>

          <div style={{ marginTop: '40px', fontSize: '12px', color: '#777' }}>
            <p>{t("acts.labels.statement")}</p>
          </div>

          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              {t("acts.labels.executor_sign")}
            </div>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              {t("acts.labels.customer_sign")}
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
