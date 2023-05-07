export interface PreLoginCarouselModalPopupProps {
    cancelMethod(): void;
    finalSubmitHandler(method: string): void | string;
    isButtonEvents: string;
    showPreLoginScreen: boolean;
    walletTypeCode: string;
    modalTittle: string;
    preLoginTableData: PreLoginCarouselWallet;
    showWalletDescription: string;
  }
  export interface PreLoginCarouselSetupObjects {
    UID: string;
    Sequence: string;
    Image: string;
    Title: string;
    Body: string;
    Action: string;
  }

  export interface PreLoginCarouselWallet {
    id: string;
    sequence: string;
    walletTypeCode: string;
    walletTypeDescription: string;
    category: string;
    contentCode: string;
    fileName: string;
    description: string;
    statusCode: string;
    title: string;
  }

export interface PreLoginRegisterUpload {
  category: string
  contentCode: string;
  contentType: string;
  description: string;
  extension: string;
  fileName: string;
  id: string;
  statusCode: string
}
  