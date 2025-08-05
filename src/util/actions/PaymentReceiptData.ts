export function mergePaymentAndLeadData(obj1: any, obj2: any) {
    return {
        Name: obj2.leadName, 
        Email: obj2.email,   
        Career: obj2.careerName,
        Program: obj2.programName,
       "Receipt Number": obj1.receiptNumber, 
        "Payment Id": obj1.razorpayOrderId ,
        "Payment Amount": obj1.paymentAmount,  
    };
}