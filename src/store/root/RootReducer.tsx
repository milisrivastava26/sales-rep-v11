import uiSliceReducer from "../ui/ui-slice";
import authReducer from "../auth/auth-Slice";
import callRequestReducer from "../lead-contact-phone/make-call-slice";
import paginationReducer from "../ui/pagination-slice";
import { tableReducer } from "../ui/table-slice";

import leadsFilterReducer from "../lead-capturing/filter-data-slice";
import { loggedInUserReducer } from "../auth/loggedIn-user-slice";
import leadStagesReducer from "../lead-capturing/get-allLeadStage-slice";
import leadSourceReducer from "../lead-capturing/get-allLeadSource-slice";
import { AddLeadCaptureReducer } from "../lead-capturing/create-lead-capture-slice";
import { getLeadCaptureByIdReducer } from "../lead-capturing/get-lead-capture-byId-slice";

import { createLeadApplicationStatusReducer } from "../lead-applicationStatus/create-leadApplicationStatus-slice";
import { getLeadApplicationStatusByIdReducer } from "../lead-applicationStatus/get-leadApplicationStatusById-slice";

import { getLeadAcadDetailsUGByIdReducer } from "../lead-academicDetailsForUG/get-acadDetailsUGById-slice";
import { createLeadAcadDetailsUGReducer } from "../lead-academicDetailsForUG/create-acadDetailsUG-slice";
import { addLeadContactPhoneReducer } from "../lead-contact-phone/create-lead-contact-slice";
import { leadContactPhoneByIdReducer } from "../lead-contact-phone/get-lead-contact-by-id-slice";
import { addLeadAcademicDetailsForTenthReducer } from "../lead-academic-details-for-tenth/create-lead-academic-details-for-tenth-slice";
import { leadAcademicDetailsForTenthByIdReducer } from "../lead-academic-details-for-tenth/get-all-lead-academic-details-for-tenth-by-id-slice";
import { createLeadAcadDetailsTwelfthReducer } from "../lead-academicDetailsForTwelfth/create-leadAcadDetailsTwelfth-slice";
import { getLeadAcadDetailsTwelfthByIdReducer } from "../lead-academicDetailsForTwelfth/get-leadAcadDetailsTwelfthById-slice";
import { AddLeadAddressDetailReducer } from "../lead-address-detail/create-lead-address-detail-slice";
import { getLeadAddressDetailByIdReducer } from "../lead-address-detail/get-lead-address-detail-byId-slice";
import { getAllAcademicCareerReducer } from "../get/get-all-academic-career-slice";
import { getAcDataByCareerIdReducer } from "../get/get-all-academic-program-by-academic-career-id-slice";
import { getAllAcademicProgramReducer } from "../get/get-all-academic-program-slice";
import { getAllAdmitTypeReducer } from "../get/get-all-admit-type-slice";
import { getAllCategoryReducer } from "../get/get-all-category-slice";
import { getAllCityReducer } from "../get/get-all-city-slice";
import { getAllStateReducer } from "../get/get-all-state-slice";
import { getAllTwelfthBoardReducer } from "../get/get-all-twelfth-board-slice";
import { getAllCityByStateIdReducer } from "../get/get-allCity-byStateId-slice";
import { getAllTenthBoardReducer } from "../get/get-all10th-slice";
import { getAllTenthMarkingSchemeReducer } from "../get/get-all10thScheme-slice";
import { getAllLeadSourceReducer } from "../get/get-all-leadSource-slice";
import { getAllTwelfthMarkingSchemeReducer } from "../get/get-all-twelfthMarkingScheme-slice";
import { getAllTwelfthResultStatusReducer } from "../get/get-all-twelfthResultStatus-slice";
import { getAllUgResultStatusReducer } from "../get/get-all-ugResultStatus-slice";
import { getAcademicCareerByIdReducer } from "../get/get-academic-career-by-id-slice";
import { getAcademicProgramByIdReducer } from "../get/get-academicProgram-byId-slice";
import { getAdmitTypeServiceDataByIdReducer } from "../get/get-admitTypeService-byId-slice";
import { getCityByIdReducer } from "../get/get-all-city-by-id-slice";
import { getTenthBoardByIdReducer } from "../get/get-all-tenth-board-by-id-slice";
import { getTenthMarkingSchemeByIdReducer } from "../get/get-all-tenth-marking-scheme-by-Id-slice";
import { getTwelfthBoardByIdReducer } from "../get/get-all-twelfth-board-by-id-slice";
import { getUgResultStatusByIdReducer } from "../get/get-all-Ug-result-status-by-id-slice";
import { getCategoryByIdReducer } from "../get/get-category-by-id-slice";
import { getCoreStateByStateIdReducer } from "../get/get-state-byStateId-slice";
import { getTwelfthMarkingSchemeByIdReducer } from "../get/get-twelfthMarkingScheme-by-id-slice";
import { getTwelveResultByIdReducer } from "../get/get-twelveResult-by-id-slice";
import { getAllLeadOwnerReducer } from "../sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import { AddLeadAdditionalDetailsReducer } from "../lead-capturing/create-lead-with-additional-details-slice";
import { getleadDetailsByIdReducer } from "../view-leads-details/get-leadDetails-byId-slice";
import { getLeadActivityByTrackingIdReducer } from "../view-leads-details/get-leadActivity-byTrackingId-slice";
import { getLeadPropertiesByIdReducer } from "../view-leads-details/get-leadProperties-byLeadId-slice";
import { getleadAdditionalDetailsByIdReducer } from "../lead-capturing/get-leadAdditionalDetails-byId-slice";
import { updateLeadAdditionalDetailsReducer } from "../lead-capturing/update-leadAdditionalDetails-slice";
import { taskTypesReducer } from "../task/get-taskType-slice";
import { leadNamesReducer } from "../task/get-allLeadName-slice";
import { AddNewLeadTaskReducer } from "../task/create-leadTask-slice";
import { leadScheduledTasksReducer } from "../task/get-allLeadscheduledTask";
import { AddNewLeadNotesReducer } from "../notes/create-leadNotes-slice";
import { getDocumentsByIdReducer } from "../notes/get-documents-by-CaptureId-slice";
import { leadScheduledNotesReducer } from "../notes/get-leadScheduledNotes-by-CaptureId-slice";
import { getAllAttachmentTypeReducer } from "../notes/get-all-coreDocAttachmentType-slice";
import { getLeadScheduleTaskByIdReducer } from "../task/get-allLeadScheduleTaskById-slice";
import { leadTaskDetailsByTasksIdReducer } from "../task/get-taskDetails-by-taskTypeId-slice";
import { updateLeadTaskReducer } from "../task/update-leadTask-slice";
import { updateLeadCompletionStatusReducer } from "../task/update-leadscheduleTaskCompletionStatus-slice";
import { assignSalesRepToManagerReducer } from "../sales-rep-details(changeOwner)/assign-salesRepToManager-slice";
import { AddNewNotesReducer } from "../notes/create-notes-slice";
import { downloadDocReducer } from "../task/download-doc-slice";
import { getLeadNotesByNoteIdReducer } from "../notes/get-leadNote-by-leadNoteId-slice";
import { uploadDocsReducer } from "../upload-docs/upload-docs-slice";
import { AddLeadCaptureByQuickAddFormReducer } from "../lead-capture/create-lead-capture-byQuickAddForm-slice";
import { updateLeadNotesReducer } from "../notes/update-leadNotes-byNoteId-slice";
import { updateLeadOwnerReducer } from "../sales-rep-details(changeOwner)/update-lead-owner-by-id-slice";
import { getLeadCaptureByUserEmailReducer } from "../lead-capture/get-all-lead-capture-by-userEmail-slice";
import { updateUserPasswordReducer } from "../profile-update/update-userPassword-slice";
import { updateUserPhoneReducer } from "../profile-update/update-userPhone-slice";
import { getMaxActiveAppStatusReducer } from "../scholarship-services/get-max-active-application-status-slice";
import { getProgramTutionFeeByProgramIdReducer } from "../offer-analysis/get-programTutionFee-byprogramId-slice";
import { getMaxLeadScholarshipDetailsReducer } from "../scholarship-services/get-max-lead-scholarship-details-by-leadCapture-id-slice";
import { updateLeadScholarshipDetailsByScholarIdReducer } from "../scholarship-services/update-lead-scholarship-details-by-lead-scholar-detail-id-slice";
import { findLeadScholarshipDetailsReducer } from "../scholarship-services/find-lead-scholarship-details-by-lead-id-slice";
import { getLeadApplicationStatusByLeadIdReducer } from "../lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice";
import { getFeeCalculationByProgramIdReducer } from "../offer-analysis/get-FeeCalculation-byProgramId-slice";
import { LockLeadOfferReducer } from "../offer-details/lead-offer-lock-slice";
import { getAllLeadWithDeclineOfferReducer } from "../lead-with-decline-offer/get-leadWithDeclineOffer-slice";
import { getLeadOfferByLeadIdReducer } from "../offer-analysis/get-lead-offers-by-leadId-slice";
import { getLeadOfferHistoryByOfferIdReducer } from "../offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";
import { getFeeCalculationForDeclineByIdReducer } from "../lead-with-decline-offer/get-feeCalculationForDecline-byId-slice";
import { getLeadScholarshipDetailsForDeclineByIdSliceReducer } from "../lead-with-decline-offer/get-ScholarshipDetailsForDecline-byId-slice";
import { reissueContractByIdReducer } from "../lead-with-decline-offer/save-ReissueContract-byid-slice";
import { getStudentDocsByLeadCaptureIdReducer } from "../student-documets/get-studentDocs-byId-slice";
import { verifyStudentDocsReducer } from "../student-documets/verify-studentDocs-slice";
import { getConfirmationForAllDocsByLeadCaptureIdReducer } from "../student-documets/get-confirmation-all-docs-by-lead-id-slice";
import { studentDocsStatusReducer } from "../student-documets/get-studentDocsStatus-slice";
import { getPackageDealByLeadCaptureIdReducer } from "../package-deal/get-package-deal-by-programId-leadCaptureId-slice";
import { updateLeadBiograficalInfoReducer } from "../lead-attribute-update/update-leadBiograficalInfo-slice";
import { updateLeadContactReducer } from "../lead-attribute-update/update-contact-slice";
import { updateLeadAddressReducer } from "../lead-attribute-update/update-leadAddress-slice";
import { getBiographicalInfoByIdReducer } from "../lead-attribute-update/get-leadBiographicalInfo-slice";
import { getLeadAddressByIdReducer } from "../lead-attribute-update/get-leadAddress-byId-slice";
import { getLeadContactDetailsByIdReducer } from "../lead-attribute-update/get-leadContactDetails-byId-slice";
import { getLeadAcademicDetailsByIdReducer } from "../lead-attribute-update/get-leadAcademicDetails-slice";
import { updateLeadAcademicDetailsReducer } from "../lead-attribute-update/update-leadAcademicDetails-slice";
import { getLeadOfferDeclineReasonByOfferIdSliceReducer } from "../lead-with-decline-offer/get-leadOfferdeclineReason-by-offerId-slice";
import { getLeadCaptureByFullNameReducer } from "../lead-capture/get-allLeadCapture-By-fullName-slice";
import { getleadSubStagesByIdReducer } from "../lead-capturing/get-allLeadSubStages-byId-slice";
import { OwnersReducer } from "../lead-capturing/get-allOwner-slice";
import { ApplicationStatusReducer } from "../lead-capturing/get-allApplicationStatus-slice";
import { getLeadEnquiryDetailsByIdReducer } from "../lead-attribute-update/get-leadEnquiryDetails-slice";
import { getAcDataRowWiseByCareerIdReducer } from "../lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityDataRowWiseByStateIdReducer } from "../lead-attribute-update/get-CityRowWise-byStateId-slice";
import { createLeadEnquirySliceReducer } from "../lead-attribute-update/create-leadEnquiry-slice";
import { getAdditionalInfoByIdReducer } from "../lead-attribute-update/get-leadAdditionalDetails-slice";
import { updateLeadAdditionalInfoReducer } from "../lead-attribute-update/update-leadAdditionalDetails-slice";
import { AddAdditionalDetailsReducer } from "../lead-attribute-update/create-leadAdditionalDetails-slice";
import { getAllActiveScholarCategoryReducer } from "../scholarship-get/get-all-scholarship-category-slice";
import { getScholarshipSchemeByCategIdReducer } from "../scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
import { getScholarshipSlabBySchemeIdReducer } from "../scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
import { getScholarshipPercentageDiscountBySlabIdReducer } from "../scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import { getFeeDetailsV2Reducer } from "../leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { getAllDiscountReasonReducer } from "../scholarship-get/get-all-discountReason-slice";
import { getAllActiveScholarshipOptionReducer } from "../scholarship-get/get-all-scholarshipData-slice";
import { exportLeadReducer } from "../actions/export-lead-slice";
import { BulkChangeStageReducer } from "../actions/bulk-change-stage-slice";
import leadReportSlice from "../home/get-followUp-details-slice";
import { getAllActivityOutcomeReducer } from "../activity/get-activityOutcome-slice";
import { addPhoneConvoToActivityHistoryReducer } from "../activity/add-phoneConvoToActivityHistory-slice";
import { getAllActivityTypeReducer } from "../activity/get-activityType-slice";
import { AddActivityReducer } from "../activity/create-activity-slice";
import { getAllActivityDetailsByActionTrackIdReducer } from "../activity/get-activity-details-by-actionTrackId-slice";
import { getLeadPreviousPaymentByLeadIdReducer } from "../offer-analysis/get-leadPreviousPayments-slice";
import { EscalateLeadOfferReducer } from "../offer-analysis/eccalate-leadOffer-slice";
import { changeLeadEnquiryStatusReducer } from "../lead-merge/change-leadEnquiryStatus-by-captureId-existingEnquiryId-newActiveEnquiryId-slice";
import { getLeadForCashPaymentsReducer } from "../view-cash-payments/get-leadForCashPayment-slice";
import { AddCashPaymentReducer } from "../activity/create-payment-slice";
import { getAllPaymentTypeReducer } from "../activity/get-paymentType-slice";
import { submitCashPaymentsReducer } from "../view-cash-payments/submit-cash-payment-slice";
import { getLeadInstallmentDetailsByLeadAndEnquiryIdReducer } from "../leadFeeDetailsV2/get-leadInstallmentById-slice";
import { getCheckForUpdateLeadPropertyReducer } from "../lead-properties/check-for-updateLeadProperty-slice";
import { updateLeadPropertiesReducer } from "../lead-properties/update-leadProperties-slice";
import { addLeadInstallmentsByCaptureIdEnquiryIdOfferIdReducer } from "../view-cash-payments/add-installments-by- captureId-enquiryId-offerId-slice";
import { getEnquiryChangeWarningReducer } from "../lead-merge/get-enquiryChangeWarning-by-captureId-and-EnquiryId-slice";
import { getInboundCallDetailsReducer } from "../lead-properties/get-inboundCall-details-by-actionTrackId-slice";
import { getUntouchedLeadsReducer } from "../dashboard/get-untouchedLeadsByUsername-slice";
import { getTotalPendingTasksReducer } from "../dashboard/get-totalPendingTasksByUsername-slice";
import { getTodayPendingTasksReducer } from "../dashboard/get-todayPendingTasksByUsername-slice";
import { getPreviousPendingTasksReducer } from "../dashboard/get-previousPendingTasksByUsername-slice";
import { getTodayUntouchedLeadDetailsReducer } from "../dashboard/get-todayUntouchedLeadDetailsByUsername-slice";
import { getPreviousUntouchedLeadDetailsReducer } from "../dashboard/get-previousUntouchedLeadDetailsByUsername-slice";
import { getLeadStagesByOutComeIdReducer } from "../activity/get-leadStagesValuesByOutComeId-slice";
import { getleadPhoneConvoOutcomeByIdReducer } from "../view-leads-details/get-lead-phone-convo-outcome-slice";
import { getLeadNotesDetailsByIdReducer } from "../view-leads-details/get-lead-notesDetailsById-slice";
import { getLeadTaskDetailsByIdReducer } from "../view-leads-details/get-leadTaskDetailsById-slice";
import { getLeadsCareerCountReducer } from "../dashboard/get-leadsCareerCountByUsername-slice";
import { getLeadsSourceCountReducer } from "../dashboard/get-leadsSourceCountByUsername-slice";
import { getLeadsCountStatusReducer } from "../dashboard/get-leadsCountStatusByUsername-slice";
import { getAllInboundWhatsappMessagesReducer } from "../wp/get-allInboundWhatsappMessages-slice";
import { getLeadPaymentsDetailsByIdReducer } from "../view-leads-details/get-leadPaymentsDetailsById-slice";
import { getLeadEnquiryDetailsByTrackingIdReducer } from "../view-leads-details/get-leadEnquiryDetailsById-slice";
import { getCollegeDkhoLeadsReducer } from "../third-party-slices/get-collegeDkhoLeads-slice";
import { getCollegeDuniaLeadsReducer } from "../third-party-slices/get-collegeDuniaLeads-slice";
import { getShikshaLeadsReducer } from "../third-party-slices/get-shikshaLeads-slice";
import { getAllInboundAnsweredCallDetailsByStatusReducer } from "../smart-view/get-inboundAnswered-call-detailsby-status-slice";
import { getAllInboundMissedCallDetailsByStatusReducer } from "../smart-view/get-inboundMissed-call-by-status-slice";
import { getAllInboundDisconnectedAtIVRCallDetailsByStatusReducer } from "../smart-view/get-inbound-DisconnectedAtIVR-byStatus-slice";
import { getAllInboundDisconnectedAfterIVRCallDetailsByStatusReducer } from "../smart-view/get-inbound-DisconnectedAfterIVR-byStatus-slice";
import { getNewLeadFilterDataReducer } from "../smart-view/get-newLead-filterData-slice";
import { manageWhatsAppActionsReducer } from "../wp/manageWp-action-slice";
import { updateNameWpLeadsReducer } from "../wp/updateNameWpLead-slice";
import { getLeadPaymentDetailsForFinanceReducer } from "../smart-view/get-leadPaymentDetailsForFinance-slice";
import { importLeadsReducer } from "../actions/import-leads-slice";
import { viewDocumentReducer } from "../view-document/view-document-slice";
import { isNumberExistsReducer } from "../lead-capture/checkIfNumberExists-slice";
import { getAllImportedLeadReducer } from "../actions/get-all-imported-lead-slice";
import { deleteImportedLeadsReducer } from "../actions/delete-imported-leads-slice";
import { pushImportedLeadsReducer } from "../actions/push-imported-leads";
import { getAllAcademicCareerForQuickaddReducer } from "../get/get-all-careerFor-quickAdd-slice";
import { getLeadCaptureDetailsByActionTrackIdReducer } from "../lead-capture/get-leadCaptureDetails-by-actionTrackId-slice";
import { getLeadBasicDetailsReducer } from "../lead-capture/get-leadBasicDetails-slice";
import { testApiReducer } from "../test-api/test-api-slice";
import { advanceSearchFieldsReducer } from "../advance-search/get-allAdvanceSearchFields-slice";
import { leadFieldByNameReducer } from "../advance-search/get-allLeadField-byName-slice";
import { ViewCoreViewLeadReducer } from "../advance-search/get-coreViewLead-byQuery-slice";
import { getTwigzLeadsReducer } from "../third-party-slices/get-twigzLeads-slice";
import { getTodayOutboundCallbacksReducer } from "../smart-view/get-todayOutboundCallbacks-slice";
import { createManualCallOutboundReducer } from "../activity/create-manualCallOutbound-slice";
import { getManualOutboundCallDetailsReducer } from "../activity/get-manualCallOutboundDetails-slice";
import { getLeadPropertiesForLeadMergeReducer } from "../lead-merge/get-leadMergeProperties-by-captureId-slice";
import { leadMergeEnquiryDetailsReducer } from "../lead-merge/get-leadMergeEnquiryDetails-by-captureId-slice";
import { getOwnerChangedDetailsReducer } from "../lead-capturing/get-ownerChangedDetails-slice";
import { getLeadOwnerAssignedDetailsReducer } from "../lead-capturing/get-leadOwnerAssignedDetails-slice";
import { mergeLeadsReducer } from "../lead-merge/merge-lead-slice";
import { advanceSearchExportReducer } from "../actions/advanceSearch-export-lead-slice";
import { bulkUpdateTaskCompletionReducer } from "../actions/bulk-updateTask-completion-status-slice";
import { getRecordWalkinOutcomeReducer } from "../activity/get-recordWalkinOutcomeDetails-slice";
import { getRecordCounsellingOutcomeReducer } from "../activity/get-recordCounsellingOutcomeDetails-slice";
import { getLeadInitiatePaymentReducer } from "../activity/get-leadInitiatePaymentDetails-slice";
import { newInstallmentDetailsReducer } from "../leadFeeDetailsV2/get-newInstallmentDetails-slice";
import { getLeadGeneralInfoReducer } from "../activity/get-leadGeneralInfoDetails-slice";
import { getSrmusetOptionDetailsReducer } from "../srmuset/get-srmuSetOption-detail-slice";
import { SaveSrmuSetOptionReducer } from "../srmuset/save-srmuset-option-slice";
import { getLeadOfferAnalysisDetailsByEnquiryIdReducer } from "../view-leads-details/get-leadOfferDetails-slice";
import { getDurgeshLeadsReducer } from "../third-party-slices/get-durgeshLeads-slice";
import { getCareerCoachLeadsReducer } from "../third-party-slices/get-careerCoachLeads-slice";
import { getMaxCurrentOfferStatusReducer } from "../void-offer/get-maxCurrentOfferStatus-by-enquiryId-slice";
import { paginatedLeadsReducer } from "../pagination-v1/get-paginatedLead-slice";
import { getAllActiveCampusReducer } from "../get/get-allActiveCampus-slice";
import { saveCampusInterestedReducer } from "../campus/save-campusInterestedInDetails-slice";
import { getCampusInterestedDetailsReducer } from "../campus/get-campusInterestedDetails-by-enquiryId-slice";
import { getCollegeSkyLeadsReducer } from "../third-party-slices/get-collegeSkyLeads-slice";
import { FilteredTaskReducer } from "../manage-task/get-filtered-task-slice";
import notificationReducer from "../notifications/notification-slice";
import { getWalkinDetailsReducer } from "../dashboard/get-walkin-details-slice";
import { getCounsellingDetailsReducer } from "../dashboard/get-counselling-details-slice";
import { searchedLeadsReducer } from "../pagination-v1/get-searched-leads-slice";
import { getAllWhatsappTemplateReducer } from "../whatsapp -messenger/get-allWhatsappTemplate-slice";
import { getWhatsapptemplateByTemplateIdReducer } from "../whatsapp -messenger/get-whatsappTemplate-by-templateId-slice";
import { getFaisalAliLeadsReducer } from "../third-party-slices/get-faisalAli-lead-slice";
import { getAdarshYadavLeadsReducer } from "../third-party-slices/get-adarshYadav-leads-slice";
import { getWakarConsultancyLeadReducer } from "../third-party-slices/get-wakar-consultancy-leads-slice";
import { sendWhatsappByTemplateIdReducer } from "../whatsapp -messenger/send-whatsapp-slice";
import { collegeConnectLeadsReducer } from "../third-party-slices/get-collegeConnect-leads-slice";
import { meritAdmissionsLeadsReducer } from "../third-party-slices/get-meritAdmissions-lead-slice";
import { educationConsultancyLeadsReducer } from "../third-party-slices/get-educationConsultancy-lead-slice";
import { duniaNowLeadsReducer } from "../third-party-slices/get-duniaNow-leads-slice";
import { leadNameReducer } from "../advance-search/get-all-leadName-slice";
import { leadEmailReducer } from "../advance-search/get-all-leadEmail-slice";
import { leadPhoneReducer } from "../advance-search/get-all-leadPhone-slice";
import { leadCareerReducer } from "../advance-search/get-all-leadCareer-slice";
import { leadProgramReducer } from "../advance-search/get-all-leadProgram-slice";
import { CareerGuideLeadsReducer } from "../third-party-slices/get-careerGuide-leads-slice";
import { leadSourseReducer } from "../advance-search/get-all-leadSourse-slice";
import { leadStageReducer } from "../advance-search/get-all-leadStage-slice";
import { leadSubStageReducer } from "../advance-search/get-all-leadSubStage-slice";
import { leadStateReducer } from "../advance-search/get-all-leadState-slice";
import { leadApplicationStatusReducer } from "../advance-search/get-all-leadApplicationStatus-slice";

const RootReducer = {
  auth: authReducer,
  ui: uiSliceReducer,
  table: tableReducer,
  notification: notificationReducer,
  callReq: callRequestReducer,
  paginationForLeads: paginationReducer,
  getLeadCaptureByFullName: getLeadCaptureByFullNameReducer,
  getLoggedInUserData: loggedInUserReducer,
  filterLeadsData: leadsFilterReducer,
  leadStageValues: leadStagesReducer,
  leadSourceValues: leadSourceReducer,
  getAllApplicationStatus: ApplicationStatusReducer,
  getAllOwner: OwnersReducer,
  getleadSubStagesDataById: getleadSubStagesByIdReducer,
  getLeadCaptureById: getLeadCaptureByIdReducer,
  addLeadCapture: AddLeadCaptureReducer,
  addLeadAdditionalDetails: AddLeadAdditionalDetailsReducer,
  getLeadAdditionalDetailsDataById: getleadAdditionalDetailsByIdReducer,
  addLeadCaptureByQuickAddForm: AddLeadCaptureByQuickAddFormReducer,
  isNumberExistsResponse: isNumberExistsReducer,
  updateLeadOwner: updateLeadOwnerReducer,
  getLeadCaptureByUserEmail: getLeadCaptureByUserEmailReducer,
  getMaxActiveAppStatusResponse: getMaxActiveAppStatusReducer,

  // Third Party------------
  getCollegeDkhoLeadsData: getCollegeDkhoLeadsReducer,
  getCollegeDuniaLeadsData: getCollegeDuniaLeadsReducer,
  getShikshaLeadsData: getShikshaLeadsReducer,
  // Dahsboard------------

  getUntouchedLeadsData: getUntouchedLeadsReducer,
  getTodayPendingTasksData: getTodayPendingTasksReducer,
  getTotalPendingTasksData: getTotalPendingTasksReducer,
  getPreviousPendingTasksData: getPreviousPendingTasksReducer,
  getTodayUntouchedLeadDetailsData: getTodayUntouchedLeadDetailsReducer,
  getPreviousUntouchedLeadDetailData: getPreviousUntouchedLeadDetailsReducer,

  //lead applicaiton status
  addLeadApplicationStatus: createLeadApplicationStatusReducer,
  getLeadApplicationStatusDataById: getLeadApplicationStatusByIdReducer, // do not know where is using

  //lead academic detials for 12th
  addLeadAcadDetailsTwelfth: createLeadAcadDetailsTwelfthReducer,
  getLeadAcadDetailsTwelfthDataById: getLeadAcadDetailsTwelfthByIdReducer,

  //lead academic details for UG
  addLeadAcadDetailsUG: createLeadAcadDetailsUGReducer,
  getLeadAcadDetailsUGDataById: getLeadAcadDetailsUGByIdReducer,
  addLeadContactPhone: addLeadContactPhoneReducer,
  getLeadContactPhoneById: leadContactPhoneByIdReducer,
  addLeadAcademicDetailsForTenth: addLeadAcademicDetailsForTenthReducer,
  getLeadAcademicDetailsForTenthById: leadAcademicDetailsForTenthByIdReducer,

  //*******************************  Lead Address Detail *********************************
  addLeadAddressDetail: AddLeadAddressDetailReducer,
  getLeadAddressDetail: getLeadAddressDetailByIdReducer,

  //*********************get********************************
  getAllAcademicCareer: getAllAcademicCareerReducer,
  getAllAcademicProgramByCareer: getAcDataByCareerIdReducer,
  coreAcademicProgram: getAllAcademicProgramReducer,
  getAllAdmitType: getAllAdmitTypeReducer,
  getAllCategory: getAllCategoryReducer,
  cityByStateId: getAllCityByStateIdReducer,
  coreTenthMarkingScheme: getAllTenthMarkingSchemeReducer,
  getAllTwelfthMarkingSchemeData: getAllTwelfthMarkingSchemeReducer,
  getAllTwelfthBoardData: getAllTwelfthBoardReducer,
  getAllTwelfthResultStatusData: getAllTwelfthResultStatusReducer,
  getAllStatesData: getAllStateReducer,
  getAllCityData: getAllCityReducer,
  getAllTenthBoardData: getAllTenthBoardReducer,
  getAllCityDataByStateId: getAllCityByStateIdReducer,
  getAllTenthMarkingSchemeData: getAllTenthMarkingSchemeReducer,
  getAllLeadSource: getAllLeadSourceReducer,
  getAllUgResultStatusData: getAllUgResultStatusReducer,

  //############## getById ##########################
  getAcademicCareerById: getAcademicCareerByIdReducer,
  getAcademicProgramById: getAcademicProgramByIdReducer,
  getAdmitTypeServiceDataById: getAdmitTypeServiceDataByIdReducer,
  getCityById: getCityByIdReducer,
  getTenthBoardByIdReducer: getTenthBoardByIdReducer,
  getTenthMarkingSchemeById: getTenthMarkingSchemeByIdReducer,
  getTwelfthBoardById: getTwelfthBoardByIdReducer,
  getUgResultStatusById: getUgResultStatusByIdReducer,
  getCategoryById: getCategoryByIdReducer,
  getCoreStateByStateId: getCoreStateByStateIdReducer,
  getTwelfthMarkingSchemeById: getTwelfthMarkingSchemeByIdReducer,
  getTwelveResultById: getTwelveResultByIdReducer,
  getLeadCaptureDataById: getLeadCaptureByIdReducer,
  getAllLeadOwner: getAllLeadOwnerReducer,
  assignSalesRepToManager: assignSalesRepToManagerReducer,
  getAllAcademicCareerForQuickadd: getAllAcademicCareerForQuickaddReducer,

  //*******************************  Lead Activity Details *********************************
  getLeadStagesValuesByOutComeId: getLeadStagesByOutComeIdReducer,
  getleadDetailsDataById: getleadDetailsByIdReducer,
  getleadActivityDataByTrackingId: getLeadActivityByTrackingIdReducer,
  getLeadPropertiesDataById: getLeadPropertiesByIdReducer,
  leadAdditionalDetailsUpdate: updateLeadAdditionalDetailsReducer,
  getLeadEnquiryDetailsDataNewById: getLeadEnquiryDetailsByTrackingIdReducer,
  getLeadPaymentsDetailsDataById: getLeadPaymentsDetailsByIdReducer,
  getOwnerChangedDetails: getOwnerChangedDetailsReducer,
  getLeadOwnerAssignedDetails: getLeadOwnerAssignedDetailsReducer,

  //*******************************  Task *********************************
  getTaskType: taskTypesReducer,
  getLeadName: leadNamesReducer,
  addNewLeadTask: AddNewLeadTaskReducer,
  getLeadScheduledTask: leadScheduledTasksReducer,
  getLeadScheduleTaskDataById: getLeadScheduleTaskByIdReducer,
  getLeadTaskDetailsByTaskId: leadTaskDetailsByTasksIdReducer,
  leadTaskUpdate: updateLeadTaskReducer,
  leadCompletionStatusUpdate: updateLeadCompletionStatusReducer,
  //*******************************  Notes *********************************
  addNewLeadNotes: AddNewLeadNotesReducer, //this slice is no longer in use
  getDocumentsDataById: getDocumentsByIdReducer,
  getLeadScheduledNotes: leadScheduledNotesReducer,
  coreAttachementType: getAllAttachmentTypeReducer,
  addNewNotes: AddNewNotesReducer,
  downloadNotes: downloadDocReducer,
  getLeadNotesDataByNoteId: getLeadNotesByNoteIdReducer,
  leadNotesUpdate: updateLeadNotesReducer,

  //*******************************  docs upload *********************************
  docsUpload: uploadDocsReducer,

  //*******************************  profile update *********************************
  userPasswordUpdate: updateUserPasswordReducer,
  userPhoneUpdate: updateUserPhoneReducer,

  //*******************************  offer Analysis *********************************
  getProgramTutionFeeByProgramIdResponse: getProgramTutionFeeByProgramIdReducer,
  getFeeCalculationByProgramIdResponse: getFeeCalculationByProgramIdReducer,
  getLeadOfferByLeadId: getLeadOfferByLeadIdReducer,
  lockLeadOffer: LockLeadOfferReducer,
  leadOfferHistoryByOfferId: getLeadOfferHistoryByOfferIdReducer,
  packageDealByLeadCaptureId: getPackageDealByLeadCaptureIdReducer,
  getLeadPreviousPaymentByLeadId: getLeadPreviousPaymentByLeadIdReducer,
  EscalateLeadOffer: EscalateLeadOfferReducer,

  //*******************************  student documents *********************************

  getStudentDocsByLeadCaptureIdResponse: getStudentDocsByLeadCaptureIdReducer,
  verifyStudentDocsResponse: verifyStudentDocsReducer,
  getConfirmationForAllDocsByLeadCaptureId:
    getConfirmationForAllDocsByLeadCaptureIdReducer,
  studentDocsStatus: studentDocsStatusReducer,

  //*******************************  scholarship details *********************************
  // updateLeadScholarshipDetails: updateLeadScholarshipDetailsReducer,
  // getLeadScholarshipDetails: getLeadScholarshipDetailsReducer,
  getMaxLeadScholarshipDetails: getMaxLeadScholarshipDetailsReducer,
  updateLeadScholarshipDetailsByScholarId:
    updateLeadScholarshipDetailsByScholarIdReducer,
  findLeadScholarshipDetails: findLeadScholarshipDetailsReducer,

  getLeadApplicationStatusDataByLeadId: getLeadApplicationStatusByLeadIdReducer,

  //*******************************  authority decline cases *********************************
  coreLeadWithDeclineOffer: getAllLeadWithDeclineOfferReducer,
  getFeeCalculationForDeclineById: getFeeCalculationForDeclineByIdReducer,
  getLeadScholarshipDetailsForDeclineById:
    getLeadScholarshipDetailsForDeclineByIdSliceReducer,
  saveReissueContract: reissueContractByIdReducer,
  getLeadOfferDeclineReasonByOfferId:
    getLeadOfferDeclineReasonByOfferIdSliceReducer,

  //*******************************  Lead Attribute Update *********************************

  getBiographicalInfoByIdData: getBiographicalInfoByIdReducer,
  LeadBiograficalInfoUpdate: updateLeadBiograficalInfoReducer,
  LeadContactUpdate: updateLeadContactReducer,
  LeadAddressUpdate: updateLeadAddressReducer,
  getLeadAddressDataById: getLeadAddressByIdReducer,
  getLeadContactDetailsDataById: getLeadContactDetailsByIdReducer,
  getLeadAcademicDetailsDataById: getLeadAcademicDetailsByIdReducer,
  LeadAcademicDetailsUpdate: updateLeadAcademicDetailsReducer,
  getLeadEnquiryDetailsDataById: getLeadEnquiryDetailsByIdReducer,
  getAcademicProgramRowWiseByCareerId: getAcDataRowWiseByCareerIdReducer,
  getCityRowWiseByStateId: getCityDataRowWiseByStateIdReducer,
  addLeadEnquiry: createLeadEnquirySliceReducer,
  getAdditionalInfoByIdData: getAdditionalInfoByIdReducer,
  LeadAdditionalInfoUpdate: updateLeadAdditionalInfoReducer,
  addAdditionalDetails: AddAdditionalDetailsReducer,

  //**************Scholarship Get************************************ */
  getAllActiveScholarCategory: getAllActiveScholarCategoryReducer,
  getAllScholarshipSchemeByCategoryId: getScholarshipSchemeByCategIdReducer,
  getAllScholarshipSlabBySchemeId: getScholarshipSlabBySchemeIdReducer,
  getScholarshipPercentageDiscountBySlabId:
    getScholarshipPercentageDiscountBySlabIdReducer,
  getAllDiscountReason: getAllDiscountReasonReducer,
  getAllScholarshipOption: getAllActiveScholarshipOptionReducer,

  // ***************Fee Details V2 ****************************
  getFeeDetailsV2: getFeeDetailsV2Reducer,

  // *******************Export lead ********************
  importLeads: importLeadsReducer,
  // *******************Export lead ********************
  exportLeadData: exportLeadReducer,
  BulkChangeStage: BulkChangeStageReducer,

  // **********************Home**********************
  getFollowUpDetails: leadReportSlice,

  // ****************activity ************************
  getActivityOutcome: getAllActivityOutcomeReducer,
  addPhoneConvoToActivityHistory: addPhoneConvoToActivityHistoryReducer,
  getActivityType: getAllActivityTypeReducer,
  addActivity: AddActivityReducer,
  getActivityDetailsByActionTrackId:
    getAllActivityDetailsByActionTrackIdReducer,
  createManualCallOutbound: createManualCallOutboundReducer,
  getManualOutboundCallDetails: getManualOutboundCallDetailsReducer,
  exportLeadForAdvanceSearch: advanceSearchExportReducer,

  // ********************lead merge ************************************
  changeLeadEnquiryStatus: changeLeadEnquiryStatusReducer,
  getEnquiryChangeWarning: getEnquiryChangeWarningReducer,

  // ******************* lead cash payment **************
  getLeadForCashPayments: getLeadForCashPaymentsReducer,
  addCashPayment: AddCashPaymentReducer,
  getPaymentType: getAllPaymentTypeReducer,
  submitCashPayments: submitCashPaymentsReducer,
  getLeadInstallmentDetailsDataByLeadAndEnquiryId:
    getLeadInstallmentDetailsByLeadAndEnquiryIdReducer,
  addLeadInstallmentsByCaptureIdEnquiryIdOfferId:
    addLeadInstallmentsByCaptureIdEnquiryIdOfferIdReducer,

  // *******************lead property ***********************
  checkForUpdateLeadProperty: getCheckForUpdateLeadPropertyReducer,
  LeadPropertiesUpdate: updateLeadPropertiesReducer,

  // *******************Dashboard ***********************
  getInboundCallDetails: getInboundCallDetailsReducer,
  getleadPhoneConvoOutcomeDataById: getleadPhoneConvoOutcomeByIdReducer,
  getLeadNotesDetailsDataById: getLeadNotesDetailsByIdReducer,
  getLeadTaskDetailsDataById: getLeadTaskDetailsByIdReducer,
  getLeadsCareerCountData: getLeadsCareerCountReducer,
  getLeadsSourceCountData: getLeadsSourceCountReducer,
  getLeadsCountStatusData: getLeadsCountStatusReducer,
  getWalkinDetails: getWalkinDetailsReducer,
  getCounsellingDetails: getCounsellingDetailsReducer,

  // *******************Wp***********************
  getAllInboundWhatsappMessagesData: getAllInboundWhatsappMessagesReducer,
  manageWhatsAppActionsData: manageWhatsAppActionsReducer,
  updateNameWpLeadsData: updateNameWpLeadsReducer,
  // *******************Smart view***********************
  getNewLeadFilterData: getNewLeadFilterDataReducer,
  getAllInboundAnsweredCallDetailsByStatus:
    getAllInboundAnsweredCallDetailsByStatusReducer,
  getAllInboundMissedCallDetailsByStatus:
    getAllInboundMissedCallDetailsByStatusReducer,
  getInboundDisconnectedAtIVRCallDetails:
    getAllInboundDisconnectedAtIVRCallDetailsByStatusReducer,
  getInboundDisconnectedAfterIVRCallDetails:
    getAllInboundDisconnectedAfterIVRCallDetailsByStatusReducer,
  getLeadPaymentDetailsDataForFinance: getLeadPaymentDetailsForFinanceReducer,
  getTodayOutboundCallbacks: getTodayOutboundCallbacksReducer,
  //view docs
  viewDocument: viewDocumentReducer,

  //import lead
  getAllImportedLead: getAllImportedLeadReducer,
  deleteImportedLeads: deleteImportedLeadsReducer,
  pushImportedLead: pushImportedLeadsReducer,

  getLeadCaptureDetailsByActionTrackId:
    getLeadCaptureDetailsByActionTrackIdReducer,
  getLeadBasicDetails: getLeadBasicDetailsReducer,

  testApi: testApiReducer,
  //advance search
  getAllAdvanceSearchFilterFields: advanceSearchFieldsReducer,
  getAllLeadFieldByName: leadFieldByNameReducer,
  getCoreViewLead: ViewCoreViewLeadReducer,
  getAllLeadNameData: leadNameReducer,
  getAllLeadEmailsData: leadEmailReducer,
  getAllLeadPhonesData: leadPhoneReducer,
  getAllLeadCareersData: leadCareerReducer,
  getAllLeadProgramsData: leadProgramReducer,
  getAllLeadSoursesData : leadSourseReducer,
  getAllLeadStagesData: leadStageReducer,
  getAllLeadSubStagesData : leadSubStageReducer,
  getAllLeadStatesData : leadStateReducer,
  getAllLeadApplicationStatusData : leadApplicationStatusReducer,


  //third paty
  getTwigzLeads: getTwigzLeadsReducer,
  getDurgeshLeadsData: getDurgeshLeadsReducer,
  getCareerCoachLeads: getCareerCoachLeadsReducer,
  getCollegeSkyLeads: getCollegeSkyLeadsReducer,
  getFaisalAliLeads: getFaisalAliLeadsReducer,
  getAdarshYadavLeads: getAdarshYadavLeadsReducer,
  getWakarConsultancyLeads: getWakarConsultancyLeadReducer,
  getCollegeConnectLeads: collegeConnectLeadsReducer,
  getMeritAdmissionsLeads: meritAdmissionsLeadsReducer,
  getEducationConsultancyLeads: educationConsultancyLeadsReducer,
  getDuniaNowLeads: duniaNowLeadsReducer,
  getCareerGuideLeads: CareerGuideLeadsReducer,

  //lead merge
  getLeadPropertiesForLeadMerge: getLeadPropertiesForLeadMergeReducer,
  getLeadMergeEnquiryDetails: leadMergeEnquiryDetailsReducer,
  mergeLead: mergeLeadsReducer,

  //bulk task update
  bulkUpdateTaskCompletionStatus: bulkUpdateTaskCompletionReducer,

  //walkin
  getRecordWalkinOutcomeDetails: getRecordWalkinOutcomeReducer,
  getRecordCounsellingOutcomeDetails: getRecordCounsellingOutcomeReducer,

  getLeadInitiatePaymentDetails: getLeadInitiatePaymentReducer,

  //installment calculation
  getInstallmentCalculation: newInstallmentDetailsReducer,

  getLeadGeneralInfoDetails: getLeadGeneralInfoReducer,

  //srmusetOption
  getSrmusetOptionDetails: getSrmusetOptionDetailsReducer,
  saveSrmuSetOption: SaveSrmuSetOptionReducer,

  getLeadOfferDetails: getLeadOfferAnalysisDetailsByEnquiryIdReducer,

  //void
  getMaxCurrentOfferStatus: getMaxCurrentOfferStatusReducer,

  //pagination
  getPaginatedLeads: paginatedLeadsReducer,

  //campus
  getAllActiveCampus: getAllActiveCampusReducer,
  saveCampusInterestedIn: saveCampusInterestedReducer,
  getCampusInterestedDetails: getCampusInterestedDetailsReducer,

  //manage task
  getFilteredTask: FilteredTaskReducer,
  getsearchedLeads: searchedLeadsReducer,

  //whatsapp messenger
  getAllWhatsappTemplate: getAllWhatsappTemplateReducer,
  getWhatsappTemplateByTemplateId: getWhatsapptemplateByTemplateIdReducer,
  sendWhatsapp: sendWhatsappByTemplateIdReducer,
};

export default RootReducer;
