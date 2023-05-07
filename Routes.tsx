import UserDetails from "./Views/User/UserDetails";
import Login from "./Components/Login/Login";
import IdtypeRouting from "./Views/IdTypeRouting/IdTypeRouting";
import IdTypeCreate from "./Views/IdTypeRoutingCreate/IdTypeCreate";
import IdTypeEdit from "./Views/IdTypeRoutingEdit/IdTypeEdit";
import ReferenceData from "./Views/ReferenceData/ReferenceData";
import ReferenceDataCreate from "./Views/ReferenceDataCreate/ReferenceDataCreate";
import ReferenceDataEdit from "./Views/ReferenceDataEdit/ReferenceDataEdit";
import ReferenceDataView from "./Views/ReferenceDataView/ReferenceDataView";
import GroupRights from "./Views/GroupsRights/GroupRights";
import UserGroups from "./Views/UserGroup/UserGroups";
import CreateUserGroup from "./Components/UserGroupCreate/CreateUser";
import AccountTransaction from "./Views/AccountTransaction/AccountTransaction";
import PrefundTransactionEnquiry from "./Views/PrefundTransactionEnquiry/PrefundTransactionEnquiry";
import PrefundAccountEnquiry from "./Views/PrefundAccountEnquiry/PrefundAccountEnquiry";
import PayrollAccountView from "./Components/PrefundAccountEnquiry/PrefundAccountView";
import PayrollEnquirey from "./Views/PayrollEnquirey/PayrollEnquiry";
import ToggleSummaryEdit from "./Views/ToggleSummaryEdit/ToggleSummaryEdit";
import CompanyMaintenanceScreen from "./Views/CompanyMaintenanceScreen/CompanyMaintenanceScreen";
import Home from "./Views/Home/Home";
import AddCompanyMainteanance from "./Components/AddCompanyMaintenance/AddCompanyMaintenance";
import PreFundProcessing from "./Views/PreFundProcessing/PreFundProcessing";
import RemitCountrySetup from "./Views/RemitCountrySetup/RemitCountrySetup";
import RemitCountryForm from "./Views/RemitCountrySetup/RemitCountryForm";
import RemitBankSetup from "./Views/RemitBankSetup/RemitBankSetup";
import UserRights from "./Views/UserRight/UserRights";
import TopUpBatchDetails from "./Views/TopUpBatchDetails/TopUpBatchDetails";
import RemitBankForm from "./Views/RemitBankSetup/RemitBankForm";
import RemitAgentTag from "./Views/RemitAgentTag/RemitAgentTag";
import RemitAgentTagForm from "./Views/RemitAgentTag/RemitAgentTagForm";
import TopUpAdd from "./Views/TopUpAdd/TopUpAdd";
import AmlPendingCustomers from "./Views/AmlPendingCustomers/AmlPendingCustomers";
import RemitBranchSetup from "./Views/RemitBranchSetup/RemitBranchSetup";
import RemitBranchForm from "./Views/RemitBranchSetup/RemitBranchForm";
import LockedCustomer from "./Views/LockedCustomer/LockedCustomer";
import LockedBackOfficeUser from "./Views/LockedBackOfficeUser/LockedBackOfficeUser";
import AmlCustomerInfo from "./Views/AmlCustomerInfo/AmlCustomerInfo";
import AddNewBlocking from "./Views/DeviceManagement/AddNewBlocking";
import BlockNumberDevice from "./Views/DeviceManagement/BlockNumberDevice";
import ResetPassword from "./Components/Login/ResetPassword";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { RiUserLocationFill, RiUserSettingsFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import AddNewCompanyUser from "./Components/AddNewCompanyUser/AddNewCompanyUser";
import AddCompanyUser from "./Components/AddNewCompanyUser/AddCompanyUser";
import UserLoginRecords from "./Views/UserLoginRecords/UserLoginRecords";
import eKYCPendingCustomer from "./Views/eKYCPendingCustomer/eKYCPendingCustomer";
import KYCPendingCustomer from "./Views/KYCPendingCustomer/KYCPendingCustomer";
import KYCViewCustomerProfile from "./Views/KYCViewCustomerProfile/KYCViewCustomerProfile";
import KYCDocumentDetails from "./Views/KYCDocumentDetails/KYCDocumentDetails";
import UnLockDevice from "./Views/UnLockDeviceManagement/UnLockDevice";
import Account from "./Views/Account/Account";
import DeviceMobileHistory from "./Views/DeviceMobileHistory/DeviceMobileHistory";
import GlobalSettings from "./Views/GlobalSettings/GlobalSettings";
import AddCompanyUserList from "./Components/AddCompanyUserList/AddCompanyUserList";
import CompanyUserScreenList from "./Views/CompanyUserScreen/CompanyUserScreenList";

import CompanyPayrollAccountEnquiry from "./Views/CompanyPayrollAccountEnquiry/CompanyPayrollAccountEnquiry";
import LockedDeviceHistory from "./Views/LockedDeviceHistory/LockedDeviceHistory";
import GlobalSettingsDevice from "./Views/GlobalSettingsDevice/GlobalSettingsDevice";
import ViewCompanyUserList from "./Components/ViewCompanyUserList/ViewCompanyUserList";
import ViewCompanyUserAdd from "./Components/ViewCompanyUserAdd/ViewCompanyUserAdd";

import PreOnboarding from "./Views/PreOnBoading/PreOnBoarding";
import PreOnBoardingCustomer from "./Views/PreOnBoading/PreOnBoardingCustomer/PreOnBoardingCustomer";
import AddOnboardingCustomer from "./Views/PreOnBoading/AddOnboardingCustomer/AddOnboardingCustomer";
import OnboardingBulkCustomer from "./Views/PreOnBoading/AddOnboardingCustomer/OnboardingBulkCustomer";
import BranchDashboard from "./Views/BranchDashboard/BranchDashboard";
import AddBranch from "./Components/AddBranch/AddBranch";
import TerminalDashboard from "./Views/TerminalDashboard/TerminalDashboard";
import AgentGroup from "./Views/AgentGroup/AgentGroup";
import AddETerminal from "../src/Components/AddETerminal/AddETerminal";
import AddAgentGroup from "./Views/AddAgentGroup/AddAgentGroup";
import EditAgentGroup from "./Views/AddAgentGroup/EditAgentGroup";
import BankPaymentGatewayMapping from "./Views/BankPaymentGatewayMapping/BankPaymentGatewayMapping";
import AddBank from "./Views/AddBank/AddBank";
import ViewBankMenu from "./Views/ViewBankMenu/ViewBankMenu";
import NotificationMasterSetup from "./Views/NotificationMasterSetup/NotificationMasterSetup";
import NotificationMasterForm from "./Views/NotificationMasterSetup/NotificationMasterForm";
import NotificationChannelSetup from "./Views/NotificationChannelSetup/NotificationChannelSetup";
import NotificationChannelView from "./Views/NotificationChannelSetup/NotificationChannelView";
import NotificationChannelEdit from "./Views/NotificationChannelSetup/NotificationChannelEdit";
import RemitTransactionProcessing from "./Views/RemitTransactionProcessing/RemitTransactionProcessing";
import RemitTransactionEnquiry from "./Views/RemitTransactionEnquiry/RemitTransactionEnquiry";
import RemitEditOnBehalf from "./Views/RemitTransactionEnquiry/RemitEditOnBehalf";
import RemitTransactionStatusDashboard from "./Views/RemitTransactionStatusDashboard/RemitTransactionStatusDashboard";
import RemitTransactionStatus from "./Views/RemitTransactionStatus/RemitTransactionStatus";
import RemittanceFeesAndCharges from "./Views/RemittanceFeesAndCharges/RemittanceFeesAndCharges";
import BlockCardRequest from "./Views/BlockCardRequest/BlockCardRequest";
import AddBlockCardRequest from "./Components/AddBlockCardRequest/AddBlockCardRequest";
import ToggleSummary from "./Views/ToggleSummary/ToggleSummary";
import CommonEditSummary from "./Components/EditSummary/CommonEditSummary";
import NotificationSummary from "./Views/NotificationSummary/NotificationSummary";
import ParameterSummary from "./Views/ParameterSummary/ParameterSummary";
import BlockCardRequestViewDetail from "./Components/BlockCardRequestViewDetail/BlockCardRequestViewDetail";
import AMLcompliance from "./Views/AMLcompliance/AMLcompliance";
import RemitTransactionLimit from "./Views/RemitTransactionLimit/RemitTransactionLimit";
import CardReplacement from "./Views/CardReplacement/CardReplacement";
import ViewCardReplacement from "./Components/ViewCardReplacement/ViewCardReplacement";
import AddCardReplacement from "./Components/AddCardReplacement/AddCardReplacement";
import CardUnblock from "./Views/CardUnblock/CardUnblock";
import CardUnblockView from "./Components/CradUnblockView/CardUnblockView";
import AddCardUnblock from "./Components/AddCardUnblock/AddCardUnblock";
import CardUpgrade from "./Views/CardUpgrade/CardUpgrade";
import CardUpgradeView from "./Components/CardUpgradeView/CardUpgradeView";
import AddCardUpgrade from "./Components/AddCardUpgrade/AddCardUpgrade";
import AddETerminalScreen from "./Components/AddETerminalScreen/AddETerminalScreen";
import RemittanceAddLimit from "./Views/RemitTransactionLimit/AddTransactionLimit";
import TopUpRejectionReport from "./Views/TopUpRejectionReport/TopUpRejectionReport";
import RemitOnBehalfSetup from "./Views/RemitTransactionEnquiry/RemitOnbehalfSetup";
import MobileTopUpSummary from "./Views/MobileTopUpSummary/MobileTopUpSummary";
import MobileTopUpView from "./Views/MobileTopUpView/MobileTopUpView";
import AmlEcddSetup from "./Views/AmlEcddSetup/AmlEcddSetup";
import AmlRiskScale from "./Views/AmlRiskScale/AmlRiskScale";
import AddAmlRiskScale from "./Views/AddAmlRiskScale/AddAmlRiskScale";
import EditAmlRiskScale from "./Views/AddAmlRiskScale/EditAmlRiskScale";
import AmlTransactionStatistics from "./Views/AmlTransactionStatistics/AmlTransactionStatistics";
import AddTransactionStatistic from "./Views/AddTransactionStatistic/AddTransactionStatistic";
import EditTransactionStatistic from "./Views/AddTransactionStatistic/EditTransactionStatistic";
import DocUploadRequest from "./Views/DocUploadRequest/DocUploadRequest";
import DocUploadRequestView from "./Components/DocUploadRequestAdd/DocUploadRequestView";
import DocUploadRequestAdd from "./Components/DocUploadRequestAdd/DocUploadRequestAdd";
import RemitRiskFactor from "./Views/RemitRiskFactor/RemitRiskFactor";
import EditRemitRiskFactor from "./Views/EditRemitRiskFactor/EditRemitRiskFactor";
import RemitRiskFactorStatusConfiguration from "./Views/RemitRiskFactorStatusConfiguration/RemitRiskFactorStatusConfiguration";
import MobileTopupSummaryTable from "./Views/MobileTopUpSummary/MobileTopupSummaryTable";
import RemitRiskRating from "./Views/RemitRiskRating/RemitRiskRating";
import AddRemitRiskRating from "./Views/AddRemitRiskRating/AddRemitRiskRating";
import EditRemitRiskRating from "./Views/AddRemitRiskRating/EditRemitRiskRating";
import RemitHighRiskCountry from "./Views/RemitHighRiskCountry/RemitHighRiskCountry";
import IdTypeSummary from "./Views/IdTypeSummary/IdTypeSummary";
import AddIdtypeSummary from "./Components/AddIdtypeSummary/AddIdtypeSummary";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import KYCCustomerEnquiry from "./Views/CustomerEnquiry/CustomerEnquiry";
import KYCCustomerEnquiryView from "./Views/CustomerEnquiryView/CustomerEnquiryView";
import OTPTempTable from "./Views/OTPTempTable/OTPTempTable";
import IdDocMapping from "./Views/IdDocMapping/IdDocMapping";
import AddIdDocMapping from "./Views/AddIdDocMapping/AddIdDocMapping";
import EditIdDocMapping from "./Views/AddIdDocMapping/EditIdDocMapping";
import UpdateProfile from "./Views/UpdateProfile/UpdateProfile";
import ProfileImgChange from "./Views/UpdateProfile/ProfileImgChange";
import WalletSizeSetup from "./Views/WalletSizeSetup/WalletSizeSetup";
import WalletSizeBrandMapping from "./Views/WalletSizeBrandMapping/WalletSizeBrandMapping";
import EditWalletSizeSetup from "./Components/EditWalletSizeSetup/EditWalletSizeSetup";
import EditWalletSizeBrandMapping from "./Components/EditWalletSizeBrandMapping/EditWalletSizeBrandMapping";
import CardType from "./Views/CardType/CardType";
import CardSourceCode from "./Views/CardSourceCode/CardSourceCode";
import CardPromoCode from "./Views/CardPromoCode/CardPromoCode";
import ExpairyWalletDowngrade from "./Views/KycExpairyWallet/KycExpairyWalletDowngrade";
import KycBlockAfterGrace from "./Views/KycBlockAfterGrace/KycBlockAfterGrace";
import CardSourcePromoLinkage from "./Views/CardSourcePromoLinkage/CardSourcePromoLinkage";
import IdExpiringReports from "./Views/IdExpiringReports/IdExpiringReports";
import RemitAMLComplianceConfig from "./Views/RemitAMLComplianceConfig/RemitAMLComplianceConfig";
import BlockCardPending from "./Views/BlockCardPending/BlockCardPending";
import BlockCardApproved from "./Views/BlockCardApproved/BlockCardApproved";
import BlockCardRejected from "./Views/BlockCardRejected/BlockCardRejected";
import BlockCardError from "./Views/BlockCardError/BlockCardError";
import TargetGroup from "./Views/TargetGroup/TargetGroup";
import AddTargetGroupByCustomers from "./Views/AddTargetGroup/AddTargetGroupByCustomers";
import EditTargetGroupByCustomers from "./Views/EditTargetGroup/EditTargetGroupByCustomers";
import UnBlockCardPending from "./Views/UnblockCardPending/UnblockCardPending";
import UnBlockCardApproved from "./Views/UnblockCardApproved/UnblockCardApproved";
import UnblockCardRejected from "./Views/UnBlockCardRejected/UnblockCardRejected";
import UnblockCardError from "./Views/UnblockCardError/UnblockCardError";
import KYCUpdatePending from "./Views/KYCUpdatePending/KYCUpdatePending";
import KYCUpdateApproved from "./Views/KYCUpdateCardApproved/KYCUpdateApproved";
import KYCUpdateRejected from "./Views/KYCUpdateCardRejected/KYCUpdateRejected";
import KYCUpdateError from "./Views/KYCUpdateCardError/KYCUpdateError";
import WalletPending from "./Views/WalletUpgradePending/WalletPending";
import WalletApproved from "./Views/WalletUpgradeApproved/WalletApproved";
import WalletRejected from "./Views/WalletUpgradeRejected/WalletRejected";
import WalletError from "./Views/WalletUpgradeError/WalletError";
import DailyTransactionReport from "./Views/DailyTranscationReport/DailyTranscationReport";
import MonthlyTransactionReport from "./Views/MonthlyTransactionReport/MonthlyTransactionReport";
import RefundTransactionReport from "./Views/RefundTransactionReport/RefundTransactionReport";
import OnBehalfSenderReport from "./Views/OnBehalfSenderReport/OnBehalfSenderReport";
import UAMreport from "./Views/UAMreport/UAMreport";
import MIRSDeclinedTransactionReport from "./Views/MIRSDeclinedTransactionReport/MIRSDeclinedTransactionReport";
import RejectedTransactionReport from "./Views/RejectedTransactionReport/RejectedTransactionReport";
import TransactionSummaryReport from "./Views/TransactionSummaryReport/TransactionSummaryReport";
import EndofDayReport from "./Views/EndOfDayReport/EndofDayReport";
import FailedTxnReport from "./Views/FailedTxnReport/FailedTxnReport";
import BranchManagementReport from "./Views/BranchManagementReport/BranchManagementReport";
import CustomerLoginReport from "./Views/CustomerLoginReport/CustomerLoginReport";
import AMLCFTReports from "./Views/AMLCFTReports/AMLCFTReports";
import CustomerRiskProfilingReport from "./Views/CustomerRiskProfilingReport/CustomerRiskProfilingReport";
import ECDDReport from "./Views/ECDDReport/ECDDReport";
import CustomerRiskSummaryReport from "./Views/CustomerRiskSummaryReport/CustomerRiskSummaryReport";
import CustomerEnquiryEdit from "./Views/CustomerEnquiryEdit/CustomerEnquiryEdit";
import CustomerEnquiryHistory from "./Views/CustomerEnquiryHistory/CustomerEnquiryHistory";
import CustomerWalletHistory from "./Views/CustomerEnquiryHistory/CustomerWalletHistory";
import OnBoardingSummaryReport from "./Views/OnboardingSummaryReport/OnboardingSummaryReport";
import OnBoardingDetailReport from "./Views/OnboardingDetailsReport/OnboardingDetailsReport";
import MSSLTrackerListReport from "./Views/MSSLTrackerListReport/MSSLTrackerListReport";
import GroupNameSummaryReport from "./Views/GroupNameSummaryReport/GroupNameSummaryReport";
import MaintenanceListReport from "./Views/MaintenanceListReport/MaintenanceListReport";
import PromoCodeSummary from "./Views/PromoCodeSummary/PromoCodeSummary";
import AddPromoCode from "./Views/AddPromoCode/AddPromoCode";
import AddPromoCodeSetup from "./Views/AddPromoCode/AddPromoCodeSetup";
import AMLTransactionSummaryReport from "./Views/AMLTxnSummaryReport/AMLTransactionSummaryReport";
import PayrollComapanyCreation from "./Views/PayrollCompanyCreation/PayrollCompanyCreation";
import TopupReconciliationReport from "./Views/TopupReconciliationReport/TopupReconciliationReport";
import PrefundReconciliationReports from "./Views/PrefundReconciliationReport/PrefundReconciliationReport";
import PayrollSummaryReport from "./Views/PayrollSummaryReport/PayrollSummaryReport";
import PayrollDetailReport from "./Views/PayrollDetailReport​/PayrollDetailReport​";
import PrefundAmountReport from "./Views/PrefundAmountReport/PrefundAmountReport";
import PrefundDebitReport from "./Views/PrefundDebitReport​/PrefundDebitReport​";
import PrefundCreditReport from "./Views/PrefundCreditReport​/PrefundCreditReport​";
import EditPromoCodeSetup from "./Views/AddPromoCode/EditPromoCodeSetup";
import ViewPromoCode from "./Views/AddPromoCode/ViewPromoCode";
import ExchangeRate from "./Views/ExchangeRate/ExchangeRate";
import ValyouSRHCT from "./Views/ValyouSRHCT/ValyouSRHCT";
import AccountSummary from "./Views/AccountSummary/AccountSummary";
import AddAccount from "./Views/AddAccountSummary/AddAccount";
import ViewAccount from "./Views/ViewAccountSummary/ViewAccount";
import EditAccount from "./Views/EditAccountSummary/EditAccount";
import AuditTrialReport from "./Views/AuditTrial/AuditTrialreport";
import AddWalletFeature from "./Views/AddWalletFeature/AddWalletFeature";
import EditWalletFeature from "./Views/AddWalletFeature/EditWalletFeature";
import WalletFeatureSummary from "./Views/WalletFeatureSummary/WalletFeatureSummary";
import CustomerscreenReport from "./Views/CustomerScreenReport/CustomerScreenReport";
import MarketingReport from "./Views/MarketingReport/MarketingReport";
import Salesreport from "./Views/SalesReport/Salesreport";
import BoFunctionalCode from "./Views/BO_FunctionalCodes/BoFunctionalcode";
import BoFunctionalCodeEdit from "./Views/BOFunctionalCodeEdit/BOFunctionalCodeEdit";
import BOFunctionalCodeAdd from "./Views/BOFunctionalCodeADD/BOFunctioanlCodeAdd";
import PrefundBalanceByCompany from "./Views/PrefundBalanceByCompany/PrefundBalanceByCompany";
import SmsTransactionReport from "./Views/SmsTransactionReport/SmsTransactionReport";
import PayrollTxnByCompany from "./Views/PayrollTxnByCompany/PayrollTxnByCompany";
import TransactionReport from "./Views/TransactionRepots/TransactionRepots";
import Merchantsetup from "./Views/Merchantsetup/Merchantsetup";
import AvgDailyMonthlyTransactionReport from "./Views/AvgDailyMonthlyReportComparsion/AvgDailyMonthlyTxnReport";
import WalletDowngradeReport from "./Views/WalletDowngrade/WalletDowngradeReport";
import TopUpCommonReport from "./Views/Top-UpCommonReport/TopUpCommonReport";
import AddMerchant from "./Views/AddMerchant/AddMerchant";
import ViewMerchant from "./Views/AddMerchant/ViewMerchant";
import EditMerchant from "./Views/AddMerchant/EditMerchant";
import MerchantBranchSummary from "./Views/MerchantBranchSummary/MerchantBranchSummary";
import AddMerchantBranch from "./Views/AddMerchantBranch/AddMerchantBranch";
import EditMerchantBranch from "./Views/AddMerchantBranch/EditMerchantBranch";
import MerchantTellerSummary from "./Views/MerchantTellerSummary/MerchantTellerSummary";
import AddMerchantTeller from "./Views/AddMerchantTeller/AddMerchantTeller";
import EditMerchantTeller from "./Views/AddMerchantTeller/EditMerchantTeller";
import TransactionHistoryReport from "./Views/TransactionHistoryReport/TransactionHistoryReport";
import LanguageParameter from "./Views/LanguageParameter/LanguageParameter";
import LanguageParameterView from "./Views/LanguageParameter/LanguageParameterView/LanguageParameterView";
import LanguageParameterEdit from "./Views/LanguageParameter/LanguageParametersEdit/LanguageParameterEdit";
// import LanguageParameterAdd from './Views/LanguageParameter/LanguageParametersEdit/LanguageParameterEdit';
import MerchantSummaryHq from "./Views/MerchantSummaryHQ/MerchantSummaryHq";
import MerchantSummaryAdd from "./Views/MerchantSummaryHQ/MerchantSummaryAdd";
import MerchantSummaryView from "./Views/MerchantSummaryView/MerchantSummaryView";
import MerchantSummaryHQEdit from "./Views/MerchantSummaryHQEdit/MerchantSummaryHQEdit";
import payrollPrefund from "./Views/PayrollPrefund/payrollPrefund";
import ViewPayrollPrefund from "./Views/PayrollPrefundView/viewPayrollPrefund";
import LanguageParameterAdd from "./Views/LanguageParameter/LanguageParameterAdd/LanguageParameterAdd";
import ManualDebitCreditSummary from "./Views/ManualDebitCreditSummary/ManualDebitCreditSummary";
import AddManualDebitCredit from "./Views/ManualDebitCredit/AddManualDebitCredit";
import ViewManualDebitCredit from "./Views/ManualDebitCredit/ViewManualDebitCredit";
import PayrollPrefundApproval from "./Views/PayrollPrefundApproval/PayrollPrefundApproval";
// import ManualDebitCredit from './Views/ManualDebitCredit/ManualDebitCredit';

var Routes: any = [
  {
    path: "/login",
    name: "Login",
    icon: null,
    component: Login,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/resetpassword",
    name: "reset Password",

    icon: <IoArrowForward />,
    component: ResetPassword,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: <IoArrowForward />,
    component: ForgotPassword,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/update-profile",
    name: "Update Profile",
    icon: <IoArrowForward />,
    component: UpdateProfile,
    layout: "/dashboard",
    sidebar: false,
  },
  {
    path: "/Profile-image-change",
    name: "Profile Image Change",
    icon: <IoArrowForward />,
    component: ProfileImgChange,
    layout: "/dashboard",
    sidebar: false,
  },
  {
    name: "approval task",
    subMenu: false,
    sidebar: false,
    layout: "/dashboard",
    icon: <IoArrowForward />,
    path: "/home",
    component: Home,
    menuItems: [
      {
        path: "/home",
        name: "Approvaltask",
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
        component: Home,
      },
    ],
  },

  {
    name: "Setup and Configurations",
    subMenu: true,
    sidebar: true,

    layout: "/dashboard",
    icon: <MdOutlinePermDataSetting />,
    path: "/dashboard",
    menuItems: [
      {
        path: "/AMLcompliance-config",
        name: "AMLcompliance Config",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AMLcompliance,
      },
      {
        path: "/Notification-Master-Setup",
        name: "Notification Master Setup",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: NotificationMasterSetup,
      },
      {
        path: "/notification-master-view",
        name: "Notification Master View",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: NotificationMasterForm,
      },

      {
        path: "/notification-channel",
        name: "Notification Channel Setup",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: NotificationChannelSetup,
      },
      {
        path: "/notification-channel-view",
        name: "Notification Channel Setup",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: NotificationChannelView,
      },
      {
        path: "/notification-channel-edit",
        name: "Notification Channel Setup",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: NotificationChannelEdit,
      },
      {
        path: "/reference-data",
        name: "Reference Data ",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ReferenceData,
      },

      {
        path: "/Toggle-Summary",
        name: "Toggle Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ToggleSummary,
      },
      {
        path: "/parameter-summary",
        name: "Parameter Summary ",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ParameterSummary,
      },
      {
        path: "/Notification-Summary",
        name: "Notification Summary ",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: NotificationSummary,
      },
      {
        path: "/edit-summary-notification",
        name: "Edit Summary ",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: CommonEditSummary,
      },
      {
        path: "/edit-summary-parameter",
        name: "Edit Summary Parameter",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: CommonEditSummary,
      },
      {
        path: "/Wallet-Size-Setup",
        name: "Wallet Size Setup",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: WalletSizeSetup,
      },
      {
        path: "/Wallet-Size-Brand-Mapping",
        name: "Wallet Size Brand Mapping",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: WalletSizeBrandMapping,
      },
      {
        path: "/Edit-Wallet-Size",
        name: "Edit Wallet Size",
        layout: "/dashboard/Wallet-Size-Setup",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: EditWalletSizeSetup,
      },
      {
        path: "/Edit",
        name: "Edit",
        layout: "/dashboard/Wallet-Size-Brand-Mapping",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: EditWalletSizeBrandMapping,
      },

      {
        path: "/create-new-code",
        name: "Create New Code ",
        layout: "/dashboard/reference-data",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ReferenceDataCreate,
      },
      {
        path: "/edit-code",
        name: "Edit Code",
        layout: "/dashboard/reference-data",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ReferenceDataEdit,
      },
      {
        path: "/reference-data-view",
        name: "Reference Data View",
        layout: "/dashboard/reference-data",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ReferenceDataView,
      },
      {
        path: "/Toggle-Summary-Edit",
        name: "Toggle Summary Edit",
        layout: "/dashboard/Toggle-Summary",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ToggleSummaryEdit,
      },
      {
        path: "/ID-Type-Routing",
        name: "Id Type Routing",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: IdtypeRouting,
      },
      {
        path: "/ID-Type-Create",
        name: "Id Type Create",
        layout: "/dashboard/ID-Type-Routing",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: IdTypeCreate,
      },
      {
        path: "/ID-Type-Edit",
        name: "Id Type Edit",
        layout: "/dashboard/ID-Type-Routing",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: IdTypeEdit,
      },
      {
        path: "/debit-credit-summary",
        name: "Manual Debit / Credit Summary",
        component: ManualDebitCreditSummary,
        icon: <IoArrowForward />,
        layout: "/dashboard/manual-debit-credit",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/Add-debit-credit",
        name: "Manual Debit / Credit",
        component: AddManualDebitCredit,
        icon: <IoArrowForward />,
        layout: "/dashboard/manual-debit-credit",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/View-debit-credit",
        name: "Manual Debit / Credit",
        component: ViewManualDebitCredit,
        icon: <IoArrowForward />,
        layout: "/dashboard/manual-debit-credit",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/Functional-code",
        name: "Functional Code",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: BoFunctionalCode,
      },
      {
        path: "/Functional-code-Edit",
        name: "Functional Code Setup-Edit",
        layout: "/dashboard/Functional-code",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: BoFunctionalCodeEdit,
      },
      {
        path: "/FunctionalCode-Create",
        name: "Functional Code Setup-Create",
        layout: "/dashboard/Functional-code",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: BOFunctionalCodeAdd,
      },

      {
        path: "/ID-Type-Create",
        name: "Id Type Create",
        layout: "/dashboard/ID-Type-Routing",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: IdTypeCreate,
      },
      {
        path: "/company-maintenance",
        name: "Company Maintenance",
        component: CompanyMaintenanceScreen,
        icon: <IoArrowForward />,
        layout: "/dashboard/Payroll-Company-Management",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/Add-Company-Maintenance",
        name: "Add Company Maintenance",
        component: AddCompanyMainteanance,
        icon: <IoArrowForward />,
        layout: "/dashboard/Payroll-Company-Management/company-maintenance",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/Edit-Company-Maintenance",
        name: "Edit Company Maintenance",
        icon: <IoArrowForward />,
        component: AddCompanyMainteanance,
        layout: "/dashboard/Payroll-Company-Management/company-maintenance",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/payroll-account",
        name: " Company Payroll Account",
        component: CompanyPayrollAccountEnquiry,
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "Payroll-account",
      },
      {
        path: "/payroll-enquiry",
        name: " Company Payroll Account Enquiry",
        component: PayrollEnquirey,
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "Payroll-enquiry",
      },
      {
        path: "/ID-Type-Edit",
        name: "Id Type Edit",
        layout: "/dashboard/ID-Type-Routing",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: IdTypeEdit,
      },
      {
        path: "/eKYC-Pending-Customer",
        name: "eKYC Pending Customer",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: eKYCPendingCustomer,
      },
      {
        path: "/KYC-Customer",
        name: "KYC Customer",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: KYCPendingCustomer,
      },
      {
        path: "/View-Customer-Profile",
        name: "KYC View Customer Profile",
        layout: "/dashboard/KYC-Customer",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCViewCustomerProfile,
      },
      {
        path: "/Document-Details",
        name: "KYC Document Details",
        layout: "/dashboard/KYC-Customer",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCDocumentDetails,
      },
      {
        path: "/KYC-Customer-Enquiry",
        name: "KYC Customer Enquiry",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: KYCCustomerEnquiry,
      },
      {
        path: "/View-Customer-Enquiry",
        name: "KYC View Customer Enquiry",
        layout: "/dashboard/KYC-Customer-Enquiry",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCCustomerEnquiryView,
      },
      {
        path: "/Edit-Customer-Enquiry",
        name: "Edit Customer Enquiry",
        layout: "/dashboard/KYC-Customer-Enquiry",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CustomerEnquiryEdit,
      },
      {
        path: "/Customer-Enquiry-History",
        name: "Customer Enquiry History",
        layout: "/dashboard/KYC-Customer-Enquiry",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CustomerEnquiryHistory,
      },
      {
        path: "/Customer-Wallet-History",
        name: "Customer Wallet History",
        layout: "/dashboard/KYC-Customer-Enquiry",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CustomerWalletHistory,
      },
      {
        path: "/Merchant-Setup",
        name: "Merchant Setup",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: Merchantsetup,
      },
      {
        path: "/Add-Merchant-Setup",
        name: "Add Merchant Setup",
        layout: "/dashboard/Merchant-Setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddMerchant,
      },
      {
        path: "/View-Merchant-Setup",
        name: "View Merchant Setup",
        layout: "/dashboard/Merchant-Setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: ViewMerchant,
      },
      {
        path: "/Edit-Merchant-Setup",
        name: "Edit Merchant Setup",
        layout: "/dashboard/Merchant-Setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditMerchant,
      },
      {
        path: "/Merchant-Branch-Summary",
        name: "Merchant Branch Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MerchantBranchSummary,
      },
      {
        path: "/Add-Merchant-Branch",
        name: "Add Merchant Branch",
        layout: "/dashboard/Merchant-Branch-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddMerchantBranch,
      },
      {
        path: "/Edit-Merchant-Branch",
        name: "Edit Merchant Branch",
        layout: "/dashboard/Merchant-Branch-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditMerchantBranch,
      },
      {
        path: "/Merchant-Teller-Summary",
        name: "Merchant Teller Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MerchantTellerSummary,
      },
      {
        path: "/Add-Merchant-Teller",
        name: "Add Merchant Teller",
        layout: "/dashboard/Merchant-Teller-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddMerchantTeller,
      },
      {
        path: "/Edit-Merchant-Teller",
        name: "Edit Merchant Teller",
        layout: "/dashboard/Merchant-Teller-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditMerchantTeller,
      },
      {
        path: "/Block-Card-Request",
        name: "Block Card Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: BlockCardRequest,
      },
      {
        path: "/Add-Block-Card-Request",
        name: "Add Block Card Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddBlockCardRequest,
      },
      {
        path: "/View-Block-Card-Request",
        name: "View Block Card Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: BlockCardRequestViewDetail,
      },
      {
        path: "/View-Block-Customer",
        name: "Block Card Customer View",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCCustomerEnquiryView,
      },
      {
        path: "/Card-Unblock-View-Details",
        name: "Card Unblock View Detailst",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardUnblockView,
      },
      {
        path: "/View-UnBlock-Customer",
        name: "UnBlock Card Customer View",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCCustomerEnquiryView,
      },
      {
        path: "/Card-Replacement",
        name: "Card Replacement",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardReplacement,
      },
      {
        path: "/Add-Card-Replacement",
        name: "Add Card Replacement",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddCardReplacement,
      },
      {
        path: "/View-Card-Replacement",
        name: "View Card Replacement",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ViewCardReplacement,
      },
      {
        path: "/Card-Unblock",
        name: "Unblock Card Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardUnblock,
      },
      {
        path: "/Add-Card-Unblock",
        name: "Add Card Unblock",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddCardUnblock,
      },
      {
        path: "/Card-Upgrade",
        name: "Upgrade Wallet Size Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardUpgrade,
      },
      {
        path: "/Card-Upgrade-View-Details",
        name: "Card Upgrade View Details",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardUpgradeView,
      },
      {
        path: "/Card-Upgrade-View-Customer",
        name: "Card Upgrade View Customer",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: KYCCustomerEnquiryView,
      },
      {
        path: "/Add-Card-Upgrade",
        name: "Add Card Upgrade",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddCardUpgrade,
      },

      {
        path: "/Doc-Upload-Request",
        name: "Doc Upload Request",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: DocUploadRequest,
      },
      {
        path: "/Block-After-Grace-Period",
        name: "KYC Block After Grace Period",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: KycBlockAfterGrace,
      },
      {
        path: "/Doc-Upload-Request-View",
        name: "Doc Upload Request View",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: DocUploadRequestView,
      },
      {
        path: "/Doc-Upload-Customer-View",
        name: "Doc Upload Customer View",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: KYCCustomerEnquiryView,
      },
      {
        path: "/Doc-Upload-Request-Add",
        name: "Doc Upload Request Add",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: DocUploadRequestAdd,
      },
      {
        path: "/Expiry-Wallet-Downgrade",
        name: "KYC Expiry Wallet Downgrade",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ExpairyWalletDowngrade,
      },

      {
        path: "/Payout-Country",
        name: "Payout Country",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitCountrySetup,
      },
      {
        path: "/Edit-Payout-Country",
        name: "Payout Country",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitCountryForm,
      },
      {
        path: "/Add-Payout-Country",
        name: "Payout Country",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitCountryForm,
      },
      {
        path: "/Bank-Setup",
        name: "Bank Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitBankSetup,
      },
      {
        path: "/View-Bank-Setup",
        name: "Bank Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitBankForm,
      },
      {
        path: "/Branch-Setup",
        name: "Branch Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitBranchSetup,
      },
      {
        path: "/Edit-Branch-Setup",
        name: "Branch Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitBranchForm,
      },
      {
        path: "/Paying-Group",
        name: "Paying Group",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitAgentTag,
      },
      {
        path: "/Edit-Paying-Group",
        name: "Edit Paying Group",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitAgentTagForm,
      },
      {
        path: "/Remittance-Transaction-Processing",
        name: "Remittance Transaction Processing",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitTransactionProcessing,
      },
      {
        path: "/Remittance-Transaction-Enquiry",
        name: "Remittance Transaction Enquiry Details",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitTransactionEnquiry,
      },
      {
        path: "/Edit-On-Behalf-Details",
        name: "Edit On Behalf Details",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitEditOnBehalf,
      },
      {
        path: "/On-Behalf-Setup-Details",
        name: "On Behalf Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitOnBehalfSetup,
      },
      {
        path: "/Remittance-Transaction-Status-Dashboard",
        name: "Remittance Transaction Status Dashboard",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitTransactionStatus,
      },
      {
        path: "/Remittance-Transaction-Status-Limit",
        name: "Remittance Transaction Limit",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RemitTransactionLimit,
      },
      {
        path: "/Transaction-Status-Limit",
        name: "Remittance Transaction Limit Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemittanceAddLimit,
      },
      {
        path: "/Company-User",
        name: "Company User",
        layout: "/dashboard/Company-UserScreen",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CompanyUserScreenList,
      },
      {
        path: "/Add-Company-User-List",
        name: "Add Company User List",
        layout: "/dashboard/Company-UserScreen/Company-User",
        icon: <IoArrowForward />,
        secondSubmenuShow: false,
        component: AddCompanyUserList,
      },
      {
        path: "/View-Company-User-List",
        name: "Users",
        layout: "/dashboard/Company-UserScreen/Company-User",
        icon: <IoArrowForward />,
        secondSubmenuShow: false,
        component: ViewCompanyUserList,
      },
      {
        path: "/View-Company-User-Add",
        name: "Users",
        layout:
          "/dashboard/Company-UserScreen/Company-User/View-Company-User-List",
        icon: <IoArrowForward />,
        secondSubmenuShow: false,
        component: ViewCompanyUserAdd,
      },
      {
        path: "/Company-User",
        name: "CompanyUserScreen",
        layout: "/dashboard/Company-UserScreen",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddNewCompanyUser,
      },
      {
        path: "/Company-User",
        name: "CompanyUserScreen",
        layout: "/dashboard/Company-UserScreen",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddCompanyUser,
      },

      {
        path: "/bank-Payment-Gateway-Mapping",
        name: "Bank Payment Gateway Mapping",
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: BankPaymentGatewayMapping,
      },
      {
        path: "/Add-Bank",
        name: "Add Bank",
        layout: "/dashboard/bank-Vendor-Mapping",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: AddBank,
      },
      {
        path: "/View-Bank",
        name: "View Bank",
        layout: "/dashboard/bank-Vendor-Mapping",
        visibleInMenu: false,
        secondSubmenu: false,
        icon: <IoArrowForward />,
        component: ViewBankMenu,
      },
      {
        path: "/Add-Account",
        name: "Add Account",
        layout: "/dashboard/Account-vendor",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: AddAccount,
      },
      {
        path: "/View-Account",
        name: "View Account",
        layout: "/dashboard/View-vendor",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: ViewAccount,
      },
      {
        path: "/Edit-Account",
        name: "Edit Account",
        layout: "/dashboard/Edit-vendor",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: EditAccount,
      },
    ],
  },
  {
    name: "Salary File Upload",
    subMenu: true,
    sidebar: true,
    icon: <FaFileUpload />,
    layout: "/dashboard",
    path: "/dashboard",
    menuItems: [
      {
        path: "/Topup-Add",
        name: "Topup Add",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "Topup-Add",
        component: TopUpAdd,
      },
      {
        path: "/Topup-BatchDetails",
        name: "Topup Batch Details",
        layout: "/dashboard/Topup-Add",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "Topup-BatchDetails",
        component: TopUpBatchDetails,
      },
      {
        path: "/Topup-RejectionReport",
        name: "Topup Rejection Report",
        layout: "/dashboard/Topup-Add",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "Topup-RejectionReport",
        component: TopUpRejectionReport,
      },
    ],
  },
  {
    name: "Compliance",
    subMenu: true,
    sidebar: true,
    icon: <RiUserLocationFill />,
    layout: "/dashboard",
    path: "/dashboard",
    menuItems: [
      {
        path: "/Pending-AML-Customers",
        name: "Pending AML Customers",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "Pending-AML-Customers",
        component: AmlPendingCustomers,
      },
      {
        path: "/AML-Customer-Info",
        name: "AML Customer Info",
        layout: "/dashboard/Pending-AML-Customers",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "AML-Customer-Info",
        component: AmlCustomerInfo,
      },
    ],
  },
  {
    name: "User Access Management",
    subMenu: true,
    sidebar: true,
    icon: <RiUserSettingsFill />,
    layout: "/dashboard",
    path: "/dashboard",
    menuItems: [
      {
        path: "/User",
        name: "User",
        layout: "/dashboard/user-Access-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "user-management",
        component: UserDetails,
      },

      {
        path: "/User-Groups",
        name: "User Group",
        layout: "/dashboard/user-Access-Management",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "user-management",
        component: UserGroups,
      },
      {
        path: "/User-Groups/Add-User-Group",
        name: "User Group",
        layout: "/dashboard/user-Access-Management",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CreateUserGroup,
      },
      {
        path: "/User-Groups/Edit-User-Group",
        name: "User Group",
        layout: "/dashboard/user-Access-Management",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CreateUserGroup,
      },
      {
        path: "/User-Rights",
        name: "Users Rights",
        layout: "/dashboard/user-Access-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "user-management",
        component: UserRights,
      },
      {
        path: "/Group-Rights",
        name: "Group Rights",
        layout: "/dashboard/user-Access-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "user-management",
        component: GroupRights,
      },
    ],
  },
  {
    name: "Security Operations",
    subMenu: true,
    sidebar: true,
    icon: <RiUserSettingsFill />,
    layout: "/dashboard",
    path: "/dashboard",
    menuItems: [
      {
        path: "/unlock",
        name: "Unlock Customer Mobile or Device",
        layout: "/dashboard/User-Account-Unlock",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/unlock",
        component: LockedCustomer,
      },

      {
        path: "/unlock-staff",
        name: "Unlock BO User",
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/unlock-staff",
        component: LockedBackOfficeUser,
      },
      {
        path: "/block-mobile-device",
        name: "Lock Account / Device ",
        layout: "/dashboard/User-Account-Unlock",
        component: BlockNumberDevice,
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/block-mobile-device",
      },
      {
        path: "/Customer-Login-Records",
        name: "Customer Login Records",
        component: UserLoginRecords,
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/Customer-Login-Records",
      },
      {
        path: "/Global-Settings-Mobile",
        name: "Gloabal Settings",
        component: GlobalSettings,
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/Global-Settings",
      },
      {
        path: "/Global-Settings-Device",
        name: "Gloabal Settings Device",
        component: GlobalSettingsDevice,
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/Global-Settings-Device",
      },
      {
        path: "/Locked-Account-History",
        name: "Account and Device History",
        component: DeviceMobileHistory,
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/Locked-Account-History",
      },
      {
        path: "/Locked-Device-History",
        name: "Lock/UnLock Device History",
        component: LockedDeviceHistory,
        layout: "/dashboard/User-Account-Unlock",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "/dashboard/user Account Unlock/Locked-Device-History",
      },

      {
        path: "/Add-New",
        name: "Add New",

        component: AddNewBlocking,
        layout: "/dashboard/User-Account-Unlock",
        secondSubmenuShow: true,
      },

      {
        path: "/Locked-Account-History",
        name: "Lock/UnLock Account History",
        component: DeviceMobileHistory,
        layout: "/dashboard/User-Account-Unlock",
        secondSubmenuShow: true,
      },
      {
        path: "/Locked-Device-History",
        name: "Lock/UnLock Device History",
        component: LockedDeviceHistory,
        layout: "/dashboard/User-Account-Unlock",
        secondSubmenuShow: false,
      },
      {
        path: "/unblock-mobile-device",
        name: "UnBlock Mobile/Device",
        component: UnLockDevice,

        layout: "/dashboard/User-Account-Unlock",
        secondSubmenuShow: true,
      },
    ],
  },
  {
    name: "Payroll Processing",
    subMenu: true,
    sidebar: true,
    layout: "/dashboard",
    icon: <GiReceiveMoney />,
    path: "/dashboard",
    menuItems: [
      {
        path: "/account",
        name: "Account",
        component: Account,
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
        key: "account",
      },
      {
        path: "/account-transaction",
        name: "TopUp Prefund Account",
        component: PreFundProcessing,
        icon: <IoArrowForward />,
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
        key: "account-transaction",
      },
      {
        path: "/Add-account-transaction",
        name: "ADD-TopUp Prefund Account",
        component: AccountTransaction,
        layout: "/dashboard/account-transaction",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "account-transaction",
      },
      {
        path: "/prefund-Transaction-enquiry",
        name: "Prefund Transaction Enquiry",
        component: PrefundTransactionEnquiry,
        icon: <IoArrowForward />,
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
        key: "prefund-Transaction-enquiry",
      },
      {
        path: "/prefund-Account-enquiry",
        name: "Prefund Account Enquiry",
        component: PrefundAccountEnquiry,
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "prefund-Account-enquiry",
      },
      {
        path: "/prefund-Account-enquiry/Edit-Prefund-Enquiry",
        name: "Prefund Account Enquiry",
        component: PayrollAccountView,
        icon: <IoArrowForward />,
        layout: "/dashboard",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/payroll-enquiry",
        name: " Company Payroll Account Enquiry",
        component: PayrollEnquirey,
        layout: "/dashboard",
        visibleInMenu: true,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        key: "Payroll-enquiry",
      },
      {
        path: "/company-maintenance",
        name: "Company Maintenance",
        component: CompanyMaintenanceScreen,
        icon: <IoArrowForward />,
        layout: "/dashboard/Payroll-Company-Management",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/Add-Company-Maintenance",
        name: "Add Company Maintenance",
        component: AddCompanyMainteanance,
        icon: <IoArrowForward />,
        layout: "/dashboard/Payroll-Company-Management/company-maintenance",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/Edit-Payroll",
        name: "Edit Company Maintenance",
        icon: <IoArrowForward />,
        component: AddCompanyMainteanance,
        layout: "/dashboard/Payroll-Account",
        visibleInMenu: false,
        secondSubmenu: false,
      },

      {
        path: "/PreOnBoarding",
        name: "PreOnBoarding",
        icon: <IoArrowForward />,
        component: PreOnboarding,
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/PreOnBoarding-Customer",
        name: "PreOnBoarding Customer",
        icon: <IoArrowForward />,
        component: PreOnBoardingCustomer,
        layout: "/dashboard",
        visibleInMenu: true,
        secondSubmenu: false,
      },
      {
        path: "/Add-Customer",
        name: "Add Customer",
        icon: <IoArrowForward />,
        component: AddOnboardingCustomer,
        layout: "/dashboard",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/Bulk-Upload-Customer",
        name: "Bulk Upload Customer",
        icon: <IoArrowForward />,
        component: OnboardingBulkCustomer,
        layout: "/dashboard",
        visibleInMenu: false,
        secondSubmenu: false,
      },
      {
        path: "/Agent-Group",
        name: "Agent Group",
        layout: "/dashboard/Branch-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management",
        component: AgentGroup,
      },
      {
        path: "/Add-Agent-Group",
        name: "Add Agent Group",
        layout: "/dashboard/Branch-Management/Agent-Group",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddAgentGroup,
      },
      {
        path: "/Edit-Agent-Group",
        name: "Edit Agent Group",
        layout: "/dashboard/Branch-Management/Agent-Group",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditAgentGroup,
      },
      {
        path: "/Branch-Dashboard",
        name: "Branch Dashboard",
        layout: "/dashboard/Branch-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management",
        component: BranchDashboard,
      },
      {
        path: "/Add-Branch",
        name: "Add Branch",
        layout: "/dashboard/Branch-Management/Branch-Dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management/Branch-Dashboard",
        component: AddBranch,
      },
      {
        path: "/Edit-Branch",
        name: "Edit Branch",
        layout: "/dashboard/Branch-Management/Branch-Dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management/Branch-Dashboard",
        component: AddBranch,
      },
      {
        path: "/Terminal-Dashboard",
        name: "Terminal Dashboard",
        layout: "/dashboard/Branch-Management",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management",
        component: TerminalDashboard,
      },

      {
        path: "/Add-ETerminal",
        name: "Add ETerminal",
        layout: "/dashboard/Branch-Management/Terminal-Dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management/Terminal-Dashboard",
        component: AddETerminal,
      },
      {
        path: "/Edit-ETerminal",
        name: "Edit ETerminal",
        layout: "/dashboard/Branch-Management/Terminal-Dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard/Branch-Management/Terminal-Dashboard",
        component: AddETerminal,
      },
      {
        path: "/Idtype-Summary",
        name: "ID Type Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        key: "/dashboard",
        component: IdTypeSummary,
      },
      {
        path: "/Add-Idtype-Summary",
        name: "Add ID Type",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard",
        component: AddIdtypeSummary,
      },
      {
        path: "/Edit-Idtype-Summary",
        name: "Edit ID Type",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard",
        component: AddIdtypeSummary,
      },
      {
        path: "/View-Idtype-Summary",
        name: "View ID Type",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        key: "/dashboard",
        component: AddIdtypeSummary,
      },
      {
        path: "/Remittance-Fees-And-Charges",
        name: "Remittance Fees And Charges",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemittanceFeesAndCharges,
      },
      {
        path: "/Mobile-TopUp-Summary-DashBoard",
        name: "Mobile TopUp Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MobileTopUpSummary,
      },
      {
        path: "/Mobile-TopUp-Summary",
        name: "Mobile TopUp Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MobileTopupSummaryTable,
      },
      {
        path: "/Mobile-TopUp-View",
        name: "Mobile TopUp View",
        layout: "/dashboard/Mobile-TopUp-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MobileTopUpView,
      },
      {
        path: "/ECDD-Setup",
        name: "ECDD Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AmlEcddSetup,
      },
      {
        path: "/Risk-Score",
        name: "Risk Score",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AmlRiskScale,
      },
      {
        path: "/Add-Risk-Score",
        name: "Add Risk Score",
        layout: "/dashboard/remit-setup/Risk-Score",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddAmlRiskScale,
      },
      {
        path: "/Edit-Risk-Score",
        name: "Edit Risk Score",
        layout: "/dashboard/remit-setup/Risk-Score",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: EditAmlRiskScale,
      },
      {
        path: "/Transaction-Statistics",
        name: "Transaction Statistics",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AmlTransactionStatistics,
      },
      {
        path: "/Add-Transaction-Statistics",
        name: "Add Transaction Statistics",
        layout: "/dashboard/remit-setup/Transaction-Statistics",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddTransactionStatistic,
      },
      {
        path: "/Edit-Transaction-Statistics",
        name: "Edit Transaction Statistics",
        layout: "/dashboard/remit-setup/Transaction-Statistics",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: EditTransactionStatistic,
      },
      {
        path: "/Risk-Factor",
        name: "Risk Factor",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitRiskFactor,
      },
      {
        path: "/Edit-Risk-Factor",
        name: "Edit Risk Factor",
        layout: "/dashboard/remit-setup/Risk-Factor",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: EditRemitRiskFactor,
      },
      {
        path: "/Risk-Factor-Status-Configuration",
        name: "Risk Factor Status Configuration",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitRiskFactorStatusConfiguration,
      },
      {
        path: "/Risk-Rating",
        name: "Risk Rating",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitRiskRating,
      },
      {
        path: "/Add-Risk-Rating",
        name: "Add Risk Rating",
        layout: "/dashboard/remit-setup/Risk-Rating",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddRemitRiskRating,
      },
      {
        path: "/Edit-Risk-Rating",
        name: "Edit Risk Rating",
        layout: "/dashboard/remit-setup/Risk-Rating",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: EditRemitRiskRating,
      },
      {
        path: "/Exchange-Rate",
        name: "Exchange Rate",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ExchangeRate,
      },
      {
        path: "/High-Risk-Country-Setup",
        name: "High Risk Country Setup",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitHighRiskCountry,
      },
      {
        path: "/OTP-List",
        name: "OTP List",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: OTPTempTable,
      },
      {
        path: "/Account-Summary",
        name: "Account Summary",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        layout: "/dashboard",
        component: AccountSummary,
      },
      {
        path: "/ID-Doc-Mapping",
        name: "ID Doc Mapping",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: IdDocMapping,
      },
      {
        path: "/ID-Doc-Mapping-Add",
        name: "Add ID Doc Mapping",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddIdDocMapping,
      },
      {
        path: "/ID-Doc-Mapping-Edit",
        name: "Edit ID Doc Mapping",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditIdDocMapping,
      },
      {
        path: "/Card-Type",
        name: "Card Type",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CardType,
      },
      {
        path: "/Language-Parameter",
        name: "Language Parameter",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: LanguageParameter,
      },
      {
        path: "/Language-Parameter-view",
        name: "Language Parameter View",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: LanguageParameterView,
      },
      {
        path: "/Language-Parameter-edit",
        name: "Language Parameter edit",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: LanguageParameterEdit,
      },
      {
        path: "/Language-Parameter-add",
        name: "Language Parameter add",
        layout: "/dashboard",
        visibleInMenu: false,
        icon: <IoArrowForward />,
        secondSubmenu: false,
        component: LanguageParameterAdd,
      },
      {
        path: "/Source-Code",
        name: "Source Code",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CardSourceCode,
      },
      {
        path: "/Promo-Code",
        name: "Promo Code",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CardPromoCode,
      },
      {
        path: "/Card-Promo-Source-Linkage",
        name: "Linkage",
        layout: "/dashboard/Setup-And-Configuration",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: CardSourcePromoLinkage,
      },
      {
        path: "/IdExpiring-Reports",
        name: "IdExpiringReports",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: IdExpiringReports,
      },
      {
        path: "/transaction-report",
        name: "Transaction Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: TransactionSummaryReport,
      },
      {
        path: "/end-of-day-report",
        name: "End of Day Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EndofDayReport,
      },

      {
        path: "/SRFBlockCard",
        name: "SRF BlockCard",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: BlockCardPending,
      },
      {
        path: "/SRFUnBlockCard",
        name: "SRF UnBlockCard",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: UnBlockCardPending,
      },
      {
        path: "/KYCUpdateCard",
        name: "SRF KYCUpdateCard",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: KYCUpdatePending,
      },
      {
        path: "/WalletUpgrade",
        name: "SRF WalletUpgrade",
        layout: "/dashboard/SRF",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: WalletPending,
      },

      {
        path: "/DailyTransactionReport",
        name: "Daily Transaction Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: DailyTransactionReport,
      },
      {
        path: "/MonthlyTransactionReport",
        name: "Monthly Transaction Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MonthlyTransactionReport,
      },
      {
        path: "/RefundTransactionReport",
        name: "Refund Transaction Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RefundTransactionReport,
      },
      {
        path: "/OnBehalfSenderReport",
        name: "On Behalf Sender Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: OnBehalfSenderReport,
      },
      {
        path: "/MIRS-Declined-Transaction-Report",
        name: "MIRS Declined Transaction Report",
        layout: "/dashboard/remittanceTransactionReport",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MIRSDeclinedTransactionReport,
      },
      {
        path: "/RejectedTransactionReport",
        name: "Rejected Transaction Report",
        layout: "/dashboard/remittanceTransactionReport",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: RejectedTransactionReport,
      },
      {
        path: "/Remit-AML-Compliance-Config",
        name: "Remit AML Compliance Config",
        layout: "/dashboard/remit-setup",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: RemitAMLComplianceConfig,
      },
      {
        path: "/Target-Group-Setup",
        name: "Add/Edit Target Group",
        layout: "/dashboard/marketing",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: TargetGroup,
      },
      {
        path: "/Add-Target-Group-By-Customers",
        name: "Add Target Group By Customers",
        layout: "/dashboard/marketing/Target-Group-Setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddTargetGroupByCustomers,
      },
      {
        path: "/Edit-Target-Group-By-Customers",
        name: "Edit Target Group By Customers",
        layout: "/dashboard/marketing/Target-Group-Setup",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditTargetGroupByCustomers,
      },
      {
        path: "/Promo-Code-Summary",
        name: "Promo Code Summary",
        layout: "/dashboard/marketing",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PromoCodeSummary,
      },
      {
        path: "/Add-Promo-Code",
        name: "Add Promo Code",
        layout: "/dashboard/marketing/Promo-Code-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddPromoCode,
      },
      {
        path: "/Add-Promo-Code-Setup",
        name: "Add Promo Code Setup",
        layout: "/dashboard/marketing/Promo-Code-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: AddPromoCodeSetup,
      },
      {
        path: "/Edit-Promo-Code-Setup",
        name: "Edit Promo Code Setup",
        layout: "/dashboard/marketing/Promo-Code-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: EditPromoCodeSetup,
      },
      {
        path: "/View-Promo-Code-Setup",
        name: "View Promo Code Setup",
        layout: "/dashboard/marketing/Promo-Code-Summary",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: ViewPromoCode,
      },
      {
        path: "/UAMreport",
        name: "UAM Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: UAMreport,
      },
      {
        path: "/FailedTransactionReport",
        name: "Failed Transaction Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: FailedTxnReport,
      },
      {
        path: "/BranchManagementReport",
        name: "Branch Management Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: BranchManagementReport,
      },
      {
        path: "/AMLCFTReports",
        name: "AML CFT Reports",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AMLCFTReports,
      },
      {
        path: "/CustomerLoginReport",
        name: "Customer Login Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CustomerLoginReport,
      },
      {
        path: "/CustomerRiskProfilingReport",
        name: "Customer Risk Profiling Reports",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CustomerRiskProfilingReport,
      },
      {
        path: "/ECDDReport",
        name: "ECDDReport",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ECDDReport,
      },
      {
        path: "/CustomerRiskSummaryReport",
        name: "Customer Risk Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CustomerRiskSummaryReport,
      },
      {
        path: "/TransactionReport",
        name: "Transaction Screening Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: TransactionReport,
      },
      {
        path: "/TransactionSummaryReport",
        name: "Transaction Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AMLTransactionSummaryReport,
      },
      {
        path: "/OnBoardingSummaryReport",
        name: "Onboarding Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: OnBoardingSummaryReport,
      },
      {
        path: "/OnBoardingDetailReport",
        name: "Onboarding Detail Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: OnBoardingDetailReport,
      },
      {
        path: "/MSSLTrackerListReport",
        name: "MSSLTracker List Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MSSLTrackerListReport,
      },
      {
        path: "/MaintenanceListReport",
        name: "Maintenance List Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MaintenanceListReport,
      },
      {
        path: "/GroupNameSummaryReport",
        name: "GroupName Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: GroupNameSummaryReport,
      },
      {
        path: "/PayrollCompanyCreation",
        name: "Payroll Company Creation",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PayrollComapanyCreation,
      },
      {
        path: "/TopupReconciliationReport",
        name: "Topup Reconciliation Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: TopupReconciliationReport,
      },
      {
        path: "/PrefundReconciliationReport",
        name: "Prefund Reconciliation Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PrefundReconciliationReports,
      },
      {
        path: "/PayrollSummaryReport",
        name: "Payroll Transaction Summary Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PayrollSummaryReport,
      },
      {
        path: "/PayrollDetailReport",
        name: "Payroll Transaction Detail Report​",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PayrollDetailReport,
      },
      {
        path: "/PrefundAmountReport",
        name: "Prefund Amount Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PrefundAmountReport,
      },
      {
        path: "/PrefundDebitReport​",
        name: "Prefund Debit Report​​",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PrefundDebitReport,
      },
      {
        path: "/PrefundCreditReport​",
        name: "Prefund Credit Report​",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PrefundCreditReport,
      },
      {
        path: "/valyou/vedioCall",
        name: "valyou vedioCall​",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: ValyouSRHCT,
      },
      {
        path: "/auditTrialReport",
        name: "Audit Trail Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AuditTrialReport,
      },
      {
        path: "/walletFeatureSummary",
        name: "Wallet Feature Summary",
        layout: "/dashboard/wallet",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: WalletFeatureSummary,
      },
      {
        path: "/addwalletfeature",
        name: "Add Wallet Feature",
        layout: "/dashboard/wallet",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AddWalletFeature,
      },
      {
        path: "/editWalletFeature",
        name: "Edit Wallet Feature",
        layout: "/dashboard/wallet",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: EditWalletFeature,
      },
      {
        path: "/CustomerScreeningReport",
        name: "Customer Screening Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: CustomerscreenReport,
      },
      {
        path: "/MarketingReport",
        name: "Marketing report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MarketingReport,
      },
      {
        path: "/salesReport",
        name: "Sales Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: Salesreport,
      },
      {
        path: "/PrefundBalanceByCompany",
        name: "Payroll Balance By Company",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PrefundBalanceByCompany,
      },
      {
        path: "/SmsTransactionReport",
        name: "SMS Transaction Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: SmsTransactionReport,
      },
      {
        path: "/PayrollTxnByCompany",
        name: "Payroll Transaction By Company",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: PayrollTxnByCompany,
      },
      {
        path: "/AvgDailyMonthlyTxnComparsionReport",
        name: "Average / Daily or Monthly Transaction Comparsion Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: AvgDailyMonthlyTransactionReport,
      },
      {
        path: "/walletDowngradeReport",
        name: "Wallet Downgrade Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: WalletDowngradeReport,
      },
      {
        path: "/TopUpCommonReport",
        name: "Top-up Common Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: TopUpCommonReport,
      },
      {
        path: "/TransactionHistoryReport",
        name: "Transaction History Report",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: TransactionHistoryReport,
      },
      {
        path: "/MerchantSummaryHQ",
        name: "Merchant Summary HQ",
        layout: "/dashboard/MerchantSummaryHQ",
        icon: <IoArrowForward />,
        visibleInMenu: true,
        secondSubmenu: false,
        component: MerchantSummaryHq,
      },
      {
        path: "/MerchantSummaryHQ/Add",
        name: "Add Merchant",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MerchantSummaryAdd,
      },
      {
        path: "/MerchantSummaryHQ/view",
        name: "View Merchant Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MerchantSummaryView,
      },
      {
        path: "/MerchantSummaryHQ/Edit",
        name: "Edit Merchant Summary",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: MerchantSummaryHQEdit,
      },
      {
        path: "/MerchantBranch",
        name: "Merchant Branch",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        //component: MerchantBranch,
      },
      {
        path: "/PayrollPrefund",
        name: "Payroll Prefund",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: payrollPrefund,
      },
      {
        path: "/view-PayrollPrefund",
        name: "Payroll Prefund",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: ViewPayrollPrefund,
      },
      {
        path: "/PayrollPrefundApproval",
        name: "Payroll Prefund Approval",
        layout: "/dashboard",
        icon: <IoArrowForward />,
        visibleInMenu: false,
        secondSubmenu: false,
        component: PayrollPrefundApproval,
      },
      // {
      //   path: "/view-PayrollPrefundApproval",
      //   name: "Payroll Prefund Approval",
      //   layout: "/dashboard",
      //   icon: <IoArrowForward />,
      //   visibleInMenu: false,
      //   secondSubmenu: false,
      //   component: ViewPayrollPrefundApproval,
      // },
    ],
  },
];
export default Routes;
