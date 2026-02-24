import React from "react";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Space, Button, Divider } from "antd";
import { useShow } from "@refinedev/core";
import { PrinterOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const ActShow: React.FC = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["client", "invoice"],
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
            Печать
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
                      <div className="invoice-label">Акт выполненных работ № {record?.number}</div>
                      <Text type="secondary">
                        <DateField value={record?.date} format="DD.MM.YYYY" />
                      </Text>
                      {record?.invoice && (
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary">К счету № {record.invoice.number}</Text>
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
                      <div className="invoice-label">ИСПОЛНИТЕЛЬ:</div>
                      <strong>GARM CRM</strong><br />
                      {/* Here we could pull sender info if we had it in the Act model */}
                    </td>
                    <td>
                      <div className="invoice-label">ЗАКАЗЧИК:</div>
                      <strong>{record?.client?.name}</strong><br />
                      IDNO: {record?.client?.idno}<br />
                      {record?.client?.legal_address}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>Описание работ</td>
              <td>Сумма</td>
            </tr>

            <tr className="item last">
              <td>
                {record?.details || "Выполнение работ согласно договору"}
              </td>
              <td>{record?.amount} MDL</td>
            </tr>

            <tr className="total">
              <td></td>
              <td>
                Итого к оплате: {record?.amount} MDL
              </td>
            </tr>
          </table>

          <div style={{ marginTop: '40px', fontSize: '12px', color: '#777' }}>
            <p>Вышеуказанные услуги были оказаны в полном объеме и в срок. Заказчик претензий по объему, качеству и срокам оказания услуг не имеет.</p>
          </div>

          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              Исполнитель
            </div>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              Заказчик
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
