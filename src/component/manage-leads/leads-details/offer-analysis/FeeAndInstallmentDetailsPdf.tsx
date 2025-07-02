import React from 'react';
import { formatDate } from '../../../../util/helper';

interface propsType {
  feeData: any;
  installmentData: any;
}

const FeeAndInstallmentDetailsPdf: React.FC<propsType> = ({ installmentData, feeData }) => {
  const gray = '#cbd5e0'; // Tailwind gray-400 hex

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '6px', marginTop: '1.5rem' }}>
      <div style={{ width: '100%', marginTop: '0.5rem' }}>
        <div style={{ width: '100%' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#3b82f6',
              marginBottom: '8px',
            }}
          >
            Fee Details
          </h2>

          <div style={{ marginTop: '8px' }}>
            <table
              style={{
                width: '100%',
                fontSize: '0.875rem',
                backgroundColor: '#FFFFFF',
                border: `1px solid ${gray}`,
                borderRadius: '8px',
                borderCollapse: 'collapse',
              }}
            >
              <tbody>
                {Object.entries(feeData).map(([key, value]: any, index) => (
                  <tr key={index} style={{ borderBottom: `1px solid ${gray}` }}>
                    <td
                      style={{
                        padding: '12px',
                        fontWeight: 600,
                        color: '#000',
                        backgroundColor: '#f0f0f0',
                        width: '50%',
                        textTransform: 'capitalize',
                        borderRight: `1px solid ${gray}`,
                      }}
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        color: '#000',
                        width: '50%',
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {installmentData?.length === 0 && (
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            No Installment Details Found!
          </p>
        )}

        {installmentData && installmentData.length > 0 && (
          <div style={{ width: '100%', marginTop: '1.25rem' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#3b82f6',
                marginBottom: '8px',
              }}
            >
              Installment Details
            </h2>
            <div style={{ height: 'calc(100% - 40px)' }}>
              <div style={{ width: '100%', padding: '6px' }}>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <thead>
                      <tr>
                        {[
                          'Installment Number',
                          'Due Date',
                          'Amount(Rs)',
                          'Balance(Rs)',
                          'Status',
                        ].map((header, idx) => (
                          <th
                            key={idx}
                            style={{
                              border: `1px solid ${gray}`,
                              padding: '8px',
                              backgroundColor: '#f0f0f0',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {installmentData.map((installment: any, index: number) => {
                        const {
                          installmentAmount,
                          dueDate,
                          installmentSeq,
                          status,
                          balance,
                        } = installment;

                        return (
                          <tr key={index}>
                            {[installmentSeq, formatDate(dueDate), installmentAmount, balance, status].map(
                              (cell, i) => (
                                <td
                                  key={i}
                                  style={{
                                    border: `1px solid ${gray}`,
                                    padding: '8px',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {cell}
                                </td>
                              )
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeAndInstallmentDetailsPdf;
