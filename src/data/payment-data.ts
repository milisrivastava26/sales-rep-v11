// Types
interface LeadAddress {
  addressLine1: string;
  addressLine2: string;
  cityName: string;
  stateName: string;
  pin: string | number;
}

interface ReceiptData {
  createdAt: string;
  createdTime: string;
  receiptNumber: string | number;
  name: string;
  leadCaptureId: string | number;
  address: string;
  city: string;
  state: string;
  pincode: string | number;
  paymentAmount: number;
  corePaymentTypeName: string;
  orderId: string | number;
  platform: string;
}

// Function
export const getReceiptData = (
  responseOfLeadAddressById: LeadAddress[],
  id: string | any,
  paymentAmount: number | any,
  paymentDate: string | any,
  paymentInitiateTime: any,
  name: string | any,
  leadCaptureId: string | number | any,
  mode: string | any,
  receiptNumber: string | number | any
): ReceiptData => {
  const permanentAddress = responseOfLeadAddressById[0];

  const receiptData: ReceiptData = {
    createdAt: paymentDate,
    createdTime: paymentInitiateTime,
    receiptNumber: receiptNumber,
    name,
    leadCaptureId,
    address: `${permanentAddress?.addressLine1 || ""}, ${
      permanentAddress?.addressLine2 || ""
    }`,
    city: permanentAddress?.cityName || "",
    state: permanentAddress?.stateName || "",
    pincode: permanentAddress?.pin || "",
    paymentAmount,
    corePaymentTypeName: mode,
    orderId: id,
    platform: mode === "ch" ? "Cash" : "Payment Gateway",
  };

  return receiptData;
};
