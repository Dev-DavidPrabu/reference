export interface walletTypeObjects {
  countryCode: string;
  entityId: string;
  id: string;
  statusCode: string;
  walletTypeCode: string;
  isDefault: boolean;
  name: string;
}

export interface wallletSetupModalPopupProps {
  cancelMethod(): void;
  finalSubmitHandler(
    method: string,
    finalDataToSend: finalDataToSend,
    eventId: string
  ): void | string;
  toggleElement: string;
  isFullScreenView: boolean;
  previewTitle: string;
  walletSetupDataToModal: walletTypeObjects;
  overAllData: walletTypeObjects[];
}

export interface finalDataToSend {
  countryCode: string;
  walletTypeCode: string;
  name: string;
  isDefault: boolean;
  entityId: string;
}
