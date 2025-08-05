export const mergedLeadDetailsData = (
  responseOfLeadEnquiryDetailsById: any,
  responseOfLeadAddressById: any,
  responseofLeadAdditionalInfo: any,
  responseOfLeadAcademicDetailsById: any,
  srmusetOptionDetails: any,
  getPsEmplIdResponse: any,
  responseOfLeadContactDetailsById: any
) => {
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];

  const fatherContactObj = responseOfLeadContactDetailsById.find(
    (item: any) =>
      item?.contactRelation?.toLowerCase() === "father" &&
      item?.contactName?.trim()
  );

  const fatherContact = fatherContactObj?.contactNumber ?? "";

  const motherContactObj = responseOfLeadContactDetailsById.find(
    (item: any) =>
      item?.contactRelation?.toLowerCase() === "mother" &&
      item?.contactName?.trim()
  );

  const motherContact = motherContactObj?.contactNumber ?? "";

  const generalInfo = activeEnquiry[0];
  const addressDetails = responseOfLeadAddressById;
  const bioInfo = responseofLeadAdditionalInfo;
  const acadDetails = responseOfLeadAcademicDetailsById;
  const srmusetInfo = srmusetOptionDetails;
  const erpId = getPsEmplIdResponse;
  return [
    generalInfo,
    addressDetails,
    bioInfo,
    acadDetails,
    srmusetInfo,
    erpId,
    fatherContact,
    motherContact,
  ];
};
