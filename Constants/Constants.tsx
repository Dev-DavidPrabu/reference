export class Constants {
  static BaseURL = process && process?.env.REACT_APP_API_URL;
  static BaseURLOld = process && process?.env.REACT_APP_API_URL_OLD;
  static Ec2Url = process && process?.env.REACT_APP_EC2_URL;
  static ValyouURL = "https://devvalyousvc.mtradedemo.com";
}
export class ApiEndPoints {
  static prefundApro = "/payroll/v1/prefund/approve";
  static sessionCheck = "/security/v1/session/status?";
  static userauthentication = "/security/v1/auth/authenticate";
  static userLogOut = "/security/v1/auth/logout/user";
  static parameterList = "/reference/v1/parameter/list";
  static parameterListByModule = "/reference/v1/notification/list/module";
  static parameterUpdate = "/reference/v1/parameter/update";
  static notificationList = "/reference/v1/notification/list";
  static updateNotification = "/reference/v1/notification/update";
  static notificationChannelList = "/notification/v1/notification/channel";
  static notificationChannelUpdate = "/notification/v1/notification/channel/";
  static notificationChannellanguage = "/reference/v1/lookup/preferredlanguage";
  static notificationListByModule = "/reference/v1/notification/list/module";
  static festivePackageList = "/festivepacket/v1/package/list";
  static festivePackageDelete = "/festivepacket/v1/package/delete";
  static festivePackageSave = "/festivepacket/v1/package/save";
  static viewPrefundTransaction = "/payroll/v1/prefund/list/";
  static walletList =
    "/wallet/v1/wallettype/list/92af85f3-bc0f-4831-bf6d-956bb9402774";
  static carouselList = "/marketing/v1/carousel/list/";
  static carouselDelete = "/marketing/v1/carousel/delete/";
  static walletDelete = "/wallet/v1/wallettype/delete/";
  static walletSave = "/wallet/v1/wallettype/save";
  static userCreate = "/security/v1/user/create";
  static userUpdate = "/security/v1/user/update";
  static userList =
    "/security/v1/user/list?entityId=92af85f3-bc0f-4831-bf6d-956bb9402774";
  static userGroupList = "/security/v1/usergroup/list";
  static userGroupSave = "/security/v1/usergroup/create";
  static userGroupDelete = "/security/v1/usergroup/delete?userGroupId=";
  static userGroupUpdate = "/security/v1/usergroup/update";
  static useGroupRightList = "/security/v1/usergroup/rights/list";
  static useGroupRightUpdate = "/security/v1/usergroup/rights/update";
  static useGroupRightCreate = "/security/v1/usergroup/rights/create";
  static useGroupRightDelete =
    "/security/v1/usergroup/rights/delete/?userGroupFuncRightId=";

  static functionList = "/security/v1/function/list";
  static functionDelete =
    "/security/v1/usergroup/rights/delete?userGroupFuncRightId=";
  static prefundListBasedOnId = "/payroll/v1/prefund/list/";
  static prefundTransactionSave = "/payroll/v1/prefund/save";
  static prefundTransactionInfo = "/payroll/v1/prefund/list/";
  static prefundCompanyGetCompanyBalance =
    "/payroll/v1/prefund/getaccountbalance/";
  static bankName = "/reference/v1/maintenance/list/bank";
  static prefundCompanyUserList = "/payroll/v1/prefund/user/list";
  static prefundCompanyUserSave = "/payroll/v1/prefund/user/save";
  static prefundCompanyUserDelete = "/payroll/v1/prefund/user/delete/";
  static prefundTransactionInquiryList = "/payroll/v1/prefund/inquiry/list";
  static prefundTransactionInquiryListForAll =
    "/payroll/v1/prefund/inquiry/listForall";
  static getnationalitylistdata = "/wallet/v1/idtype/list/nationality/";
  static payrollAccountInquiryList = "/payroll/v1/company/user/list";
  static getAllCompanyList = "/payroll/v1/company/maintenance/list";
  static getAllBranchCode = "/branch/v1/branch/list";
  static addNewCompany = "/payroll/v1/company/maintenance/save";
  static deleteSelectedCompany = "/payroll/v1/company/maintenance/delete/";
  static listOfPostalCode = "/reference/v1/lookup/postalcode";
  static listOfCountry = "/reference/v1/lookup/country";
  static contentUpload = "/content/v1/content/upload";
  static userRightsList = "/security/v1/user/rights/list";
  static userRightsCreate = "/security/v1/user/rights/create";
  static userRightsUpdate = "/security/v1/user/rights/update";
  static userRightsDelete = "/security/v1/user/rights/delete?userRightId=";
  static approvalList = "/approval/v1/task/list";
  static addNewUserToTheCompany = "/payroll/v1/company/customer/save";
  static customerListBasedOnCompany = "/payroll/v1/company/customer/list/";
  static slectedCustomerInfo = "payroll/v1/company/customer/details/";
  static updateSlectedCustomerInfo = "payroll/v1/company/customer/details/";
  static idemiaScoreList =
    "/onboarding/v1/boconfiguration/idemia/scorerouting/list";
  static idemiaScoreUpdate =
    "/onboarding/v1/boconfiguration/idemia/scorerouting/save";
  static referenceDataList = "/reference/v1/maintenance/list/";
  static referenceDataDelete = "/reference/v1/maintenance/delete/";
  static referenceDataCreate = "/reference/v1/maintenance/save/";
  static idTypeList = "/onboarding/v1/boconfiguration/idtype/list";
  static idTypeSave = "/onboarding/v1/boconfiguration/idtype/save";
  static idTypeDelete = "/onboarding/v1/boconfiguration/idtype/delete/";
  static metaDataList = "/reference/v1/lookup/metadata";
  static toggleList = "/reference/v1/toggle/list/";
  static toggleUpdate = "/reference/v1/toggle/update";
  static getapproval = "/approval/v1/task/list";
  static approvalTask = "/approval/v1/task/action/APPROVE";
  static viewapprovalTaskid = "/payroll/v1/company/maintenance/";
  static taskReject = "/approval/v1/task/action/REJECT";
  static GetToggleSummaryList = "/reference/v1/toggle/list/";
  static ToggleSummaryUpdate = "/reference/v1/toggle/update";
  static GetIdemiaScoreRoutingList =
    "/onboarding/v1/boconfiguration/idemia/scorerouting/list";
  static IdemiaScoreRoutingUpdate =
    "/onboarding/v1/boconfiguration/idemia/scorerouting/save";
  static getBankList = "/onboarding/v1/boconfiguration/bank/list";
  static getVendorList = "/onboarding/v1/boconfiguration/bankvendor/list/";
  static updateBankStatus = "/onboarding/v1/boconfiguration/bank/update";
  static updateVendorStatus =
    "/onboarding/v1/boconfiguration/bankvendor/update";
  static addBank = "/onboarding/v1/boconfiguration/bankvendor/add";
  static notificationMasterList = "/notification/v1/notification/master";
  static refreshToken = "/security/v1/auth/refresh/token";
  static salaryUpload = "/payroll/v1/salary-upload/upload";
  static approvalSubmit = "/payroll/v1/salary-upload/submit";
  static salaryList = "/payroll/v1/salary-upload/list";
  static salaryBatchDetail = "/payroll/v1/salary-upload/batchdetail/";
  static transactionList = "/payroll/v1/salary-upload/transactions/";
  static deleteTransactionRecord =
    "/payroll/v1/salary-upload/transactions/update/";
  static linkAccount = "/payroll/v1/salary-upload/customer/company/save/";
  static deleteBatch = "/payroll/v1/salary-upload/batchdetail/delete";
  static getAMLcompliance = "/onboarding/v1/aml/category/list";
  static UpdateAMLcompliance = "/onboarding/v1/aml/category/edit/";
  static amlPendingCustomersList = "/onboarding/v1/list";
  static amlCustomersInfo = "/onboarding/v1/complaince/customerinfo/";
  static amlStatusUpdate = "/onboarding/v1/status/";
  static gettingLoggedInUserInfo = "/security/v1/user/details";
  static getLockedCustomerInfo = "/security/v1/staff/account/device/locked";
  static lockCustomerFilter = "/security/v1/staff/customer/locked/filter";
  static getgroupRightFullName = "/security/v1/user/details?loginId=";
  static userAccessList = "/security/v1/auth/access/list";
  static FunctionalCodeData = "/security/v1/auth/access/list";
  static unlockCustomerInfo = "/security/v1/staff/customer/unlock";
  static forcedChangePasswordInfo = "/security/v1/staff/force/change/password";
  static forgetPasswordInfo = "/security/v1/auth/mail/reset/link";
  static getLockedBackOfficeInfo = "/security/v1/staff/locked/filter";
  static unlockBackOfficeInfo = "/security/v1/staff/unlock";
  static staffDeviceLock = "/security/v1/staff/customer/lock";
  static staffLoginRegords = "/security/v1/staff/customer/login/records";
  static getKYCPendingCustomer = "/onboarding/v1/kyc/pending/list";
  static getKYCCustomerDetail = "/onboarding/v1/getall/customers/";
  static getKYCCustomerEnquiry = "/customer/v1/enquiry/customerDetail/";
  static getCustomerStatus = "/customer/v1/enquiry/status/";
  static unBlockDevice = "/security/v1/staff/customer/login/records";
  static getMobileHistoryList =
    "/security/v1/staff/customer/lock/unlock/history";
  static getDeviceHistoryList = "/security/v1/staff/device/lock/unlock/history";
  static saveCompanyUser = "/v1/company/user/save";
  static globalSettings = "/security/v1/staff/globalSetting";
  static getViewCompanyUserList = "/payroll/v1/prefund/user/list?";
  static getCompanytransactions = "/payroll/v1/prefund/transaction/list";
  static getAllAccountSummary = "/account/v1/valyou/account/list";
  static addNewAccountSummary = "/account/v1/valyou/account/create";
  static updateAccountSummary = "/account/v1/valyou/account/update";
  static getAgentGroupList = "/branch/v1/agentgroup/list";
  static agentGroupFilter = "/branch/v1/agentgroup/filter";
  static editAgentGroup = "/branch/v1/agentgroup/update";
  static createAgentGroup = "/branch/v1/agentgroup/create";
  static deleteAgentGroup = "/branch/v1/agentgroup/delete";
  static getPreOnboardingBatch = "/payroll/v1/customer/preonboarding/batch/";
  static getBatchDetails = "/payroll/v1/customer/preonboarding/batchDetails/";
  static uploadPrefundProof = "/payroll/v1/prefund/upload/receipt";
  static getBranchDashboardList = "/branch/v1/branch/list";
  static getBranchDashboardFilter = "/branch/v1/branch/filter";
  static countryListResponse = "/reference/v1/lookup/remit-country";
  static preSignedUrl =
    "https://dotptlwoki.execute-api.us-east-1.amazonaws.com/s3presignedurl-api/S3-preSigned-url?originalfilename=";
  static getBranchListResponse = "/remit/v1/bank/branch/list";
  static updateRemitBranch = "/remit/v1/bank/branch/update";
  static getBankSetupCountry = "/reference/v1/maintenance/list/country";
  static getBankSetupRecord = "/remit/v1/bank/list";
  static viewBankSetupRecord = "/remit/v1/bank/details";
  static updateBankSetupRecord = "/remit/v1/bank/update";
  static getPayGroupList = "/remit/v1/pay-group/list";
  static addBranch = "/branch/v1/branch/create";
  static getTerminalDashboardList = "/branch/v1/e-terminal/list";
  static getTerminalDashboardFilter = "/branch/v1/e-terminal/filter";
  static createTerminal = "/branch/v1/e-terminal/create";
  static terminalDeviceList = "/branch/v1/e-terminal/device/list";
  static terimnalDeactivate = "/branch/v1/e-terminal/deactivate";
  static WalletFeatureSummary =
    "/wallet/v1/walletfeature/list/walletfeaturecode";
  static AddWaletSummary = "/wallet/v1/walletfeature/save";
  static getPayoutCountryRecord = "/remit/v1/payment-method/";
  static updatePayingGroupRecords = "/remit/v1/pay-group/save";
  static updateBranch = "/branch/v1/branch/update";
  static deleteBranch = "/branch/v1/branch/delete?branchCode=";
  static cloudfrontUrlKyc = "https://d21dq0dbvsmgkn.cloudfront.net/";
  static updatePayoutCountry = "/remit/v1/payment-method/country/update";
  static addPayoutCountryRecords = "/remit/v1/payment-method/country/add";
  static getUserAccessLevel = "/security/v1/auth/access/check/";
  static getSalaryBatchList = "/payroll/v1/salary-upload/batchlist";
  static salaryCheckerRequest = "/payroll/v1/salary-upload/checker";
  static salaryFileNameValidations = "/payroll/v1/salary-upload/filename/";
  static getTransferByTransID = "/remit/v1/manage/transfer/details/fetch/";
  static getTransferList = "/remit/v1/manage/transfer/search";
  static approveStatusRemit = "/remit/v1/manage/transfer/approve";
  static approveStatusRemarkRemit = "/remit/v1/manage/transfer/approve/remarks";
  static approveStatusRemarkReject = "/remit/v1/manage/transfer/reject";
  static getChargeCode = "/fee/v1/manage/list";
  static getChargeDetails = "/fee/v1/manage/details/";
  static MarketingReportDownload =
    "/onboarding/v1/report/marketing-report/downloadreport";
  static createChargeCode = "/fee/v1/manage/save";
  static rejectTransaction = "/remit/v1/manage/transfer/reject";
  static retryTransaction = "/remit/v1/manage/transfer/retry/";
  static refundTransaction = "/remit/v1/manage/transfer/refund/";
  static addPreonboardingCustomer = "/onboarding/v1/customer/preonboarding";
  static getPaymentMethod = "/remit/v1/payment-method/";
  static onbehalfDocUrl = "http://dnfb8mn7aks6l.cloudfront.net/";
  static getFrontDoc = "/remit/v1/on-behalf/document/front/";
  static getBackDoc = "/remit/v1/on-behalf/document/back/";
  static salaryOtpRequest = "/payroll/v1/salary-upload/requestotp";
  static salaryResendOtpRequest = "/payroll/v1/salary-upload/resendotp";
  static getLimitTransactionData = "/remit/v1/manage/limit/list";
  static getBlockCardRecords = "/service-request/v1/cardblock/list";
  static approveBlockStatus = "/service-request/v1/cardblock/checker";
  static rejectBlockRequest = "";
  static updateBlockCardRequest = "";
  static addBlockCardReq = "/service-request/v1/cardblock/save/bo";
  static getUnBlockCardRecords = "/service-request/v1/unblock/list";
  static addUnBlockCardReq = "/service-request/v1/unblock/save/bo";
  static approveUnBlockStatus = "/service-request/v1/unblock/checker";
  static rejectUnBlockRequest = "";
  static getUpgradeCardRecords = "/service-request/v1/cardupgrade/list";
  static addUpgradeCardReq = "/service-request/v1/cardupgrade/save/bo";
  static getCustomerDetails = "/service-request/v1/unblock/customer/bo";
  static getCustomerDetailsUpgrade = "/customer/v1/wallet/customerdetails";
  static postblockCardRequest = "/service-request/v1/cardblock/customer/bo";
  static postunblockCardRequest = "/service-request/v1/unblock/customer/bo";
  static getCustomerEnquiryList = "/customer/v1/enquiry/list";
  static getCustomerHistory = "/customer/v1/enquiry/customer/history/";
  static getCustomerWalletHistory =
    "/service-request/v1/history/customer/wallet/";
  static updateCustomerProfile = "/customer/v1/profile/mta/edit";
  static getOpsSourceList = "/customer/v1/profile/list/ops/source";
  static getUserDetails = "/security/v1/auth/access/check/";
  static getSRFtoggleID = "/reference/v1/toggle/list";
  static getUnblockMobileNoVerify = "/service-request/v1/unblock/verify/bo";
  static getblockMobileNoVerify = "/service-request/v1/cardblock/verify/bo";
  static getAmlEcddList = "/remit/v1/aml/ecdd/list";
  static createEcddSetup = "/remit/v1/aml/ecdd/create";
  static updateOnBehalfDetails = "/remit/v1/on-behalf/update";
  static getRiskScaleList = "/remit/v1/aml/risk/riskscale/list";
  static createRiskScale = "/remit/v1/aml/risk/riskscale/add";
  static updateRiskScale = "/remit/v1/aml/risk/riskscale/update";
  static deleteRiskScale = "/remit/v1/aml/risk/riskscale/delete/";
  static getTransactionStatistics =
    "/remit/v1/aml/risk/transactionstatistics/list";
  static createTransactionStatistics =
    "/remit/v1/aml/risk/transactionstatistics/add";
  static updateTransactionStatistics =
    "/remit/v1/aml/risk/transactionstatistics/update";
  static deleteTransactionStatistics =
    "/remit/v1/aml/risk/transactionstatistics/delete/";
  static getRiskFactor = "/remit/v1/aml/risk/rfscore/list";
  static updateRiskFactor = "/remit/v1/aml/risk/rfscore/update";
  static riskFactorAndCategoryList =
    "/remit/v1/aml/risk-factor-and-category/list";
  static getRiskFactorStatusConfig = "/remit/v1/aml/risk/riskFactor/list";
  static updateRiskFactorStatus = "/remit/v1/aml/risk/factor/update-status";
  static getRiskRating = "/remit/v1/aml/risk/riskRating/list";
  static createRiskRating = "/remit/v1/aml/risk/riskRating/add";
  static updateRiskRating = "/remit/v1/aml/risk/riskRating/update";
  static deleteRiskRating = "/remit/v1/aml/risk/riskRating/delete/";
  static getExchangeRate = "/remit/v1/rates/country/payment-method/list";
  static updateExchangeRate = "/remit/v1/rates/update";
  static getHighRiskCountry = "/remit/v1/aml/risk/highriskcountries/list";
  static updateHighRiskCountry = "/remit/v1/aml/risk/highriskcountries/update";
  static updateTransactionLimit = "/remit/v1/manage/limit/update";
  static getBranchUserList = "/branch/v1/branch/list";
  static approveTerminal = "/branch/v1/e-terminal/";
  static updateTerminal = "/branch/v1/e-terminal/update";
  static terimnalActivate = "/branch/v1/e-terminal/activate";
  static mobileDashboard = "/topup/v1/topup/summary/status";
  static mobileDataFileView = "/topup/v1/topup/report/view";
  static mobileDataFileDownload = "/topup/v1/topup/report/generate";
  static mobileDashboardData = "/topup/v1/topup/summary/list";
  static onBehalfFrontImage = "/remit/v1/on-behalf/document/front";
  static onBehalfBackImage = "/remit/v1/on-behalf/document/back";
  static mobTopUpFilter = "/topup/v1/topup/summary/filter";
  static mobileTopupReprocess = "/topup/v1/jompay/transaction/adjustment";
  static mobileTopupRefund = "/topup/v1/jompay/transaction/status";
  static getIdtypeSummary = "/wallet/v1/idtype/list";
  static addIdtypeSummary = "/wallet/v1/idtype/save";
  static getIdtypeCode = "/wallet/v1/idtype/list/";
  static fpxReprocess = "/topup/v1/fpx/transaction/adjustment";
  static fpxRefundCredit = "/topup/v1/fpx/transaction/status";
  static jompayReprocess = "/topup/v1/jompay/transaction/adjustment";
  static jompayRefundCredit = "/topup/v1/jompay/transaction/status";
  static cardUpgradeWallet = "/service-request/v1/cardupgrade/wallet";
  static getOTPTemp = "/security/v1/otp/test/fetchotp";
  static deleteIdTypeSummary = "/wallet/v1/idtype/delete/";
  static getIdDocRecordsDetail = "/wallet/v1/idtype/list";
  static approveUpgrade = "/service-request/v1/cardupgrade/checker";
  static complainceCustomerInfo = "/remit/v1/aml/complaince/customerinfo";
  static addDocUploadReq = "/service-request/v1/kyc/update/bo";
  static getDocUploadRequestData = "/service-request/v1/kyc/update/list";
  static docUploadreqApproveData = "/service-request/v1/kyc/update/checker";
  static validateUserForgetMailToken = "/security/v1/auth/reset/link/validate";
  static resetForgetWithNewPassword = "/security/v1/auth/forget/password";
  static UpdateGlobalSettings = "/security/v1/staff/update/globalSetting";
  static idDocMappingList = "/wallet/v1/walletlink/idDocMapping/list";
  static idDocMappingCreate = "/wallet/v1/walletlink/idDocMapping/create";
  static idDocMappingUpdate = "/wallet/v1/walletlink/idDocMapping/update";
  static changeNewPasswordData = "/security/v1/staff/change/password";
  static changeProfileData = "/security/v1/user/profile/update";
  static updateMatchType = "/remit/v1/transfer/matchtype";
  static getWalletSizeSetupList = "/wallet/v1/accounttype/list";
  static getWalletSizeBrandMapping = "/wallet/v1/account/walletlink/list";
  static updateWalletSizeSetupList = "/wallet/v1/accounttype/update";
  static updateWalletSizeBrandMapping = "/wallet/v1/account/walletlink/update";
  static getWalletFeatureCode =
    "/wallet/v1/walletfeature/list/walletfeaturecode";
  static getCardType = "/wallet/v1/cardsetup/cardtype/list";
  static getCardPromoCode = "/wallet/v1/cardsetup/promocode/list";
  static getcardSourceCode = "/wallet/v1/cardsetup/sourcecode/list";
  static getCardTypePromoCode = "/wallet/v1/cardsetup/cardpromocode/list/";
  static getCardSourcePromo = "/wallet/v1/cardsetup/cardlinkage/list";
  static auditConfirmMatch = "/remit/v1/aml/audit/confirm-match/";
  static getDocuploadReqDetails = "/service-request/v1/kyc/history/updateId";
  static getNationalityOnboarding = "/reference/v1/lookup/nationality";
  static getLanguageOnboarding = "/reference/v1/lookup/preferredlanguage";
  static getRaceOnboarding = "/reference/v1/lookup/race";
  static getKycExpiryDownGradeList = "/customer/v1/kycexpiry/downgrade/bydate";
  static getKycBlockAfterGraceList = "/customer/v1/kycexpiry/block/bydate";
  static getRemitAMLCompliance = "/remit/v1/aml/category/list";
  static updateRemitAMLCompliance = "/remit/v1/aml/category/edit/";
  static getIDExpiringReports =
    "/customer/v1/kycexpiry/idexpiry/generatereport";
  static getIdtypeCodeList = "/wallet/v1/idtype/list/nationality/";
  static idExpiringDownloadData =
    "/customer/v1/kycexpiry/idexpiry/downloadreport";
  static docUpload = "/service-request/v1/s3/save/iddocument";
  static mobileVerify = "/service-request/v1/cardupgrade/verify";
  static getAllTargetGroupList = "/remit/v1/targetgroup/list";
  static createTargetGroupByCustomers =
    "/remit/v1/targetgroup/customers/create";
  static getAllTargetGroupByCustomers = "/remit/v1/targetgroup/customers/list/";
  static updateTargetGroupByCustomers =
    "/remit/v1/targetgroup/customerGroup/update";
  static createTargetGroupByPaymentMethod =
    "/remit/v1/targetgroup/paymentMethod/create";
  static getAllTargetGroupByPaymentMethod =
    "/remit/v1/targetgroup/paymentMethod/list/";
  static updateTargetGroupByPaymentMethod =
    "/remit/v1/targetgroup/paymentMethodGroup/update";
  static deleteTargetGroup = "/remit/v1/targetgroup/delete/";
  static deleteTargetGroupByCustomers =
    "/remit/v1/targetgroup/customers/delete/";
  static deleteTargetGroupByPaymentMethod =
    "/remit/v1/targetgroup/paymentMethod/delete/";
  static getPromoCodeList = "/remit/v1/promocode/list";
  static createPromoCodeSetup = "/remit/v1/promocode/user/add";
  static updatePromoCodeSetup = "/remit/v1/promocode/user/update";
  static deletePromoCodeSetup = "/remit/v1/promocode/remove/";
  static getUnblockApprovalReport =
    "/service-request/v1/unblock/generatereport";
  static downloadUnblockReport = "/service-request/v1/unblock/downloadreport";
  static getCardBlockReports = "/service-request/v1/cardblock/generatereport";
  static cardBlockDownloadPdf = "/service-request/v1/cardblock/downloadreport";
  static kycUpdateReports = "/service-request/v1/kyc/generatereport";
  static kycUpdateDownloadReport = "/service-request/v1/kyc/downloadreport";
  static cardUpgradeReports = "/service-request/v1/cardupgrade/generatereport";
  static cardUpgradeDownloadReports =
    "/service-request/v1/cardupgrade/downloadreport";
  static customerLoginReports =
    "/security/v1/report/customer-login/generatereport";
  static customerLoginDownloadReport =
    "/security/v1/report/customer-login/downloadreport";
  static auditTrialDownloadReport =
    "/audit/v1/report/audit-trial-report/downloadreport";
  static auditTrialReportModule = "/audit/v1/module";
  static auditTrialReportFunction = "/audit/v1/function";
  static UamUserReports = "/security/v1/report/uam-report/generatereport";
  static UamDownlaodReports = "/security/v1/report/uam-report/downloadreport";
  static WalletLinkList = "/wallet/v1/walletlink/accounts/";
  static DailyTransactionReports =
    "/remit/v1/report/dailytransaction/generatereport";
  static DailyTransactionDownloadReports =
    "/remit/v1/report/dailytransaction/downloadreport";
  static BranchManagementReports = "/branch/v1/branch/generatereport";
  static BranchManagementDownloadReports = "/branch/v1/branch/downloadreport";
  static FailedTransactionReports =
    "/remit/v1/report/failedtransaction/generatereport";
  static FailedTransactionDownloadReports =
    "/remit/v1/report/failedtransaction/downloadreport";
  static OnBehalfSenderReport =
    "/remit/v1/report/onbehalfsender/generatereport";
  static OnBehalfSenderDownloadReports =
    "/remit/v1/report/onbehalfsender/downloadreport";
  static MonthlyTransactionReport =
    "/remit/v1/report/monthlytransaction/generatereport";
  static MonthlyTransactionDownloadReports =
    "/remit/v1/report/monthlytransaction/downloadreport";
  static RefundTransactionReport =
    "/remit/v1/report/refundtransaction/generatereport";
  static RefundTransactionDownloadReport =
    "/remit/v1/report/refundtransaction/downloadreport";
  static RejectedTransactionReports =
    "/remit/v1/report/rejectedtransaction/generatereport";
  static RejectedTransactionDownloadReports =
    "/remit/v1/report/rejectedtransaction/downloadreport";
  static TransactionSummaryReport =
    "/remit/v1/report/transactionsummary/generatereport";
  static TransactionSummaryDownloadReport =
    "/remit/v1/report/transactionsummary/downloadreport";
  static MirsDeclinedTransactionReports =
    "/remit/v1/report/mirs-declined-transaction/generatereport";
  static MirsDeclinedTransactionDownload =
    "/remit/v1/report/mirs-declined-transaction/downloadreport";
  static ECDDAmlReport = "/remit/v1/report/aml/ecdd/generatereport";
  static ECDDAmlReportDownload = "/remit/v1/report/aml/ecdd/downloadreport";
  static AMLTxnSummaryReport =
    "/remit/v1/report/aml/transactionreport/generatereport";
  static AMLTxnSummaryDownloadReport =
    "/remit/v1/report/aml/transactionreport/downloadreport";
  static CustomerRiskProfilingReport =
    "/remit/v1/report/customer-risk-profiling/generatereport";
  static CustomerRiskProfilingReportDownload =
    "/remit/v1/report/customer-risk-profiling/downloadreport";
  static AMLCFTReports = "/remit/v1/report/amlcft/generatereport";
  static AMLCFTReportsDownload = "/remit/v1/report/amlcft/downloadreport";
  static MsslTrackerListReport =
    "/onboarding/v1/report/mssl-list-report/generatereport";
  static MsslTrackerListDownload =
    "/onboarding/v1/report/mssl-list-report/downloadreport";
  static OnboardingDetailReport =
    "/onboarding/v1/report/onboarding-detail-report/generatereport";
  static OnboardingDetailsReportDownload =
    "/onboarding/v1/report/onboarding-detail-report/downloadreport";
  static OnboardingSummaryReport =
    "/onboarding/v1/report/onboarding-summary-report/generatereport";
  static OnboardingSummaryReportDownload =
    "/onboarding/v1/report/onboarding-summary-report/downloadreport";
  static GroupNameSummaryReport =
    "/onboarding/v1/report/group-name-summary-report/generatereport";
  static GroupNameSummaryReportDownload =
    "/onboarding/v1/report/group-name-summary-report/downloadreport";
  static MaintenanceListReport =
    "/customer/v1/report/maintenance-list-report/generatereport";
  static MaintenanceListReportDownload =
    "/customer/v1/report/maintenance-list-report/downloadreport";
  static PayrollCompanyCreationReport =
    "/payroll/v1/report/companycreation/generatereport";
  static PayrollCompanyCreationDownload =
    "/payroll/v1/report/companycreation/downloadreport";
  static ReconciliationReport =
    "/payroll/v1/report/prefundreconciliation/generatereport";
  static ReconciliationReportDownload =
    "/payroll/v1/report/prefundreconciliation/downloadreport";
  static PayrollTxnSummaryReport =
    "/payroll/v1/report/transactionsummary/generatereport";
  static PayrollTxnSummaryReportDownload =
    "/payroll/v1/report/transactionsummary/downloadreport";
  static PrefundDebitReport =
    "/payroll/v1/report/prefund-debit-report/generatereport";
  static PrefundDebitReportDownload =
    "/payroll/v1/report/prefund-debit-report/downloadreport";
  static PrefundCreditReport =
    "/payroll/v1/report/prefund-credit-report/generatereport";
  static PrefundCreditReportDownload =
    "/payroll/v1/report/prefund-credit-report/downloadreport";
  static TopupReconciliationReport =
    "/payroll/v1/report/topup-reconciliation-report/generatereport";
  static TopupReconciliationReportDownload =
    "/payroll/v1/report/topup-reconciliation-report/downloadreport";
  static PrefundAmountReport =
    "/payroll/v1/report/prefund-amount/generatereport";
  static PrefundAmountDownloadReport =
    "/payroll/v1/report/prefund-amount/downloadreport";
  static PayrollTxnDetailReport =
    "/payroll/v1/report/payroll-transaction-detail-report/generatereport";
  static PayrollTxnDetailDownloadReport =
    "/payroll/v1/report/payroll-transaction-detail-report/downloadreport";
  static CustomerScreeningReport =
    "/onboarding/v1/report/customer-screening-report/generatereport";
  static CustomerScreeningDownloadReport =
    "/onboarding/v1/report/customer-screening-report/downloadreport";
  static SalesReport = "/onboarding/v1/report/sales-report/generatereport";
  static MarketingReport =
    "/onboarding/v1/report/marketing-report/generatereport";
  static SalesReportDownload =
    "/onboarding/v1/report/sales-report/downloadreport";
  static FunctionalCode = "/security/v1/function/list";
  static PrefundBalanceByCompany =
    "/payroll/v1/report/prefund-balance-by-company/generatereport";
  static PrefundBalanceByCompanyDownload =
    "/payroll/v1/report/prefund-balance-by-company/downloadreport";
  static SmsTransactionReport =
    "/security/v1/report/sms-transaction-report/generatereport";
  static SmsTransactionReportDownload =
    "/security/v1/report/sms-transaction-report/downloadreport";
  static PayrollTxnByCompany =
    "/payroll/v1/report/transaction-by-company/generatereport";
  static PayrollTxnByCompanyDownload =
    "/payroll/v1/report/transaction-by-company/downloadreport";
  static FunctionalCodeADD = "/security/v1/function/create";
  static FunctionalCodeEdit = "/security/v1/function/update";
  static FunctionCodeDelete = "/security/v1/function/delete";
  static TxnScreenReport =
    "/remit/v1/report/aml/transaction-screening/generatereport";
  static TxnScreenReportDownload =
    "/remit/v1/report/aml/transaction-screening/downloadreport";
  static ResponseMessage = "/service-request/v1/cardblock/checker";
  static AvgMonthlyTxnReport =
    "/remit/v1/report/avg-monthly-transaction-report/generatereport";
  static AvgMonthlyTxnReportDownload =
    "/remit/v1/report/avg-monthly-transaction-report/downloadreport";
  static UnblockResponseMessage = "/service-request/v1/unblock/checker";
  static WalletFeatureDelete = "/wallet/v1/walletfeature/delete/";
  static WalletDowngradeReport =
    "/service-request/v1/report/wallet-downgrade/generatereport";
  static WalletDowngradeReportDownload =
    "/service-request/v1/report/wallet-downgrade/downloadreport";
  static TransactionHistoryReport =
    "/payroll/v1/report/transaction-history-report/generatereport";
  static TransactionHistoryReportDownload =
    "/payroll/v1/report/transaction-history-report/downloadreport";
  static TopUpCommonReport =
    "/topup/v1/report/topup-common-report/generatereport";
  static TopUpCommonReportDownload =
    "/topup/v1/report/topup-common-report/downloadreport";
  static LanguageParameterGet = "/wallet/v1/translation/list/language";
  static LanguageParameterAdd = "/wallet/v1/translation/add/content";
  static LanguageParameterView = "/wallet/v1/translation/view/language";
  static LanguageParameterEdit = "/wallet/v1/translation/update/language";
  static Language = "/reference/v1/lookup/preferredlanguage";
  static TranslateLanguage = "/wallet/v1/translation/cloud/translate";
  static PayrollPrefundCompanyUser = "/payroll/v1/prefund/list/company/user";
  static PayrollPrefundStaff = "/payroll/v1/prefund/list/mta/user";
  static PayrollPrefundPost = "/payroll/v1/manual/txn/save";

  static payrollPrefundCompanyList =
    "/payroll/v1/prefund/list/company/pending/";

  static addLanguageParameters = "/wallet/v1/translation/add/content ";

  static manualDebitCreditSummaryList = "/payroll/v1/manual/txn/list";
  static createManualDebitCredit = "/payroll/v1/manual/txn/save";
  static updateManualDebitCredit = "/payroll/v1/manual/txn/save";
  static debitcreditcompanyList = "/payroll/v1/manual/txn/company/list/";
  static approvePath = "/payroll/v1/prefund/approve";
  static manualDebit = "/payroll/v1/manual/txn/approve";
}

export class ToastMessgae {
  static SuccessUpdate = "User Updated Successfully!";
  static FailUpdate = "User Update Failed!";
  static SuccessCreate = "User Created Successfully";
  static FailCreate = "Add User Failed!";
  static SuccessDelete = "User Deleted Successfully!";
  static FailDelete = "User Delete Failed!";
}

export class ErrorMessage {
  static SELECT_ONE_MATCH = "Select one Match for Confirm Match";
}

export class Utils {
  static statusList = ["ACTIVE", "INACTIVE"];
  static txnStatus = ["SUBMITTED", "PROCESSING", "CANCELLED", "COMPLETED"];
  static remitStatus = [
    "INITIATED",
    "IN_PROCESS",
    "ON_HOLD",
    "CANCELLED",
    "PAID",
  ];
  static yesOrno = ["YES", "NO"];
  static race = ["Bumiputra", "Chinese", "Indian", "Others"];
  static language = ["Malay", "Chinese", "English", "Others"];
  static nationality = ["India", "Malaysiya", "China"];
}

//**********______________Valyou Endpoints____________************
export class ValyouEndPoints {
  static merchantSummaryList = "/valyou-merchant/v1/merchant/hq/summary";
  static merchantBranchSummaryList =
    "/valyou-merchant/v1/merchant/branch/summary";
  static merchantTellerSummaryList =
    "/valyou-merchant/v1/merchant/teller/summary";
  static createMerchant = "/valyou-merchant/v1/merchant/hq/create";
  static updateMerchant = "/valyou-merchant/v1/merchant/hq/update";
  static createMerchantBranch = "/valyou-merchant/v1/merchant/branch/create";
  static updateMerchantBranch = "/valyou-merchant/v1/merchant/branch/update";
  static createMerchantTeller = "/valyou-merchant/v1/merchant/teller/create";
  static updateMerchantTeller = "/valyou-merchant/v1/merchant/teller/update";
}
