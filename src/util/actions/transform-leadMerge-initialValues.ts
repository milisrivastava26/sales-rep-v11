function extractAfterUnderscore(str: string) {
  const parts = str.split("_");
  return parts.slice(1).join("_");
}

export const getInitialValues = (selectedOptions: any) => {
  const initialValues: any = {
    leadCaptureId: "",
    name: "",
    email: "",
    categoryName: "",
    admitTypeName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    academicProgramId: "",
    academicCareerId: "",
    leadSourceId: "",
    coreStateId: "",
    coreCityId: "",
    contact: [],
    address: [],
  };

  Object.entries(selectedOptions).forEach(([key, data]: any) => {
    const fieldKey = extractAfterUnderscore(key);

    if (fieldKey.startsWith("contact")) {
      const isFirst = initialValues.contact.length === 0;
      const newContact = {
        ...data.value,
        primary: isFirst,
      };

      initialValues.contact.push(newContact);
    } else if (fieldKey.startsWith("address")) {
      const addressType = fieldKey.split("_")[1]; // e.g., PERMANENT or CORRESPONDENCE
      const index = initialValues.address.findIndex(
        (a: any) => a.addressType === addressType
      );
      if (index !== -1) {
        initialValues.address[index] = {
          addressType,
          country: "India",
          ...data.value,
        };
      } else {
        initialValues.address.push({
          addressType,
          country: "India",
          ...data.value,
        });
      }
    } else if (fieldKey === "active_enquiry") {
      const enquiry = data.value;
      initialValues.academicProgramId = enquiry.academicProgramId ?? "";
      initialValues.academicCareerId = enquiry.academicCareerId ?? "";
      initialValues.leadSourceId = enquiry.leadSourceId ?? "";
      initialValues.coreStateId = enquiry.coreStateId ?? "";
      initialValues.coreCityId = enquiry.coreCityId ?? "";
    } else {
      initialValues[fieldKey] = data.value ?? "";
    }
  });

  // Ensure at least one contact
  if (initialValues.contact.length === 0) {
    initialValues.contact.push({
      contactName: "",
      contactRelation: "self",
      contactNumber: "",
      primary: true,
    });
  }

  // Ensure PERMANENT and CORRESPONDENCE addresses
  ["PERMANENT", "CORRESPONDENCE"].forEach((type) => {
    if (!initialValues.address.find((a: any) => a.addressType === type)) {
      initialValues.address.push({
        addressType: type,
        country: "India",
        coreStateId: "",
        coreCityId: "",
        addressLine1: "",
        addressLine2: "",
        pin: "",
        stateName: "",
        cityName: "",
      });
    }
  });

  return initialValues;
};

export const mergeAddresses = (current: any[], updated: any[]) => {
  const types = ["PERMANENT", "CORRESPONDENCE"];
  return types.map((type) => {
    return (
      updated.find((a) => a.addressType === type) ||
      current.find((a) => a.addressType === type) || {
        addressType: type,
        country: "India",
        coreStateId: "",
        coreCityId: "",
        addressLine1: "",
        addressLine2: "",
        pin: "",
        stateName: "",
        cityName: "",
      }
    );
  });
};

export const mergeContacts = (current: any[], updated: any[]) => {
  if (!updated || updated.length === 0) return current;
  const newContact = updated[0];
  const exists = current.some(
    (c) => c.contactNumber === newContact.contactNumber
  );
  return exists ? current : [...current, newContact];
};

export const initialValuesForMergeLead = {
  leadCaptureId: "",
  name: "",
  email: "",
  categoryName: "",
  admitTypeName: "",
  fatherName: "",
  motherName: "",
  dob: "",
  academicProgramId: "",
  academicCareerId: "",
  leadSourceId: "",
  coreStateId: "",
  coreCityId: "",
  contact: [
    {
      contactName: "",
      contactRelation: "self",
      contactNumber: "",
      primary: false,
    },
  ],
  address: [
    {
      addressType: "PERMANENT",
      country: "India",
      coreStateId: "",
      coreCityId: "",
      addressLine1: "",
      addressLine2: "",
      pin: "",
      stateName: "",
      cityName: "",
    },
    {
      addressType: "CORRESPONDENCE",
      country: "India",
      coreStateId: "",
      coreCityId: "",
      addressLine1: "",
      addressLine2: "",
      pin: "",
      stateName: "",
      cityName: "",
    },
  ],
};

export function deepMerge(current: any, merged: any): any {
  if (Array.isArray(current) && Array.isArray(merged)) {
    return current.map((item, index) => {
      const mergedItem = merged[index];
      return mergedItem !== undefined ? deepMerge(item, mergedItem) : item;
    });
  }

  if (
    typeof current === "object" &&
    current !== null &&
    typeof merged === "object" &&
    merged !== null
  ) {
    const result: any = { ...current };
    for (const key of new Set([
      ...Object.keys(current),
      ...Object.keys(merged),
    ])) {
      if (merged[key] !== undefined && merged[key] !== null) {
        result[key] = deepMerge(current[key], merged[key]);
      }
    }
    return result;
  }

  // Fallback: use merged if defined, else current
  return merged !== undefined && merged !== null ? merged : current;
}

export const getCombinedValues = (updatedValues: any, mergedValues: any) => {
  console.log("updatedValues", updatedValues)
  console.log("mergedValues.name", mergedValues.name === "")
  console.log("updatedValues.name", updatedValues.name)
  const values = {
    leadCaptureId:
      mergedValues.leadCaptureId !== ""
        ? mergedValues.leadCaptureId
        : updatedValues.leadCaptureId,
    name: mergedValues.name !== "" ? mergedValues.name : updatedValues.name,
    email: mergedValues.email !== "" ? mergedValues.email : updatedValues.email,
    categoryName:
      mergedValues.categoryName !== ""
        ? mergedValues.categoryName
        : updatedValues.categoryName,
    admitTypeName:
      mergedValues.admitTypeName !== ""
        ? mergedValues.admitTypeName
        : updatedValues.admitTypeName,
    fatherName:
      mergedValues.fatherName !== ""
        ? mergedValues.fatherName
        : updatedValues.fatherName,
    motherName:
      mergedValues.motherName !== ""
        ? mergedValues.motherName
        : updatedValues.motherName,
    dob: mergedValues.dob !== "" ? mergedValues.dob : updatedValues.dob,
    academicProgramId:
      mergedValues.academicProgramId !== ""
        ? mergedValues.academicProgramId
        : updatedValues.academicProgramId,
    academicCareerId:
      mergedValues.academicCareerId !== ""
        ? mergedValues.academicCareerId
        : updatedValues.academicCareerId,
    leadSourceId:
      mergedValues.leadSourceId !== ""
        ? mergedValues.leadSourceId
        : updatedValues.leadSourceId,
    coreStateId:
      mergedValues.coreStateId !== ""
        ? mergedValues.coreStateId
        : updatedValues.coreStateId,
    coreCityId:
      mergedValues.coreCityId !== ""
        ? mergedValues.coreCityId
        : updatedValues.coreCityId,

    // For contact and address arrays, prioritize merged if present, otherwise fallback
    contact:
      Array.isArray(mergedValues.contact) && mergedValues.contact.length > 0
        ? mergedValues.contact
        : updatedValues.contact,

    address:
      Array.isArray(mergedValues.address) && mergedValues.address.length > 0
        ? mergedValues.address
        : updatedValues.address,
  };

  return values;
};
