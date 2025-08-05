export interface LeadCashPayment {
    leadPaymentsId: number;
    name: string;
    email: string;
    receiptNumber: string;
    paymentAmount: number;
    orderStatus: string;
    razorpayOrderId: string;
    leadCaptureId: number;
    corePaymentTypesId: number;
    orderId: string | null;
    corePaymentTypeName: string | null;
    enquiryId: number;
    type: string;
    mode: string;
    adjustedBy: number;
    isConsolidated: boolean | null;
  }
  