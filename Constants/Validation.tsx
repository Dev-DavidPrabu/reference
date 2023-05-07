import validate from "validate.js";

const constraints_new: any = {
  required: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty",
    },
  },
  rupees: {
    presence: {
      allowEmpty: false,
      message: "^  can't be 0.",
    },
    format: {
      pattern: /^[1-9]\d*$/,
      message: "^ cannot be 0",
    },
  },
  transactionType: {
    presence: {
      allowEmpty: false,
      message: "^  is mandatory",
    },
  },
  seasonNumber: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 8,
      message: "^ must have 8 characters only.",
    },
  },
  seasonCode: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 8,
      message: "^ must have 8 characters only.",
    },
  },
  seasonDescription: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  startDate: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },
  ScreeningType: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },
  MatchType: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  userGroupName: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    email: {
      message: "^ not a valid email",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty",
    },
    format: {
      pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
      message:
        "^ must be 8 characters long with at least one uppercase letter and one number",
    },
    length: {
      minimum: 8,
      message:
        "^ must be 8 characters long with at least one uppercase letter and one number",
    },
  },

  wallettype: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 5,
      message: "^ must have 5 characters only.",
    },
  },
  walletdescription: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },

  visaNumber: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z0-9]+$/,
      message: "^ can have only alphabets and numbers.",
    },
  },

  companyname: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-z0-9\s'-,/]*$/i,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  branchname: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-z0-9\s'-,/]*$/i,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  companyCode: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-z0-9\s'-,/]*$/i,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 20,
      message: "^ must have 20 characters only.",
    },
  },
  companyregistrationno: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 100,
      message: "^ must have 100 characters only.",
    },
  },
  address1: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 100,
      message: "^ must have 100 characters only.",
    },
  },
  postalCode: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[0-9]+$/,
      message: "^ can have only numers.",
    },
    length: {
      maximum: 10,
      message: "^ must have 10 characters only.",
    },
  },
  code: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 1,
      message: "^ must have characters only.",
    },
  },
  city: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 50,
      message: "^ must have 50 characters only.",
    },
  },
  state: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 50,
      message: "^ must have 50 characters only.",
    },
  },
  authorizerName: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 50,
      message: "^ must have 50 characters only.",
    },
  },
  companyEmail: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    email: {
      message: "^ not a valid email",
    },
  },
  companyphoneno: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9]+$/,
      message: "^ can have only numbers.",
    },
    length: {
      minimum: 8,
      maximum: 15,
      message: "^ minimum 8 or maximum 15 numbers",
    },
  },
  status: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  userId: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  notEmptyValue: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  fullname: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 50,
      message: "^ must have 50 characters only.",
    },
  },
  userfullName: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  groupName: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },

  functionName: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },

  mobileno: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },

    length: {
      maximum: 15,
      message: "^ maximum 15 numbers",
    },
  },
  malaysiaMobileno: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },

    length: {
      maximum: 15,
      message: "^ maximum 15 numbers",
    },
  },
  malaysiaMobilenoCompanymaintenance: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },

    length: {
      minimum: 8,
      maximum: 15,
      message: "^ minimum 8 or maximum 15 numbers",
    },
  },
  emailid: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    email: {
      message: "^ is not valid",
    },
  },

  notificationDescription: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: "^ can have only alphabets.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  remarks: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    length: {
      maximum: 150,
      message: "^ must have 150 characters only.",
    },
  },
  notificationId: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },
  notificationChannel: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },
  notificaitonNewLanguage: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  reason: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  deviceid: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },

  newpassword: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
      message:
        "^ must be at least 8 charater with one uppercase, one lowercase, one special character and one number",
    },
    length: {
      minimum: 8,
      maximum: 25,
      message: "^ must have at least 8 to 25 characters",
    },
  },
  mobileNum: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },
  },
  mobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },
  },
  deviceId: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
  },

  endDate: {
    presence: {
      allowEmpty: false,
      message: "^  can't be empty.",
    },
    format: {
      pattern: /^([a-zA-Z0-9 _-]+)$/,
      message: "^ can have only alphanumeric",
    },
  },
  UserType: {
    presence: {
      allowEmpty: false,
      message: "Only Company User type can be linked",
    },
    format: {
      pattern: /^([a-zA-Z0-9 _-]+)$/,
      message: "Only Company User type can be linked",
    },
    length: {
      minimum: 6,
      message: "Only Company User type can be linked",
    },
  },
  agentGroupMandatoryFields: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  mobileNumberAgetGroup: {
    length: {
      minimum: 5,
      message: "^ is not valid.",
    },
  },
  emailAddressAgentGroup: {
    email: {
      required: true,
      email: true,
      regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
      message: "^ is not valid.",
    },
  },
  customerEditMandatoryFields: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty",
    },
  },
  emailAddressCustomerEdit: {
    email: {
      required: false,
      email: true,
      regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
      message: "^ is not valid",
    },
  },
  emailAddressPreOnboarding: {
     email: {
      required: false,
      email: true, 
      message: "^ is not valid",
    },
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
    format: {
      pattern: /\b[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}\b/i,
      message: "^ is not valid",
    },
  },
  promoCodeMandatoryFields: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  promoCodeField: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },
  },
  forgotPasswordResetEmailId: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
    email: {
      required: true,
      email: true,
      regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
      message: "^ is not valid.",
    },
  },
  agentGroupCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  branchName: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  branchAddress: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  latitude: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  branchCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  reasonStatus: {
    presence: {
      allowEmpty: false,
      message: "^ can't be dummy.",
    },
    length: {
      maximum: 50,
      message: "^ must have 50 characters only.",
    },
  },
  branchMobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },
    length: {
      maximum: 15,
      message: "^ maximum 10 numbers",
    },
  },
  primaryMobileNumber: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
    format: {
      pattern: /[0-9*#+]+$/,
      message: "^ can have only numbers.",
    },
    length: {
      minimum: 9,
      maximum: 10,
      message: "^ minimum 9 numbers",
    },
  },
  longitude: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  mid: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  countryCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  agentCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  statusCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  payingGroupCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  paymentMode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  notes: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  paymentMethodCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  description: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  maxTransactionValue: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  feesChargesMandatoryFields: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  customerName: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  cardL4d: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  cardExpirydate: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  idDocType: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  idDocNumber: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },

  idTypeCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  idValue: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  originatorType: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  fullNameBehalf: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  nationalityCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  address: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  contactNumber: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  dateOfBirth: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  occupationCode: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  remarksErrors: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  statusErrors: {
    presence: {
      allowEmpty: false,
      message: "^ can't be empty.",
    },
  },
  idExpiring: {
    presence: {
      allowEmpty: false,
      message: "^ Field Should Be Mandatory.",
    },
  },
};

const customValidator = (type: string, field: string, value: string) => {
  let object: any = {};

  object[type] = value;
  let constraint = constraints_new[type];

  const result = validate(object, { [type]: constraint });

  if (result) {
    return field + result[type][0];
  }

  return "null";
};
export { customValidator };
