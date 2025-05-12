export const mergedLeadDetailsData = (responseOfLeadEnquiryDetailsById: any, responseOfLeadAddressById: any, responseofLeadAdditionalInfo: any, responseOfLeadAcademicDetailsById:any) => {
  const generalInfo = responseOfLeadEnquiryDetailsById[0];
  const addressDetails = responseOfLeadAddressById;
  const bioInfo = responseofLeadAdditionalInfo;
  const acadDetails = responseOfLeadAcademicDetailsById;
  return [generalInfo, addressDetails, bioInfo, acadDetails];
};
 
 