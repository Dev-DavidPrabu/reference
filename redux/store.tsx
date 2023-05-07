import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import metadataReducer from "./reducer/metadataReducer";
import referenceReducer from "./reducer/referenceReducer";
import UserCreateReducer from "./reducer/UserCreateReducer";
import authenticationReducer from "./reducer/UsetAuthenticationReducer";
import idtypeReducer from "./reducer/idTypeRoutingReducer";
import UserGroupCreateReducer from "./reducer/UserGroupReducer";
import FestivePackageReducer from "./reducer/FestivePackageReducer";
import UserRightsReducer from "./reducer/UserRightsReducer";
import GroupRightsReducer from "./reducer/GroupRightsReducer";
import walletSetUpReducer from "./reducer/walletSetupReducer";
import CompanyMaintenanceReducer from "./reducer/CompanyMaintenanceReducer";
import PreFundReducer from "./reducer/PreFundReducer";
import StateCountryReducer from "./reducer/StateCountryReducer";
import payrollTransactionEnquiryReducer from "./reducer/payrollTransactionEnquiry";
import payrollAccountEnquiryReducer from "./reducer/payrollAccountEnquiry";
import CustomerOnboardingReducer from "./reducer/CustomerOnboardingReducer";
import ToggleSummaryReducer from "./reducer/ToggleSummaryReducer";
import ParameterSummaryReducer from "./reducer/ParameterSummaryReducer";
import NotificationSummaryReducer from "./reducer/NotificationSummaryReducer";
import IdemiaScoreRoutingReducer from "./reducer/IdemiaScoreRoutingReducer";
import ApprovalTaskReducer from "./reducer/ApprovalReducer";
import BankMenuReducer from "./reducer/BankMenuReducer";
import TopUpAddReducer from "./reducer/TopUpAddReducer";
import NotificationMasterReducer from "./reducer/NotificationMasterReducer";
import NotificationChannelReducer from "./reducer/NotificationChannelReducer";
import AMLcomplianceReducer from "./reducer/AMLcomplianceReducer";
import AmlPendingCustomersReducer from "./reducer/AmlPendingCustomersReducer";
import LockedCustomerReducer from "./reducer/LockedCustomerReducer";
import ForgetPasswordAccessReducer from "./reducer/ForgotPasswordAccessReducer";
import LockedBackOfficeUserReducer from "./reducer/LockedBackOfficeUserReducer";
import staffDeviceLockReducer from "./reducer/staffDeviceLockReducer";
import UserLoginRecordsReducer from "./reducer/UserLoginRecordsReducer";
import KYCPendingCustomerReducer from "./reducer/KYCPendingCustomerReducer";
import UnBlockDeviceReducer from "./reducer/UnBlockDeviceReducer";
import DeviceMobileHistoryReducer from "./reducer/DeviceMobileHistoryReducer";
import CompanyUserScreenReducer from "./reducer/CompanyUserScreenReducer";
import globalSettingsReducer from "./reducer/GlobalSettingsReducer";
import ViewCompanyUserListReducer from "./reducer/ViewCompanyUserListReducer";
import PreOnBoardingReducer from "./reducer/PreOnboardingReducer";
import BranchDashboardReducer from "./reducer/BranchDashboardReducer";
import AgentGroupReducer from "./reducer/AgentGroupReducer";
import RemitBranchSetupReducer from "./reducer/RemitBranchSetupReducer";
import BankSetupReducer from "./reducer/BankSetupReducer";
import BankSetupCountryReducer from "./reducer/BankSetupCountryReducer";
import RemitAgentTagReducer from "./reducer/RemitAgentTagReducer";
import TerminalDashboardReducer from "./reducer/TerminalDashboardReducer";
import RemitPayoutCountryReducer from "./reducer/RemitPayoutCountryReducer";
import RemitTransactionProcessingReducer from "./reducer/RemitTransactionProcessingReducer";
import RemittanceFeesAndChargesReducer from "./reducer/RemittanceFeesAndChargesReducer";
import RemitTransactionLimitReducer from "./reducer/RemitTransactionLimitReducer";
import BlockCardRequestReducer from "./reducer/BlockCardRequestReducer";
import CardUnBlockReducer from "./reducer/CardUnBlockReducer";
import CardUpgradeReducer from "./reducer/CardUpgradeReducer";
import RemitEditOnBehalfReducer from "./reducer/RemitEditOnBehalfReducer";
import AmlEcddSetupReducer from "./reducer/AmlEcddSetupReducer";
import AmlRiskScaleReducer from "./reducer/AmlRiskScaleReducer";
import AmlTransactionStatisticReducer from "./reducer/AmlTransactionStatisticReducer";
import RemitRiskFactorReducer from "./reducer/RemitRiskFactorReducer";
import RemitRiskFactorStatusConfigurationReducer from "./reducer/RemitRiskFactorStatusConfigurationReducer";
import MobileTopUpReducer from "./reducer/MobileTopUpReducer";
import RemitRiskRatingReducer from "./reducer/RemitRiskRatingReducer";
import RemitHighRiskCountryReducer from "./reducer/RemitHighRiskCountryReducer";
import idtypeSummaryReducer from "./reducer/IdTypeSummaryReducer";
import CustomerEnquiryReducer from "./reducer/CustomerEnquiryReducer";
import OTPTempListReducer from "./reducer/OTPTempListReducer";
import DocUploadRequestReducer from "./reducer/DocUploadRequestReducer";
import IdDocMappingReducer from "./reducer/IdDocMappingReducer";
import ChangePasswordReducer from "./reducer/ChangePasswordReducer";
import WalletSizeSetupReducer from "./reducer/WalletSizeSetupReducer";
import WalletSizeBrandMappingReducer from "./reducer/WalletSizeBrandMappingReducer";
import CardTypeReducer from "./reducer/CardTypeReducer";
import CardSourceCodeReducer from "./reducer/CardSourceCodeReducer";
import CardPromoCodeReducer from "./reducer/CardPromoCodeReducer";
import CardSourcePromoLinkageReducer from "./reducer/CardSourcePromoLinkageReducer";
import KycExpiryWalletDowngradeReducer from "./reducer/KycExpiryWalletDowngradeReducer";
import KycBlockAfterGraceReducer from "./reducer/KycBlockAfterGraceReducer";
import RemitAMLComplianceReducer from "./reducer/RemitAMLComplianceReducer";
import IdExpiringReportsReducer from "./reducer/IdExpiringReducer";
import TargetGroupReducer from "./reducer/TargetGroupReducer";
import UnblockCardApprovedReducer from "./reducer/UnblockCardApprovedReducer";
import CardBlockReportsReducer from "./reducer/CardBlockReportsReducer";
import KYCupdateReducer from "./reducer/KYCupdateReducer";
import WalletUpgradeReducer from "./reducer/WalletUpgradeReducer";
import CustomerLoginReportReducer from "./reducer/CustomerLoginReportReducer";
import UamReportsReducer from "./reducer/UamReportsReducer";
import DailyTransactionReportReducer from "./reducer/DailyTransactionReportReducer";
import BranchManagementReportReducer from "./reducer/BranchManagementReportReducer";
import FailedTransactionReportReducer from "./reducer/FailedTxnReportReducer";
import OnBehalfSenderReportReducer from "./reducer/OnbehalfSenderReportReducer";
import MonthlyTransactionReportReducer from "./reducer/MonthlyTransactionReportReducer";
import RefundTxnReportReducer from "./reducer/RefundTxnReportReducer";
import RejectedTransactionReportReducer from "./reducer/RejectedTransactionReportReducer";
import TransactionSummaryReportReducer from "./reducer/TransactionSummaryReportReducer";
import MirsDeclinedTransactionReducer from "./reducer/MirsDeclinedTransactionReducer";
import { ECDDAmlReportReducer } from "./reducer/ECDDAmlReportReducer";
import PromoCodeSummaryReducer from "./reducer/PromoCodeSummaryReducer";
import { AMLTxnSummaryReportReducer } from "./reducer/AMLTxnsummaryReportReducer";
import CustomerRiskProfilingReducer from "./reducer/CustomerRiskProfilingReducer";
import { AMLCFTReportsReducer } from "./reducer/AMLCFTReportsReducer";
import { MsslTrackerListReportReducer } from "./reducer/MsslTrackerListReportReducer";
import OnboardingDetailReducer from "./reducer/OnboardingDetailReducer";
import MaintenanceListReportReducer from "./reducer/MaintenanceListReportReducer";
import OnboardingSummaryReducer from "./reducer/OnboardingSummaryReducer";
import { PayrollCompanyCreationReducer } from "./reducer/PayrollCompanyCreationReducer";
import GroupNameSummaryReducer from "./reducer/GroupNameSummaryReportReducer";
import PrefundReconciliationReportReducer from "./reducer/PrefundReconciliationReportReducer";
import { PayroltxnSummaryReducer } from "./reducer/PayroltxnSummaryReducer";
import PrefundDebitReportReducer from "./reducer/PrefundDebitReportReducer";
import ExchangeRateReducer from "./reducer/ExchangeRateReducer";
import PrefundCreditReportReducer from "./reducer/prefundCreditReportReducer";
import { TopupReconciliationReportReducer } from "./reducer/TopupReconciliationReportReducer";
import PrefundAmountReportReducer from "./reducer/PrefundAmountReportReducer";
import PayrollDetailReportReducer from "./reducer/PayrollDetailReportReducer";
import WalletFeatureSummaryReducer from "./reducer/WalletFeatureSummaryReducer";
import AuditTrailReportReducer from "./reducer/AuditTrailReportReducer";
import CustomerScreeningReportReducer from "./reducer/CustomerScreeingReportReducer";
import SalesReportReducer from "./reducer/SalesReportReducer";
import BoFunctionalcodeReducer from "./reducer/BoFunctionalcodeReducer";
import PrefundBalanceByCompanyReducer from "./reducer/PrefundBalanceByCompanyReducer";
import AccountSummaryReducer from "./reducer/AccountSummaryReducer";
import SmsTxnReportReducer from "./reducer/SmsTxnReportReducer";
import PayrollTxnByCompanyReducer from "./reducer/PayrollTxnByCompanyReducer";
import MarketingReportReducer from "./reducer/MarketingReportReducer";
import TransactionScreenReportReducer from "./reducer/TxnScreenReducer";
import AvgMonthlyTransactionReportReducer from "./reducer/AvgMonthlyTxnReportReducer";
import MerchantSetupReducer from "./reducer/MerchantSetupReducer";
import WalletDowngradeReportReducer from "./reducer/WalletDowngradeReportReducer";
import { TransactionHistoryReportReducer } from "./reducer/TransactionHistoryReportReducer";
import TopUpCommonReportReducer from "./reducer/TopUpCommonReportReducer";
import LanguageParameterReducer from "./reducer/LanguageParameterReducer";
import PayrollPrefundReducer from "./reducer/PayrollPrefundReducer";
import PayrollPrefundApprovalReducer from "./reducer/PayrollPrefundApprovalReducer";
import ViewPayrollPrefundReducer from "./reducer/viewPayrollPrefuncReducer";
import ManualDebitCreditReducer from "./reducer/ManualDebitCreditReducer";

const appReducer = combineReducers({
  metadataReducer: metadataReducer,
  referenceReducer: referenceReducer,
  UserCreateReducer: UserCreateReducer,
  authenticationReducer: authenticationReducer,
  idtypeReducer: idtypeReducer,
  UserGroupCreateReducer: UserGroupCreateReducer,
  FestivePackageReducer: FestivePackageReducer,
  UserRightsReducer: UserRightsReducer,
  GroupRightsReducer: GroupRightsReducer,
  walletSetUpReducer: walletSetUpReducer,
  payrollTransactionEnquiryReducer: payrollTransactionEnquiryReducer,
  payrollAccountEnquiryReducer: payrollAccountEnquiryReducer,
  CustomerOnboardingReducer: CustomerOnboardingReducer,
  CompanyMaintenanceReducer: CompanyMaintenanceReducer,
  StateCountryReducer: StateCountryReducer,
  PreFundReducer: PreFundReducer,
  ToggleSummaryReducer: ToggleSummaryReducer,
  ParameterSummaryReducer: ParameterSummaryReducer,
  NotificationSummaryReducer: NotificationSummaryReducer,
  IdemiaScoreRoutingReducer: IdemiaScoreRoutingReducer,
  ApprovalTaskReducer: ApprovalTaskReducer,
  BankMenuReducer: BankMenuReducer,
  TopUpAddReducer: TopUpAddReducer,
  NotificationMasterReducer: NotificationMasterReducer,
  NotificationChannelReducer: NotificationChannelReducer,
  AMLcomplianceReducer: AMLcomplianceReducer,
  AmlPendingCustomersReducer: AmlPendingCustomersReducer,
  LockedCustomerReducer: LockedCustomerReducer,
  ForgetPasswordAccessReducer: ForgetPasswordAccessReducer,
  LockedBackOfficeUserReducer: LockedBackOfficeUserReducer,
  staffDeviceLockReducer: staffDeviceLockReducer,
  UserLoginRecordsReducer: UserLoginRecordsReducer,
  KYCPendingCustomerReducer: KYCPendingCustomerReducer,
  UnBlockDeviceReducer: UnBlockDeviceReducer,
  DeviceMobileHistoryReducer: DeviceMobileHistoryReducer,
  CompanyUserScreenReducer: CompanyUserScreenReducer,
  globalSettingsReducer: globalSettingsReducer,
  ViewCompanyUserListReducer: ViewCompanyUserListReducer,
  PreOnboardingReducer: PreOnBoardingReducer,
  BranchDashboardReducer: BranchDashboardReducer,
  AgentGroupReducer: AgentGroupReducer,
  RemitBranchSetupReducer: RemitBranchSetupReducer,
  BankSetupReducer: BankSetupReducer,
  BankSetupCountryReducer: BankSetupCountryReducer,
  RemitAgentTagReducer: RemitAgentTagReducer,
  TerminalDashboardReducer: TerminalDashboardReducer,
  RemitPayoutCountryReducer: RemitPayoutCountryReducer,
  RemitTransactionProcessingReducer: RemitTransactionProcessingReducer,
  RemittanceFeesAndChargesReducer: RemittanceFeesAndChargesReducer,
  RemitTransactionLimitReducer: RemitTransactionLimitReducer,
  BlockCardRequestReducer: BlockCardRequestReducer,
  CardUnBlockReducer: CardUnBlockReducer,
  CardUpgradeReducer: CardUpgradeReducer,
  RemitEditOnBehalfReducer: RemitEditOnBehalfReducer,
  AmlEcddSetupReducer: AmlEcddSetupReducer,
  AmlRiskScaleReducer: AmlRiskScaleReducer,
  AmlTransactionStatisticReducer: AmlTransactionStatisticReducer,
  RemitRiskFactorReducer: RemitRiskFactorReducer,
  RemitRiskFactorStatusConfigurationReducer:
    RemitRiskFactorStatusConfigurationReducer,
  MobileTopUpReducer: MobileTopUpReducer,
  RemitRiskRatingReducer: RemitRiskRatingReducer,
  ExchangeRateReducer: ExchangeRateReducer,
  RemitHighRiskCountryReducer: RemitHighRiskCountryReducer,
  idtypeSummaryReducer: idtypeSummaryReducer,
  KYCCustomerEnquiryReducer: CustomerEnquiryReducer,
  OTPTempListReducer: OTPTempListReducer,
  DocUploadRequestReducer: DocUploadRequestReducer,
  IdDocMappingReducer: IdDocMappingReducer,
  ChangePasswordReducer: ChangePasswordReducer,
  WalletSizeSetupReducer: WalletSizeSetupReducer,
  WalletSizeBrandMappingReducer: WalletSizeBrandMappingReducer,
  CardTypeReducer: CardTypeReducer,
  CardSourceCodeReducer: CardSourceCodeReducer,
  CardPromoCodeReducer: CardPromoCodeReducer,
  CardSourcePromoLinkageReducer: CardSourcePromoLinkageReducer,
  KycExpiryWalletDowngradeReducer: KycExpiryWalletDowngradeReducer,
  KycBlockAfterGraceReducer: KycBlockAfterGraceReducer,
  RemitAMLComplianceReducer: RemitAMLComplianceReducer,
  IdExpiringReportsReducer: IdExpiringReportsReducer,
  TargetGroupReducer: TargetGroupReducer,
  PromoCodeSummaryReducer: PromoCodeSummaryReducer,
  UnblockCardApprovedReducer: UnblockCardApprovedReducer,
  CardBlockReportsReducer: CardBlockReportsReducer,
  KYCupdateReducer: KYCupdateReducer,
  WalletUpgradeReducer: WalletUpgradeReducer,
  CustomerLoginReportReducer: CustomerLoginReportReducer,
  UamReportsReducer: UamReportsReducer,
  DailyTransactionReportReducer: DailyTransactionReportReducer,
  BranchManagementReportReducer: BranchManagementReportReducer,
  FailedTransactionReportReducer: FailedTransactionReportReducer,
  OnBehalfSenderReportReducer: OnBehalfSenderReportReducer,
  MonthlyTransactionReportReducer: MonthlyTransactionReportReducer,
  RejectedTransactionReportReducer: RejectedTransactionReportReducer,
  RefundTxnReportReducer: RefundTxnReportReducer,
  TransactionSummaryReportReducer: TransactionSummaryReportReducer,
  MirsDeclinedTransactionReducer: MirsDeclinedTransactionReducer,
  ECDDAmlReportReducer: ECDDAmlReportReducer,
  AMLTxnSummaryReportReducer: AMLTxnSummaryReportReducer,
  CustomerRiskProfilingReducer: CustomerRiskProfilingReducer,
  AMLCFTReportsReducer: AMLCFTReportsReducer,
  MsslTrackerListReportReducer: MsslTrackerListReportReducer,
  OnboardingDetailReducer: OnboardingDetailReducer,
  MaintenanceListReportReducer: MaintenanceListReportReducer,
  OnboardingSummaryReducer: OnboardingSummaryReducer,
  PayrollCompanyCreationReducer: PayrollCompanyCreationReducer,
  GroupNameSummaryReducer: GroupNameSummaryReducer,
  PrefundReconciliationReportReducer: PrefundReconciliationReportReducer,
  PayroltxnSummaryReducer: PayroltxnSummaryReducer,
  PrefundDebitReportReducer: PrefundDebitReportReducer,
  PrefundCreditReportReducer: PrefundCreditReportReducer,
  TopupReconciliationReportReducer: TopupReconciliationReportReducer,
  PrefundAmountReportReducer: PrefundAmountReportReducer,
  PayrollDetailReportReducer: PayrollDetailReportReducer,
  WalletFeatureSummaryReducer: WalletFeatureSummaryReducer,
  CustomerScreeningReportReducer: CustomerScreeningReportReducer,
  SalesReportReducer: SalesReportReducer,
  BoFunctionalcodeReducer: BoFunctionalcodeReducer,
  PrefundBalanceByCompanyReducer: PrefundBalanceByCompanyReducer,
  AccountSummaryReducer: AccountSummaryReducer,
  SmsTxnReportReducer: SmsTxnReportReducer,
  PayrollTxnByCompanyReducer: PayrollTxnByCompanyReducer,
  AuditTrailReportReducer: AuditTrailReportReducer,
  MarketingReportReducer: MarketingReportReducer,
  TransactionScreenReportReducer: TransactionScreenReportReducer,
  AvgMonthlyTransactionReportReducer: AvgMonthlyTransactionReportReducer,
  MerchantSetupReducer: MerchantSetupReducer,
  WalletDowngradeReportReducer: WalletDowngradeReportReducer,
  TransactionHistoryReportReducer: TransactionHistoryReportReducer,
  TopUpCommonReportReducer: TopUpCommonReportReducer,
  LanguageParameterReducer: LanguageParameterReducer,
  PayrollPrefundReducer: PayrollPrefundReducer,
  PayrollPrefundApprovalReducer: PayrollPrefundApprovalReducer,
  ViewPayrollPrefundReducer: ViewPayrollPrefundReducer,
  ManualDebitCreditReducer: ManualDebitCreditReducer,
});

export const store = createStore(appReducer, applyMiddleware(ReduxThunk));
