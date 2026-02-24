import React from "react";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Card, Table, Tag, Space, Button, Divider } from "antd";
import { useShow } from "@refinedev/core";
import { PrinterOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const InvoiceShow: React.FC = () => {
  const { queryResult } = useShow({
    meta: {
      populate: ["client", "myCompany", "items"],
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
                      <div className="invoice-header-title">INVOICE</div>
                    </td>
                    <td>
                      <div className="invoice-label">Счет № {record?.number}</div>
                      <Text type="secondary">
                        <DateField value={record?.date} format="DD.MM.YYYY" />
                      </Text>
                      <br />
                      {record?.due_date && (
                        <>
                          <Text type="secondary" italic>Оплатить до: </Text>
                          <DateField value={record?.due_date} format="DD.MM.YYYY" />
                        </>
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
                      <div className="invoice-label">ОТПРАВИТЕЛЬ:</div>
                      <strong>{record?.my_company?.name}</strong><br />
                      IDNO: {record?.my_company?.idno}<br />
                      {record?.my_company?.legal_address}
                    </td>
                    <td>
                      <div className="invoice-label">ПОЛУЧАТЕЛЬ:</div>
                      <strong>{record?.client?.name}</strong><br />
                      IDNO: {record?.client?.idno}<br />
                      {record?.client?.legal_address}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>Описание</td>
              <td>Сумма</td>
            </tr>

            {record?.items?.map((item: any, index: number) => (
              <tr className="item" key={item.id || index}>
                <td>
                  {item.description}
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {item.quantity} {item.unit} x {item.price} {record?.currency}
                  </Text>
                </td>
                <td>{item.quantity * item.price} {record?.currency}</td>
              </tr>
            ))}

            <tr className="total">
              <td></td>
              <td>
                Итого: {record?.total_amount} {record?.currency}
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                  <Text type="secondary">Оплачено: </Text>
                  {record?.paid_amount} {record?.currency}
                  <br />
                  <Text type={record?.total_amount - record?.paid_amount > 0 ? 'danger' : 'success'}>
                    Остаток: {record?.total_amount - record?.paid_amount} {record?.currency}
                  </Text>
                </div>
              </td>
            </tr>
          </table>

          {record?.notes && (
            <div style={{ marginTop: '40px' }}>
              <div className="invoice-label">Примечание:</div>
              <div style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px' }}>
                {record.notes}
              </div>
            </div>
          )}

          <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              Подпись (Отправитель)
            </div>
            <div style={{ borderTop: '1px solid #333', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              Подпись (Получатель)
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
