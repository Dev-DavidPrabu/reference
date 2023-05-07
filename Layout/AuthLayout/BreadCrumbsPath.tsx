export const breadCrumbsPath = (location: string) => {
  switch (location) {
    case "/dashboard/user-Access-Management/User": {
      return {
        path: "Security Management",
        route: ["User Access Management", "User"],
      };
    }
    case "/dashboard/update-profile": {
      return {
        path: "dashboard",
        route: ["Change Password"],
      };
    }
    case "/dashboard/Profile-image-change": {
      return {
        path: "dashboard",
        route: ["Update Profile Image"],
      };
    }
    case "/dashboard/user-Access-Management/User-Groups": {
      return {
        path: "Security Management",
        route: ["User Access Management", "User-Groups"],
      };
    }
    case "/dashboard/user-Access-Management/User-Groups/Add-User-Group": {
      return {
        path: "Security Management",
        route: ["User Access Management", "Add-User-Groups"],
      };
    }
    case "/dashboard/user-Access-Management/User-Rights": {
      return {
        path: "Security Management",
        route: ["User Access Management", "User-Rights"],
      };
    }
    case "/dashboard/user-Access-Management/Group-Rights": {
      return {
        path: "Security Management",
        route: ["User Access Management", "Group-Rights"],
      };
    }
    case "/dashboard/User-Account-Unlock/block-mobile-device": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Lock Account / Device "],
      };
    }
    case "/dashboard/reference-data": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Reference Data Setup"],
      };
    }
    case "/dashboard/wallet/addWalletFeature": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet", "Wallet Feature", "Add"],
      };
    }
    case "/dashboard/wallet/walletFeatureSummary": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet", "Wallet Feature Summary"],
      };
    }
    case "/dashboard/ID-Type-Routing": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "ID Type Routing"],
      };
    }
    case "/dashboard/Functional-code": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Function Code Setup"],
      };
    }
    case "/dashboard/SRF/IdExpiring-Reports": {
      return {
        path: "Reports",
        route: ["ID Expiring Reports"],
      };
    }
    case "/dashboard/remittanceTransactionReport/MIRS-Declined-Transaction-Report": {
      return {
        path: "Reports",
        route: [
          "Remittance Transaction Report",
          "MIRS Declined Transaction Report",
        ],
      };
    }
    case "/dashboard/remittanceTransactionReport/RejectedTransactionReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "Rejected Transaction Report"],
      };
    }
    case "/dashboard/SRF/SRFBlockCard": {
      return {
        path: "Reports",
        route: ["SRF Block Card"],
      };
    }
    case "/dashboard/SRF/SRFUnBlockCard": {
      return {
        path: "Reports",
        route: ["SRF UnBlockCard"],
      };
    }
    case "/dashboard/SRF/KYCUpdateCard": {
      return {
        path: "Reports",
        route: ["SRF KYC Update Card"],
      };
    }
    case "/dashboard/SRF/WalletUpgrade": {
      return {
        path: "Reports",
        route: ["SRF WalletUpgrade"],
      };
    }

    case "/dashboard/AmlCustomer-Approved": {
      return {
        path: "Reports",
        route: ["AML Customer Approved"],
      };
    }
    case "/dashboard/UAMreport": {
      return {
        path: "Reports",
        route: ["Security Reports", "UAM Report"],
      };
    }
    case "/dashboard/CustomerLoginReport": {
      return {
        path: "Reports",
        route: ["Security Reports", "Customer Login Report"],
      };
    }
    case "/dashboard/BranchManagementReport": {
      return {
        path: "Reports",
        route: ["Security Reports", "Branch Management Report"],
      };
    }
    case "/dashboard/DailyTransactionReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "Daily Transaction Report"],
      };
    }
    case "/dashboard/MonthlyTransactionReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "Monthly Transaction Report"],
      };
    }
    case "/dashboard/RefundTransactionReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "Refund Transaction Report"],
      };
    }
    case "/dashboard/OnBehalfSenderReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "On Behalf Sender Report"],
      };
    }
    case "/dashboard/FailedTransactionReport": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "FailedTransactionReport"],
      };
    }
    case "/dashboard/AvgDailyMonthlyTxnComparsionReport": {
      return {
        path: "Reports",
        route: [
          "Remittance Transaction Report",
          "Average / Daily or Monthly Transaction Comparsion Report",
        ],
      };
    }
    case "/dashboard/AMLCFTReports": {
      return {
        path: "Reports",
        route: ["Remittance AML Compliance Reports", "AML CFT Report"],
      };
    }
    case "/dashboard/CustomerRiskProfilingReport": {
      return {
        path: "Reports",
        route: [
          "Remittance AML Compliance Reports",
          "Customer Risk Profiling Report",
        ],
      };
    }
    case "/dashboard/ECDDReport": {
      return {
        path: "Reports",
        route: ["Remittance AML Compliance Reports", "ECDD Report"],
      };
    }
    case "/dashboard/CustomerRiskSummaryReport": {
      return {
        path: "Reports",
        route: [
          "Remittance AML Compliance Reports",
          "Customer Risk Summary Report",
        ],
      };
    }
    case "/dashboard/walletDowngradeReport": {
      return {
        path: "Reports",
        route: ["LifeCycle Reports", "Wallet Downgrade Report"],
      };
    }
    case "/dashboard/topUpCommonReport": {
      return {
        path: "Reports",
        route: ["LifeCycle Reports", "TopUp Common Report"],
      };
    }
    case "/dashboard/TransactionSummaryReport": {
      return {
        path: "Reports",
        route: [
          "Remittance AML Compliance Reports",
          "Transaction Summary Report",
        ],
      };
    }
    case "/dashboard/ID-Type-Routing/ID-Type-Edit": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "ID Type Routing", "ID Type Edit"],
      };
    }
    case "/dashboard/Functional-code/Functional-code-Edit": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Function Code", "Function Code Setup-Edit"],
      };
    }
    case "/dashboard/ID-Type-Routing/ID-Type-Create": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "ID Type Routing", "ID Type Create"],
      };
    }
    case "/dashboard/Functional-code/FunctionalCode-Create": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Function Code Setup", "Functional Code-Create"],
      };
    }
    case "/dashboard/Payroll-Company-Management/company-maintenance": {
      return {
        path: "Payroll",
        route: ["Company Maintenance"],
      };
    }
    case "/dashboard/Payroll-Company-Management/company-maintenance/Edit-Company-Maintenance": {
      return {
        path: "Payroll",
        route: ["Company Maintenance", "Edit Company Maintenance"],
      };
    }
    case "/dashboard/payroll-account": {
      return {
        path: "Payroll",
        route: ["Company Account Enquiry"],
      };
    }
    case "/dashboard/Payroll-Account/Edit-Payroll": {
      return {
        path: "Payroll",
        route: ["Company Account Enquiry", "View Company Account Enquiry"],
      };
    }
    case "/dashboard/account-transaction": {
      return {
        path: "Payroll",
        route: ["Top Up Prefund Account"],
      };
    }
    case "/dashboard/Company-UserScreen/Company-User": {
      return {
        path: "Payroll",
        route: ["Link Company User"],
      };
    }
    case "/dashboard/Company-UserScreen/Company-User/Add-Company-User-List": {
      return {
        path: "Payroll",
        route: ["Link Company User", "Company User", "Add Company User List"],
      };
    }
    case "/dashboard/Company-UserScreen/Company-User/View-Company-User-List": {
      return {
        path: "Payroll",
        route: ["Link Company User", "Users"],
      };
    }
    case "/dashboard/Company-UserScreen/Company-User/View-Company-User-List/View-Company-User-Add": {
      return {
        path: "Payroll",
        route: ["Link Company User", "Users", "Add Users"],
      };
    }
    case "/dashboard/payroll-enquiry": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Company Prefund Account Enquiry"],
      };
    }
    case "/dashboard/Payroll-Company-Management/company-maintenance/Add-Company-Maintenance": {
      return {
        path: "Payroll",
        route: ["Company Maintenance", "Add-Company-Maintenance"],
      };
    }
    case "/dashboard/Payroll-Company-Management/company-maintenance/Add-Company-Enquiry": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Company Account Enquiry", "Add-Company-Enquiry"],
      };
    }
    case "/dashboard/reference-data/reference-data-view": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Reference Data Setup", "Reference Data View"],
      };
    }
    case "/dashboard/reference-data/create-new-code": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Reference Data Setup", "Create New Code"],
      };
    }
    case "/dashboard/reference-data/edit-code": {
      return {
        path: "Setup and Configuration",
        route: ["BO-Setups", "Reference Data Setup", "Edit Code"],
      };
    }
    case "/dashboard/User-Account-Unlock/unlock": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Unlock Customer Mobile or Device"],
      };
    }
    case "/dashboard/User-Account-Unlock/unlock-staff": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Locked Backoffice User"],
      };
    }
    case "/dashboard/eKYC-Pending-Customer": {
      return {
        path: "Setup and Configaration",
        route: ["Compliance", "eKYC Pending Customer"],
      };
    }
    case "/dashboard/KYC-Customer": {
      return {
        path: "Others",
        route: ["Pending Onboarding"],
      };
    }
    case "/dashboard/Merchant-setup": {
      return {
        path: "Others",
        route: ["Merchant Setup"],
      };
    }

    case "/dashboard/OTP-List": {
      return {
        path: "Others",
        route: ["OTP List Screen"],
      };
    }
    case "/dashboard/KYC-Customer/Document-Details": {
      return {
        path: "Others",
        route: ["Pending Onboarding", "Document Details"],
      };
    }
    case "/dashboard/KYC-Customer/View-Customer-Profile": {
      return {
        path: "Others",
        route: ["Pending Onboarding", "View Customer Profile"],
      };
    }
    case "/dashboard/KYC-Customer-Enquiry": {
      return {
        path: "Others",
        route: ["Customer Enquiry"],
      };
    }
    case "/dashboard/KYC-Customer-Enquiry/View-Customer-Enquiry": {
      return {
        path: "Others",
        route: ["Customer Enquiry", "View Customer Profile"],
      };
    }
    case "/dashboard/KYC-Customer-Enquiry/Edit-Customer-Enquiry": {
      return {
        path: "Others",
        route: ["Customer Enquiry", "Edit Customer Profile"],
      };
    }
    case "/dashboard/KYC-Customer-Enquiry/Customer-Enquiry-History": {
      return {
        path: "Others",
        route: ["Customer Enquiry", "Customer Profile History"],
      };
    }
    case "/dashboard/KYC-Customer-Enquiry/Customer-Wallet-History": {
      return {
        path: "Others",
        route: ["Customer Enquiry", "Customer Wallet History"],
      };
    }
    case "/dashboard/Mobile-TopUp-Summary-DashBoard": {
      return {
        path: "Others",
        route: ["Mobile Topup Summary"],
      };
    }
    case "/dashboard/Pending-AML-Customers": {
      return {
        path: "Other",
        route: ["Pending AML Customers"],
      };
    }
    case "/dashboard/Mobile-TopUp-Summary": {
      return {
        path: "Other",
        route: ["Mobile TopUp Summary"],
      };
    }
    case "/dashboard/Pending-AML-Customers/AML-Customer-Info": {
      return {
        path: "Other",
        route: ["Pending AML Customers", "AML Customer Info"],
      };
    }
    case "/dashboard/Topup-Add": {
      return {
        path: "Payroll",
        route: ["Topup Add"],
      };
    }
    case "/dashboard/Topup-Add/Topup-BatchDetails": {
      return {
        path: "Payroll",
        route: ["Topup Add", "TopUp Batch Details"],
      };
    }
    case "/dashboard/Topup-Add/Topup-RejectionReport": {
      return {
        path: "Payroll",
        route: ["Topup Add", "Topup Rejection Report"],
      };
    }
    case "/dashboard/prefund-Transaction-enquiry": {
      return {
        path: "Payroll",
        route: ["Prefund Transaction Enquiry"],
      };
    }
    case "/dashboard/PayrollPrefund": {
      return {
        path: "Payroll",
        route: ["Prefund", "Payroll Prefund"],
      };
    }
    case "/dashboard/home": {
      return {
        path: "Setup and Configuration",
        route: ["company Operation", "Approval Task"],
      };
    }
    case "/dashboard/Wallet-Size-Setup": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet Size Setup"],
      };
    }
    case "/dashboard/Wallet-Size-Brand-Mapping": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet Size Brand Mapping"],
      };
    }
    case "/dashboard/Wallet-Size-Setup/Edit-Wallet-Size": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet Size Setup", "Edit Wallet Size"],
      };
    }
    case "/dashboard/Wallet-Size-Brand-Mapping/Edit": {
      return {
        path: "Setup and Configuration",
        route: ["Wallet Size Brand Mapping", "Edit"],
      };
    }
    case "/dashboard/prefund-Account-enquiry": {
      return {
        path: "Setup and Configuration",
        route: ["company Operation", "prefund Account enquiry"],
      };
    }
    case "/dashboard/User-Account-Unlock/Customer-Login-Records": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Customer-Login-Records"],
      };
    }
    case "/dashboard/User-Account-Unlock/Locked-Account-History": {
      return {
        path: "Security Management",
        route: ["Device Management", "Locked-Account-History"],
      };
    }
    case "/dashboard/User-Account-Unlock/Locked-Device-History": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Locked-Device-History"],
      };
    }
    case "/dashboard/User-Account-Unlock/Global-Settings-Mobile": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Global-Settings-Mobile"],
      };
    }
    case "/dashboard/User-Account-Unlock/Global-Settings-Device": {
      return {
        path: "Security Management",
        route: ["Security Operations", "Global-Settings-Device"],
      };
    }
    case "/dashboard/remit-setup/Payout-Country": {
      return {
        path: "Remittance",
        route: ["Remittance", "Payout Country"],
      };
    }
    case "/dashboard/remit-setup/Edit-Payout-Country": {
      return {
        path: "Remittance",
        route: ["Remittance", "Payout Country", "Edit Payout Country"],
      };
    }
    case "/dashboard/remit-setup/Add-Payout-Country": {
      return {
        path: "Remittance",
        route: ["Remittance", "Payout Country", "Add Payout Country"],
      };
    }
    case "/dashboard/remit-setup/Bank-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance", "Bank Setup"],
      };
    }
    case "/dashboard/remit-setup/View-Bank-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance", "Bank Setup", "View Bank Setup"],
      };
    }
    case "/dashboard/remit-setup/Branch-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance", "Branch Setup"],
      };
    }
    case "/dashboard/remit-setup/Edit-Branch-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance", "Branch Setup", "Edit Branch Setup"],
      };
    }
    case "/dashboard/remit-setup/Paying-Group": {
      return {
        path: "Remittance",
        route: ["Remittance", "Paying Group"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Transaction-Processing": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Processing"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Transaction-Enquiry": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Enquiry Details"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Fees-And-Charges": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Remittance Fees And Charges"],
      };
    }
    case "/dashboard/remit-setup/Edit-On-Behalf-Details": {
      return {
        path: "Remittance",
        route: ["Remittance", "Edit On Behalf Details"],
      };
    }
    case "/dashboard/remit-setup/On-Behalf-Setup-Details": {
      return {
        path: "Remittance",
        route: ["Remittance", "On Behalf Setup"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Transaction-Status-Dashboard": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Status Dashboard"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Transaction-Status-Limit": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Limit"],
      };
    }
    case "/dashboard/remit-setup/Transaction-Status-Limit": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Limit Setup"],
      };
    }
    case "/dashboard/remit-setup/Remittance-Transaction-Status": {
      return {
        path: "Remittance",
        route: ["Remittance", "Remittance Transaction Status"],
      };
    }
    case "/dashboard/remit-setup/Edit-Paying-Group": {
      return {
        path: "Remittance",
        route: ["Remittance", "Edit Paying Group"],
      };
    }
    case "/dashboard/remit-setup/ECDD-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "ECDD Setup"],
      };
    }
    case "/dashboard/remit-setup/Risk-Score": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Score"],
      };
    }
    case "/dashboard/remit-setup/Risk-Score/Add-Risk-Score": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Score", "Add Risk Score"],
      };
    }
    case "/dashboard/remit-setup/Risk-Score/Edit-Risk-Score": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Score", "Edit Risk Score"],
      };
    }
    case "/dashboard/remit-setup/Transaction-Statistics": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Transaction Statistics"],
      };
    }
    case "/dashboard/remit-setup/Transaction-Statistics/Add-Transaction-Statistics": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Transaction Statistics",
          "Add Transaction Statistics",
        ],
      };
    }
    case "/dashboard/remit-setup/Transaction-Statistics/Edit-Transaction-Statistics": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Transaction Statistics",
          "Edit Transaction Statistics",
        ],
      };
    }
    case "/dashboard/remit-setup/Risk-Factor": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Factor"],
      };
    }
    case "/dashboard/remit-setup/Risk-Factor/Edit-Risk-Factor": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Factor", "Edit Risk Factor"],
      };
    }
    case "/dashboard/remit-setup/Risk-Factor-Status-Configuration": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Factor Status Configuration"],
      };
    }
    case "/dashboard/remit-setup/Risk-Rating": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Rating"],
      };
    }
    case "/dashboard/remit-setup/Risk-Rating/Add-Risk-Rating": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Rating", "Add Risk Rating"],
      };
    }
    case "/dashboard/remit-setup/Risk-Rating/Edit-Risk-Rating": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Risk Rating", "Edit Risk Rating"],
      };
    }
    case "/dashboard/remit-setup/Exchange-Rate": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Exchange Rate"],
      };
    }
    case "/dashboard/remit-setup/High-Risk-Country-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "High Risk Country Setup"],
      };
    }
    case "/dashboard/remit-setup/Remit-AML-Compliance-Config": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Remit AML Compliance Config"],
      };
    }
    case "/dashboard/marketing/Target-Group-Setup": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Target Group Setup"],
      };
    }
    case "/dashboard/marketing/Target-Group-Setup/Add-Target-Group-By-Customers": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Target Group Setup",
          "Add Target Group By Customers",
        ],
      };
    }
    case "/dashboard/marketing/Target-Group-Setup/Edit-Target-Group-By-Customers": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Target Group Setup",
          "Edit Target Group By Customers",
        ],
      };
    }
    case "/dashboard/marketing/Promo-Code-Summary": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Promo Code Summary"],
      };
    }
    case "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code": {
      return {
        path: "Remittance",
        route: ["Remittance BO Setup", "Promo Code Summary", "Add Promo Code"],
      };
    }
    case "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code-Setup": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Promo Code Summary",
          "Add Promo Code Setup",
        ],
      };
    }
    case "/dashboard/marketing/Promo-Code-Summary/Edit-Promo-Code-Setup": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Promo Code Summary",
          "Edit Promo Code Setup",
        ],
      };
    }
    case "/dashboard/marketing/Promo-Code-Summary/View-Promo-Code-Setup": {
      return {
        path: "Remittance",
        route: [
          "Remittance BO Setup",
          "Promo Code Summary",
          "View Promo Code Setup",
        ],
      };
    }
    case "/dashboard/Setup-And-Configuration/ID-Doc-Mapping": {
      return {
        path: "Setup And Configuration",
        route: ["Brand - ID Doc Mapping"],
      };
    }
    case "/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Add": {
      return {
        path: "Setup And Configuration",
        route: ["Brand - ID Doc Mapping", " ID Doc Mapping Add"],
      };
    }
    case "/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Edit": {
      return {
        path: "Setup And Configuration",
        route: ["Brand - ID Doc Mapping", "ID Doc Mapping Edit"],
      };
    }
    case "/dashboard/Notification-Master-Setup": {
      return {
        path: "Setup And Configuration",
        route: ["Notification Setup", "Notification Master Setup"],
      };
    }
    case "/dashboard/notification-channel": {
      return {
        path: "Setup And Configuration",
        route: ["Notification Setup", "Notification Channel Setup"],
      };
    }
    case "/dashboard/SRF/Block-Card-Request": {
      return {
        path: "Card Operations",
        route: ["Block Card Request"],
      };
    }
    case "/dashboard/SRF/Add-Block-Card-Request": {
      return {
        path: "Card Operations",
        route: ["Add Block Card Request", "Add"],
      };
    }
    case "/dashboard/SRF/View-Block-Card-Request": {
      return {
        path: "Card Operations",
        route: ["Block Card Request", "View"],
      };
    }
    case "/dashboard/SRF/View-Block-Customer": {
      return {
        path: "Card Operations",
        route: ["Block Card Customer", "View"],
      };
    }
    case "/dashboard/SRF/View-UnBlock-Customer": {
      return {
        path: "Card Operations",
        route: ["UnBlock Card Customer", "View"],
      };
    }
    case "/dashboard/SRF/Card-Upgrade-View-Customer": {
      return {
        path: "Card Operations",
        route: ["Wallet upgrade Customer", "View"],
      };
    }
    case "/dashboard/SRF/Doc-Upload-Customer-View": {
      return {
        path: "Card Operations",
        route: ["Doc Upload Customer", "View"],
      };
    }
    case "/dashboard/SRF/Card-Unblock-View-Details": {
      return {
        path: "Card Operations",
        route: ["Unblock Card Request", "View"],
      };
    }
    case "/dashboard/SRF/Card-Upgrade-View-Details": {
      return {
        path: "Card Operations",
        route: ["Upgrade Card Request", "View"],
      };
    }
    case "/dashboard/SRF/Doc-Upload-Request": {
      return {
        path: "Wallet Operation",
        route: ["SRF", "Doc Upload Request"],
      };
    }
    case "/dashboard/SRF/Expiry-Wallet-Downgrade": {
      return {
        path: "Wallet Operation",
        route: ["SRF", "KYC Expiry Wallet Downgrade"],
      };
    }
    case "/dashboard/SRF/Doc-Upload-Request-View": {
      return {
        path: "Wallet Operation",
        route: ["SRF", "Doc Upload Request View"],
      };
    }
    case "/dashboard/SRF/Doc-Upload-Request-Add": {
      return {
        path: "Wallet Operation",
        route: ["SRF", "Doc Upload Request Add"],
      };
    }
    case "/dashboard/SRF/Block-After-Grace-Period": {
      return {
        path: "Card Operation",
        route: ["KYC Block After Grace Period"],
      };
    }

    case "/dashboard/SRF/Close-Wallet-Account": {
      return {
        path: "Card Operations",
        route: ["Close Wallet Account"],
      };
    }
    case "/dashboard/SRF/Card-Unblock": {
      return {
        path: "Card Operations",
        route: ["Unblock Card Request"],
      };
    }
    case "/dashboard/SRF/Card-Upgrade": {
      return {
        path: "Card Operations",
        route: ["Upgrade Card Request"],
      };
    }
    case "/dashboard/SRF/Add-Card-Replacement": {
      return {
        path: "Card Operations",
        route: ["Add Card Replacement", "Add"],
      };
    }
    case "/dashboard/SRF/View-Card-Replacement": {
      return {
        path: "Card Operations",
        route: ["Card Replacement", "View"],
      };
    }
    case "/dashboard/SRF/Add-Card-Unblock": {
      return {
        path: "Card Operations",
        route: ["Unblock Card Request", "Add"],
      };
    }
    case "/dashboard/PreOnBoarding": {
      return {
        path: "Other",
        route: ["PreOnBoarding"],
      };
    }
    case "/dashboard/PreOnBoarding-Customer": {
      return {
        path: "Other",
        route: ["PreOnBoarding-Customer"],
      };
    }

    case "/dashboard/notification-master-view": {
      return {
        path: "Others",
        route: ["View Notification Master"],
      };
    }

    case "/dashboard/notification-channel-edit": {
      return {
        path: "Others",
        route: ["Edit Notification Channel"],
      };
    }
    case "/dashboard/notification-channel-view": {
      return {
        path: "Others",
        route: ["View Notification Channel"],
      };
    }
    case "/dashboard/Bulk-Upload-Customer": {
      return {
        path: "Other",
        route: ["Pre-OnBoarding", "Bulk Upload Customer"],
      };
    }
    case "/dashboard/Add-Customer": {
      return {
        path: "Other",
        route: ["Pre-OnBoarding", "Add Customer"],
      };
    }
    case "/dashboard/Branch-Management/Agent-Group": {
      return {
        path: "Branch Management",
        route: ["Agent Group"],
      };
    }
    case "/dashboard/Branch-Management/Agent-Group/Edit-Agent-Group": {
      return {
        path: "Branch Management",
        route: ["Agent Group", "Edit Agent Group"],
      };
    }
    case "/dashboard/Branch-Management/Agent-Group/Add-Agent-Group": {
      return {
        path: "Branch Management",
        route: ["Agent Group", "Add Agent Group"],
      };
    }
    case "/dashboard/Branch-Management/Branch-Dashboard": {
      return {
        path: "Branch Management",
        route: ["Branch Dashboard"],
      };
    }
    case "/dashboard/Idtype-Summary": {
      return {
        path: "IdType",
        route: ["ID Type"],
      };
    }
    case "/dashboard/Add-Idtype-Summary": {
      return {
        path: "IdType",
        route: ["Add ID Type"],
      };
    }
    case "/dashboard/Edit-Idtype-Summary": {
      return {
        path: "IdType",
        route: ["Edit ID Type"],
      };
    }
    case "/dashboard/View-Idtype-Summary": {
      return {
        path: "IdType",
        route: ["View ID Type"],
      };
    }
    case "/dashboard/Branch-Management/Branch-Dashboard/Add-Branch": {
      return {
        path: "Branch Management",
        route: ["Branch Dashboard", "Add Branch"],
      };
    }
    case "/dashboard/Branch-Management/Branch-Dashboard/Edit-Branch": {
      return {
        path: "Branch Management",
        route: ["Branch Dashboard", "Edit-Branch"],
      };
    }
    case "/dashboard/Branch-Management/Terminal-Dashboard": {
      return {
        path: "Branch Management",
        route: ["E-Terminal Dashboard"],
      };
    }

    case "/dashboard/Branch-Management/Terminal-Dashboard/Add-ETerminal": {
      return {
        path: "Branch Management",
        route: ["E-Terminal Dashboard", "Add ETerminal"],
      };
    }
    case "/dashboard/Branch-Management/Terminal-Dashboard/Edit-ETerminal": {
      return {
        path: "Branch Management",
        route: ["E-Terminal Dashboard", "Edit ETerminal"],
      };
    }
    case "/dashboard/bank-Payment-Gateway-Mapping": {
      return {
        path: "Others",
        route: ["FPX Bank Setup"],
      };
    }
    case "/dashboard/bank-Vendor-Mapping/Add-Bank": {
      return {
        path: "Others",
        route: ["FPX Bank Setup", "Add Bank"],
      };
    }
    case "/dashboard/bank-Vendor-Mapping/View-Bank": {
      return {
        path: "Others",
        route: ["FPX Bank Setup", "View Bank"],
      };
    }
    case "/dashboard/parameter-summary": {
      return {
        path: "Others",
        route: ["Parameter Summary"],
      };
    }
    case "/dashboard/Notification-Summary": {
      return {
        path: "Others",
        route: ["Notification Summary"],
      };
    }
    case "/dashboard/Toggle-Summary": {
      return {
        path: "Others",
        route: ["Toggle Summary"],
      };
    }
    case "/dashboard/Toggle-Summary/Toggle-Summary-Edit": {
      return {
        path: "Others",
        route: ["Toggle Summary", "Toggle Summary Edit"],
      };
    }
    case "/dashboard/edit-summary-notification": {
      return {
        path: "Others",
        route: ["Notification Summary", "Edit Summary"],
      };
    }
    case "/dashboard/edit-summary-parameter": {
      return {
        path: "Others",
        route: ["Parameter Summary", "Edit Summary"],
      };
    }
    case "/dashboard/AMLcompliance-config": {
      return {
        path: "Others",
        route: ["AMLCompliance Config"],
      };
    }
    case "/dashboard/Account-Summary": {
      return {
        path: "Account and Transaction",
        route: ["Account Summary"],
      };
    }
    case "/dashboard/Account-vendor/Add-Account": {
      return {
        path: "Others",
        route: ["Account and Transaction", "Add Account"],
      };
    }
    case "/dashboard/View-vendor/View-Account": {
      return {
        path: "Others",
        route: ["Account and Transaction", "View Account"],
      };
    }
    case "/dashboard/Edit-vendor/Edit-Account": {
      return {
        path: "Others",
        route: ["Account and Transaction", "Edit Account"],
      };
    }
    case "/dashboard/transaction-report": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "Transaction Summary Report"],
      };
    }
    case "/dashboard/end-of-day-report": {
      return {
        path: "Reports",
        route: ["Remittance Transaction Report", "End of Day Report"],
      };
    }
    case "/dashboard/OnBoardingSummaryReport": {
      return {
        path: "Reports",
        route: ["OnBoarding Report", "OnBoarding Summary Report"],
      };
    }
    case "/dashboard/OnBoardingDetailReport": {
      return {
        path: "Reports",
        route: ["OnBoarding Report", "OnBoarding Detail Report"],
      };
    }

    case "/dashboard/MSSLTrackerListReport": {
      return {
        path: "Reports",
        route: ["OnBoarding Report", "MSSLTracker List Report"],
      };
    }

    case "/dashboard/MaintenanceListReport": {
      return {
        path: "Reports",
        route: ["OnBoarding Report", "Maintenance List Report"],
      };
    }

    case "/dashboard/GroupNameSummaryReport": {
      return {
        path: "Reports",
        route: ["OnBoarding Report", "GroupName Summary Report"],
      };
    }
    case "/dashboard/CustomerScreeningReport": {
      return {
        path: "Reports",
        route: ["Onboarding Reports", "Customer screening report"],
      };
    }
    case "/dashboard/MarketingReport": {
      return {
        path: "Reports",
        route: ["Onboarding Reports", "Marketing report"],
      };
    }
    case "/dashboard/salesReport": {
      return {
        path: "Reports",
        route: ["Onboarding Reports", "Sales Report"],
      };
    }

    case "/dashboard/PrefundReconciliationReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Prefund Reconciliation Report"],
      };
    }

    case "/dashboard/PayrollCompanyCreation": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Payroll Company Creation"],
      };
    }

    case "/dashboard/TopupReconciliationReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Topup Reconciliation Report"],
      };
    }
    case "/dashboard/PayrollSummaryReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Payroll Transaction Summary Report"],
      };
    }
    case "/dashboard/PayrollDetailReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Payroll Transaction Detail Report"],
      };
    }
    case "/dashboard/PayrollTxnByCompany": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Payroll Transaction By Company Report"],
      };
    }
    case "/dashboard/PrefundAmountReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Prefund Amount Report"],
      };
    }
    case "/dashboard/PrefundDebitReport​": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Prefund Debit Report"],
      };
    }
    case "/dashboard/PrefundCreditReport​": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Prefund Credit Report​​"],
      };
    }
    case "/dashboard/PrefundBalanceByCompany": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Prefund Balance By Company"],
      };
    }
    case "/dashboard/auditTrialReport": {
      return {
        path: "Reports",
        route: ["Audit Trail Report"],
      };
    }
    case "/dashboard/SmsTransactionReport": {
      return {
        path: "Reports",
        route: ["SMS Transaction Report"],
      };
    }
    case "/dashboard/TransactionHistoryReport": {
      return {
        path: "Reports",
        route: ["Payroll Report", "Transaction History Report"],
      };
    }

    default: {
      return { path: "", route: ["", ""] };
    }
  }
};
