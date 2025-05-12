function isEmptyValue(value: any) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
}

function isObjectAllFieldsEmpty(obj: Record<string, any>) {
  return Object.values(obj).every(isEmptyValue);
}

function isAddressEmptyExceptCountryIndia(address: any) {
  if (address.country !== "India") return false;

  // Exclude both `country` and `addressType`
  const { country, addressType, ...rest } = address;
  return Object.values(rest).every(isEmptyValue);
}

export function transformLeadMergeFormDataToPayload(
  data: any,
  selectedLeads: any
) {
  const leadcaptureIdsToDelete = selectedLeads.filter(
    (item: number) => item !== data.leadCaptureId
  );
  const leadEnquiryDTO = {
    coreStateId: data.coreStateId || 36,
    coreCityId: data.coreCityId || 4143,
    academicCareerId: data.academicCareerId,
    academicProgramId: data.academicProgramId,
    leadSourceId: data.leadSourceId,
  };

  const leadAdditionalDetailsDTO = {
    categoryId: parseInt(data.categoryName) || null,
    admitTypeId: parseInt(data.admitTypeName) || null,
    fatherName: data.fatherName || "",
    motherName: data.motherName || "",
    dob: data.dob || "",
  };

  const leadAddressDetailsDTO = (data.address || [])
    .map((addr: any) => ({
      addressType: addr.addressType,
      country: addr.country,
      coreStateId: addr.coreStateId ? parseInt(addr.coreStateId) : null,
      coreCityId: addr.coreCityId ? parseInt(addr.coreCityId) : null,
      addressLine1: addr.addressLine1 || "",
      addressLine2: addr.addressLine2 || "",
      pin: addr.pin || "",
    }))
    .filter((addr: any) => !isAddressEmptyExceptCountryIndia(addr));

  const leadContactPhoneDTO = (data.contact || [])
    .map((c: any) => ({
      contactName: c.contactName,
      contactRelation: c.contactRelation,
      contactNumber: c.contactNumber,
      primary: c.primary,
    }))
    .filter((contact: any) => !isObjectAllFieldsEmpty(contact));

  const transformedPayload: any = {
    leadCaptureMergeRequestDTO: {
      leadCaptureId: data.leadCaptureId,
      name: data.name,
      phone: data.contact?.[0]?.contactNumber || "",
      email: data.email,
    },
    leadCaptureIdsForDelete: leadcaptureIdsToDelete,
  };

  if (!isObjectAllFieldsEmpty(leadEnquiryDTO)) {
    transformedPayload.leadCaptureMergeRequestDTO.leadEnquiryDTO =
      leadEnquiryDTO;
  }

  if (!isObjectAllFieldsEmpty(leadAdditionalDetailsDTO)) {
    transformedPayload.leadAdditionalDetailsDTO = leadAdditionalDetailsDTO;
  }

  if (leadAddressDetailsDTO.length > 0) {
    transformedPayload.leadAddressDetailsDTO = leadAddressDetailsDTO;
  }

  if (leadContactPhoneDTO.length > 0) {
    transformedPayload.leadContactPhoneDTO = leadContactPhoneDTO;
  }

  return transformedPayload;
}
