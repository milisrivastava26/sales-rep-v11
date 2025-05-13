export const mergedLeadDetailsData = (responseOfLeadEnquiryDetailsById: any, responseOfLeadAddressById: any, responseofLeadAdditionalInfo: any, responseOfLeadAcademicDetailsById:any, srmusetOptionDetails: any) => {
  const generalInfo = responseOfLeadEnquiryDetailsById[0];
  const addressDetails = responseOfLeadAddressById;
  const bioInfo = responseofLeadAdditionalInfo;
  const acadDetails = responseOfLeadAcademicDetailsById;
  const srmusetInfo = srmusetOptionDetails
  return [generalInfo, addressDetails, bioInfo, acadDetails, srmusetInfo];
};
 
 