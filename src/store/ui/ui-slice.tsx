import { createSlice } from "@reduxjs/toolkit";

export interface selectedColumnType {
  id: number;
  name: string;
  label: string;
}

interface typeUI {
  settingId: any;
  isFilterDropdown: boolean;
  isSubData: boolean | unknown;
  isLastThreeRows: boolean;
  leadPhone: string | number;
  isActionModalShow: boolean;
  isFilterModalShow: boolean;
  isLeadsOpen: boolean;
  isMobileMenu: boolean;
  isSettingData: boolean;
  isCustomDate: boolean;
  isSelectedDateRange: boolean;
  isDashboardOpen: boolean;
  isLeadsOpenForMobile: boolean;
  isDashboardOpenForMobile: boolean;
  isDropdownOpen: boolean;
  filterCount: number;
  resetFlag: boolean;
  isProfileOpen: boolean;
  isCardShow: boolean;
  activeStep: null | number;
  // activeSteps: { [key: string]: boolean };
  resetFilters: any;
  isError: boolean;
  seed: number;
  isDrawerOpen: boolean;
  isDrawerOpenForTabAction: boolean;
  modalId: number | null;
  isOpenFor12th: boolean;
  isOpenForDiploma: boolean;
  isNotUndergraduate: boolean;
  isActionOwnerModalShow: boolean;
  initialPhoneNumber: any;
  submittedFormData: any;
  getLeadsPrimaryNumber: any;
  getCreateLeadErrors: [] | null;
  leadCaptureId: number | null;
  getHeaderTabIconsName: string | any; // for getitng tab icon name to open side drawer
  NotesData: Array<any>;
  selectedOption: any;
  ResetFormikInitialValues: () => void;
  isQuickAddFormModalOpen: boolean;
  isLeadsImportModalOpen: boolean;
  rightSectionTabname: string;
  isEditEmail: boolean;
  isEditPhone: boolean;
  getOfferAndInstallmentPayload: any;
  isUpdateModalOpen: boolean;
  isEnableForTwelfthInputFields: boolean;
  isEnableForDiplomaInputFields: boolean;
  isEnableForUGInputFields: boolean;
  getAllCheckSelectedDataFormCustomTable: [] | undefined;
  isShowModalForTestAction: boolean;
  isHamburgerModalOpen: boolean | unknown;
  selectedColumnToDisplay: selectedColumnType[];
  isDialogOpenForScolarship: boolean;
  scholarshipData: {};
  isShowModalForChangeStage: boolean;
  previousEnquiryPay: { adjustedPercentage: number; adjustedAmount: number };
  isShowModalForCalling: boolean;
  isShowModalForDownloadPaymentPdf: boolean;
  paymentRecepitData: any;
  selectedRazorPayId: string;
  isShowModalForDownloadFeeAndInstallmentPdf: boolean;
  advanceSearchModal: boolean;
  selectedColumnToDisplayForAdvanceSearch: selectedColumnType[];
  isModalOpenForAdvanceSearchColumn: boolean;
  isAdvanceSearchModelColumnFlag: boolean;
  visibleColumns: Array<String>;
  thirdpartySelectedleads: [];
  getLeadsForOverdueTask: [];
  getLeadsForManageTask: [];
  lockOfferStatus: string;
  packageDeal: string;
  oneTimeDiscount: string;
  paginatedProps: {
    pageSize: number,
    pageNumber: number,
  },
  paginatedPropsForAdvanceSearch: {
    pageSize: number,
    pageNumber: number,
  },
  searchQuery: string;
  whatsappMessengerModal : boolean;
}

const initialState: typeUI = {
  isLeadsOpen: false,
  isMobileMenu: false,
  leadPhone: "",
  resetFilters: "",
  isSubData: false,
  isLastThreeRows: false,
  isError: false,
  isFilterDropdown: false,
  settingId: null,
  isActionModalShow: false,
  isFilterModalShow: false,
  isCustomDate: false,
  isSettingData: false,
  isSelectedDateRange: false,
  isDashboardOpen: false,
  isLeadsOpenForMobile: false,
  isDashboardOpenForMobile: false,
  isDropdownOpen: false,
  filterCount: 0,
  resetFlag: false,
  isProfileOpen: false,
  isCardShow: true,
  activeStep: null,
  // activeSteps: {},
  isDrawerOpen: false,
  isDrawerOpenForTabAction: false,
  seed: 1,

  modalId: null, // modal id to handle the popup for the manage leads table, modal id is taken because the settingId is set to null for the onDisabledDropdownHandler which results in conflict for the popup to open and close for particular leadId
  isOpenFor12th: false,
  isOpenForDiploma: false,
  isNotUndergraduate: false,
  isActionOwnerModalShow: false,
  initialPhoneNumber: null,
  submittedFormData: null,
  getLeadsPrimaryNumber: "",
  getCreateLeadErrors: null,
  leadCaptureId: null,
  getHeaderTabIconsName: "",
  NotesData: [],
  selectedOption: {},
  ResetFormikInitialValues: () => { },
  isQuickAddFormModalOpen: false,
  isLeadsImportModalOpen: false,
  rightSectionTabname: "Activity History",
  isEditEmail: false,
  isEditPhone: false,
  getOfferAndInstallmentPayload: {},
  isUpdateModalOpen: false,
  isEnableForTwelfthInputFields: false,
  isEnableForDiplomaInputFields: false,
  isEnableForUGInputFields: false,
  getAllCheckSelectedDataFormCustomTable: [],
  isShowModalForTestAction: false,
  isHamburgerModalOpen: false,
  selectedColumnToDisplay: [
    {
      id: 0,
      name: "leadCaptureId",
      label: "Lead #",
    },
    { id: 3, name: "name", label: "Name" },
    { id: 4, name: "phone", label: "Phone" },
    { id: 5, name: "leadAlternatveNumber", label: "Alternate Numbers" },
    { id: 6, name: "academicCareerDescription", label: "Career" },
    { id: 7, name: "academicProgramDescription", label: "Program" },
  ],
  isDialogOpenForScolarship: false,
  scholarshipData: {},
  isShowModalForChangeStage: false,
  previousEnquiryPay: {
    adjustedAmount: 0,
    adjustedPercentage: 0,
  },
  isShowModalForCalling: false,
  isShowModalForDownloadPaymentPdf: false,
  paymentRecepitData: {},
  selectedRazorPayId: "",
  isShowModalForDownloadFeeAndInstallmentPdf: false,
  advanceSearchModal: false,
  selectedColumnToDisplayForAdvanceSearch: [
    {
      id: 0,
      name: "leadCaptureId",
      label: "Lead #",
    },
    { id: 3, name: "name", label: "Name" },
    { id: 4, name: "phone", label: "Phone" },
    { id: 5, name: "career", label: "Career" },
    { id: 6, name: "program", label: "Program" },
  ],
  isModalOpenForAdvanceSearchColumn: false,
  isAdvanceSearchModelColumnFlag: false,
  visibleColumns: [
    "Lead#",
    "Name",
    "Email",
    "Phone",
    "Status", // Default visible columns
  ],
  thirdpartySelectedleads: [],
  getLeadsForOverdueTask: [],
  getLeadsForManageTask: [],
  lockOfferStatus: "",
  packageDeal: "",
  oneTimeDiscount: "",
  paginatedProps: {
    pageSize: 50,
    pageNumber: 0
  },
  paginatedPropsForAdvanceSearch: {
    pageSize: 50,
    pageNumber: 0
  },
  searchQuery : "",
  whatsappMessengerModal: false
};

const uiSlice = createSlice({
  name: "ui-slice",
  initialState,
  reducers: {
    //  getting LastThreeRows Status for manage dropdown list

    onIsLastThreeRows: (state, action) => {
      state.isLastThreeRows = action.payload;
    },
    //   Dashboard Actions Toggling for Both Mobile and Desktop
    onDashboardOpenHandler: (state) => {
      state.isDashboardOpen = !state.isDashboardOpen;
    },
    onDashboardCloseHandler: (state) => {
      state.isDashboardOpen = false;
    },

    onDashboardOpenHandlerForMobile: (state) => {
      state.isDashboardOpenForMobile = !state.isDashboardOpenForMobile;
    },

    onDashboardCloseHandlerForMobile: (state) => {
      state.isDashboardOpenForMobile = false;
    },

    //  Lead Actions Toggling for Both Mobile and Desktop

    onLeadsOpenHandler: (state) => {
      state.isLeadsOpen = !state.isLeadsOpen;
    },

    onLeadsCloseHandler: (state) => {
      state.isLeadsOpen = false;
    },

    onLeadsOpenForMobileHandler: (state) => {
      state.isLeadsOpenForMobile = !state.isLeadsOpenForMobile;
    },

    onLeadsCloseForMobileHandler: (state) => {
      state.isLeadsOpenForMobile = false;
    },
    onMobileMenuOpenHandler: (state) => {
      state.isMobileMenu = !state.isMobileMenu;
    },

    onMobileMenuCloseHandler: (state) => {
      state.isMobileMenu = false;
    },

    // leads Table
    onToggleSettingData: (state) => {
      state.isSettingData = !state.isSettingData;
    },

    onDisabledSettingData: (state) => {
      state.isSettingData = false;
    },

    onToggleSubData: (state) => {
      state.isSubData = !state.isSubData;
    },

    onDisabledSubData: (state) => {
      state.isSubData = false;
    },

    //  Table Action

    onDropDownOpenHandler: (state, action) => {
      const id = action.payload;
      // Toggle the settingId
      state.settingId = state.settingId === id ? null : id;
      state.modalId = id;
    },
    onDisabledDropdownHandler: (state) => {
      state.settingId = null;
    },

    // Dropdawn conditional Rendering

    onSelectedDateRange: (state, action) => {
      state.isSelectedDateRange = action.payload;
    },

    onCustomDateChange: (state, action) => {
      state.isCustomDate = action.payload;
    },

    // Pop Up Custom

    onShowModalForActionHandler: (state) => {
      state.isActionModalShow = !state.isActionModalShow;
    },

    onShowModalForFilterHandler: (state) => {
      state.isFilterModalShow = !state.isFilterModalShow;
    },

    onDisabledModalForActionHandler: (state) => {
      state.isActionModalShow = false;
      state.isActionOwnerModalShow = false;
    },
    onDisabledModalForFilterHandler: (state) => {
      state.isFilterModalShow = false;
    },

    onGetLeadPhoneHandler: (state, action) => {
      state.leadPhone = action.payload;
    },
    // for filter count
    filterCounter: (state, action) => {
      state.filterCount = action.payload;
    },
    // for filter reset
    resetFlagHandler: (state, action) => {
      state.resetFlag = action.payload;
    },

    onToggleProfileHandler: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
    onProfileCloseHandler: (state) => {
      state.isProfileOpen = false;
    },

    //Manage Filter conditional rendering
    onManageFilterDropdownHandler: (state, action) => {
      state.isFilterDropdown = action.payload;
    },
    onToggleCardhandler: (state) => {
      state.isCardShow = !state.isCardShow;
    },
    resetToggleCardHandler: (state) => {
      state.isCardShow = false;
    },

    onToggleActiveStepHandler: (state, action) => {
      state.activeStep = action.payload;
    },
    // onToggleActiveStepHandler(state, action: PayloadAction<number|string>) {
    //   const id = action.payload;
    //   if (state.activeSteps[id]) {
    //     delete state.activeSteps[id]; // If the step is active, remove it (close it)
    //   } else {
    //     state.activeSteps[id] = true; // If the step is not active, add it (open it)
    //   }
    // },

    onSetSeedHandler: (state) => {
      state.seed = Math.random();
    },

    //reset filter

    getResetFunctionForFilter: (state, action) => {
      state.resetFilters = action.payload;
    },

    onSetErrorHandler: (state, action) => {
      state.isError = action.payload;
    },
    // isDrawerOpen
    onDrawrOpenHandler: (state) => {
      state.isDrawerOpen = true;
      document.body.classList.add("manage_scroll");
    },
    // isDrawerClose
    onDrawrCloseHandler: (state) => {
      state.isDrawerOpen = false;
      document.body.classList.remove("manage_scroll");
    },

    onDrawerOpenHandlerForTabAction: (state, action) => {
      state.isDrawerOpenForTabAction = action.payload;
    },

    // For 12th handler toggle
    onShow12thHandler: (state) => {
      state.isOpenFor12th = true;
    },

    onDisabled12thHandler: (state) => {
      state.isOpenFor12th = false;
    },

    // For Diploma handler toggle

    onShowDiplomaHandler: (state) => {
      state.isOpenForDiploma = true;
    },
    onDisabledDiplomaHandler: (state) => {
      state.isOpenForDiploma = false;
    },

    onSetUndergraduateHandler: (state) => {
      state.isNotUndergraduate = false;
    },
    ondisableUndergraduateHandler: (state) => {
      state.isNotUndergraduate = true;
    },
    onShowOwnerModalForActionHandler: (state) => {
      state.isActionOwnerModalShow = !state.isActionOwnerModalShow;
    },
    onSetInitialPhoneNumber: (state, action) => {
      state.initialPhoneNumber = action.payload;
    },

    onSetFinalDataForForm: (state, action) => {
      state.submittedFormData = action.payload;
    },
    onResetFinalDataForForm: (state) => {
      state.submittedFormData = null;
    },
    onGetLeadsPrimaryNumberHandler: (state, action) => {
      state.getLeadsPrimaryNumber = action.payload;
    },

    onGetCreateLeadErrors: (state, action) => {
      state.getCreateLeadErrors = action.payload;
    },

    onGetLeadCaptureId: (state, action) => {
      state.leadCaptureId = action.payload;
    },
    onGetHeaderTabIconsName: (state, action) => {
      state.getHeaderTabIconsName = action.payload;
    },
    //this is temporary function
    onSaveNotesData: (state, action) => {
      state.NotesData.push(action.payload);
    },
    onGetSelectedOptionForTask: (state, action) => {
      state.selectedOption = action.payload;
    },
    onResetFormikInitialValues: (state, action) => {
      state.ResetFormikInitialValues = action.payload;
    },
    onManageLeadsImportModal: (state, action) => {
      state.isLeadsImportModalOpen = action.payload;
    },
    onShowModalForQuickAddLeadForm: (state) => {
      state.isQuickAddFormModalOpen = true;
    },
    onDisableModalForQuickAddLeadForm: (state) => {
      state.isQuickAddFormModalOpen = false;
    },
    onGetRightSectionTabname: (state, action) => {
      state.rightSectionTabname = action.payload;
    },
    onToggleEditEmail: (state) => {
      state.isEditEmail = !state.isEditEmail;
    },
    onToggleEditPhone: (state) => {
      state.isEditPhone = !state.isEditPhone;
    },

    onGetLockAndOfferPayload: (state, action) => {
      state.getOfferAndInstallmentPayload = action.payload;
    },
    onSetOpenForLeadDetailsUpdateModal: (state) => {
      state.isUpdateModalOpen = true;
    },
    onSetCloseForLeadDetailsUpdateModal: (state) => {
      state.isUpdateModalOpen = false;
    },
    onSetEnableForTwefthInputFields: (state) => {
      state.isEnableForTwelfthInputFields = true;
      state.isEnableForDiplomaInputFields = false;
    },
    onSetEnableForDiplomaInputFields: (state) => {
      state.isEnableForDiplomaInputFields = true;
      state.isEnableForTwelfthInputFields = false;
    },
    onSetEnableForUGInputFields: (state) => {
      state.isEnableForUGInputFields = true;
    },
    onDisableAllInputFields: (state) => {
      state.isEnableForDiplomaInputFields = false;
      state.isEnableForTwelfthInputFields = false;
    },
    onGetAllCheckSelectedDataFormCustomTable: (state, action) => {
      state.getAllCheckSelectedDataFormCustomTable = action.payload;
    },
    onShowModalForTestAction: (state) => {
      state.isShowModalForTestAction = true;
    },
    onDisableModalForTestAction: (state) => {
      state.isShowModalForTestAction = false;
    },
    onShowModalForHamburger: (state) => {
      state.isHamburgerModalOpen = true;
    },
    onDisableModalForHamburger: (state) => {
      state.isHamburgerModalOpen = false;
    },

    onsetSelectedColumnToDisplay: (state, action) => {
      state.selectedColumnToDisplay = action.payload;
    },
    onsetSelectedColumnToDisplayForAdvanceSearch: (state, action) => {
      state.selectedColumnToDisplayForAdvanceSearch = action.payload;
    },
    onSetOpenDialogForScolarship: (state) => {
      state.isDialogOpenForScolarship = true;
    },
    onSetCloseDialogForScolarship: (state) => {
      state.isDialogOpenForScolarship = false;
    },
    onSetScholarshipData: (state, action) => {
      state.scholarshipData = action.payload;
    },

    onSetOpenModalForChangeStage: (state) => {
      state.isShowModalForChangeStage = true;
    },

    onDisableModalForChangeStage: (state) => {
      state.isShowModalForChangeStage = false;
    },

    getPreviousEnquiryPay: (state, action) => {
      state.previousEnquiryPay = action.payload;
    },
    onSetOpenModalForCalling: (state) => {
      state.isShowModalForCalling = true;
    },

    onDisableModalForCalling: (state) => {
      state.isShowModalForCalling = false;
    },
    onSetOpenModalForDownloadPaymentPdf: (state) => {
      state.isShowModalForDownloadPaymentPdf = true;
    },

    onDisableModalForDownloadPaymentPdf: (state) => {
      state.isShowModalForDownloadPaymentPdf = false;
    },
    onSetPaymentRecepitData: (state, action) => {
      state.paymentRecepitData = action.payload;
    },

    onOpenRecieveModal: (state, action) => {
      state.selectedRazorPayId = action.payload;
    },
    onDisableRecieveModal: (state) => {
      state.selectedRazorPayId = "";
    },
    onSetOpenModalForDownloadFeeAndInstallmentPdf: (state) => {
      state.isShowModalForDownloadFeeAndInstallmentPdf = true;
    },
    onToggleForAdvanceSearch: (state) => {
      state.advanceSearchModal = !state.advanceSearchModal;
    },
    onOpenModalForAdvanceSearch: (state) => {
      state.advanceSearchModal = true;
    },

    onOpenModalForAdvanceSearchColumn: (state) => {
      state.isModalOpenForAdvanceSearchColumn = true;
    },
    onCloseModalForAdvanceSearchColumn: (state) => {
      state.isModalOpenForAdvanceSearchColumn = false;
    },
    onAdvanceSearchModelFlag: (state) => {
      state.isAdvanceSearchModelColumnFlag =
        state.isAdvanceSearchModelColumnFlag ? false : true;
    },

    getThirdpartySelectedLead: (state, action) => {
      state.thirdpartySelectedleads = action.payload;
    },
    getLeadsForOverdueTask: (state, action) => {
      state.getLeadsForOverdueTask = action.payload;
    },
    getLeadsForManageTask: (state, action) => {
      state.getLeadsForManageTask = action.payload;
    },

    setLockOfferStatus: (state, action) => {
      state.lockOfferStatus = action.payload;
    },
    setPackageDeal: (state, action) => {
      state.packageDeal = action.payload;
    },
    setOneTimeDiscount: (state, action) => {
      state.oneTimeDiscount = action.payload;
    },
    setPaginatedProps: (state, action) => {
      state.paginatedProps = action.payload;
    },
    setPaginatedPropsForAdvanceSearch: (state, action) => {
      state.paginatedPropsForAdvanceSearch = action.payload;
    },
    setSearchQuery : (state, action) => {
      state.searchQuery = action.payload;
    },
    openWhatsappMessengerModal: (state) => {
      state.whatsappMessengerModal = true;
    },
    closeWhatsappMessengerModal : (state) => {
      state.whatsappMessengerModal = false;
    }
  },
});

export const {
  openWhatsappMessengerModal,
  closeWhatsappMessengerModal,
  onDashboardOpenHandler,
  onDashboardCloseHandler,
  onDashboardCloseHandlerForMobile,
  onDashboardOpenHandlerForMobile,
  onLeadsOpenHandler,
  onLeadsCloseHandler,
  onLeadsOpenForMobileHandler,
  onLeadsCloseForMobileHandler,
  onMobileMenuOpenHandler,
  onMobileMenuCloseHandler,
  onDropDownOpenHandler,
  onDisabledDropdownHandler,
  filterCounter,
  resetFlagHandler,
  onProfileCloseHandler,
  onToggleProfileHandler,
  onManageFilterDropdownHandler,
  onToggleCardhandler,
  resetToggleCardHandler,
  onToggleActiveStepHandler,
  getResetFunctionForFilter,
  onSetErrorHandler,
  onDrawrOpenHandler,
  onDrawrCloseHandler,
  onSetUndergraduateHandler,
  ondisableUndergraduateHandler,
  onShowOwnerModalForActionHandler,
  onSetInitialPhoneNumber,
  onSetFinalDataForForm,
  onResetFinalDataForForm,
  onGetCreateLeadErrors,
  onGetLeadCaptureId,
  onGetHeaderTabIconsName,
  onSaveNotesData,
  onGetSelectedOptionForTask,
  onShowModalForQuickAddLeadForm,
  onDisableModalForQuickAddLeadForm,
  onGetRightSectionTabname,
  onToggleEditPhone,
  onToggleEditEmail,
  onGetLockAndOfferPayload,
  onSetOpenForLeadDetailsUpdateModal,
  onSetCloseForLeadDetailsUpdateModal,
  onSetEnableForTwefthInputFields,
  onSetEnableForDiplomaInputFields,
  onSetEnableForUGInputFields,
  onDisableAllInputFields,
  onGetAllCheckSelectedDataFormCustomTable,
  onShowModalForTestAction,
  onDisableModalForTestAction,
  onShowModalForHamburger,
  onDisableModalForHamburger,
  onsetSelectedColumnToDisplay,
  onSetOpenDialogForScolarship,
  onSetCloseDialogForScolarship,
  onSetScholarshipData,
  onDisableModalForChangeStage,
  onSetOpenModalForChangeStage,
  getPreviousEnquiryPay,
  onSetOpenModalForCalling,
  onDisableModalForCalling,
  onSetOpenModalForDownloadPaymentPdf,
  onDisableModalForDownloadPaymentPdf,
  onSetPaymentRecepitData,
  onOpenRecieveModal,
  onDisableRecieveModal,
  onSetOpenModalForDownloadFeeAndInstallmentPdf,
  onToggleForAdvanceSearch,
  onOpenModalForAdvanceSearch,
  onsetSelectedColumnToDisplayForAdvanceSearch,
  onOpenModalForAdvanceSearchColumn,
  onCloseModalForAdvanceSearchColumn,
  onAdvanceSearchModelFlag,
  getThirdpartySelectedLead,
  getLeadsForOverdueTask,
  setLockOfferStatus,
  setPackageDeal,
  setOneTimeDiscount,
  setPaginatedProps,
  getLeadsForManageTask,
  setSearchQuery,
  setPaginatedPropsForAdvanceSearch
} = uiSlice.actions;

export const uiSliceAction = uiSlice.actions;
export default uiSlice.reducer;

// Root Name = uiSliceReducer
