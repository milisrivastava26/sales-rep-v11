export const mergedLeadDetailsData = (responseOfLeadEnquiryDetailsById: any, responseOfLeadAddressById: any, responseofLeadAdditionalInfo: any, responseOfLeadAcademicDetailsById:any, srmusetOptionDetails: any) => {

   const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const generalInfo = activeEnquiry[0];
  const addressDetails = responseOfLeadAddressById;
  const bioInfo = responseofLeadAdditionalInfo;
  const acadDetails = responseOfLeadAcademicDetailsById;
  const srmusetInfo = srmusetOptionDetails
  return [generalInfo, addressDetails, bioInfo, acadDetails, srmusetInfo];
};
 
 