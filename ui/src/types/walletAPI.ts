export interface WalletAPIData {
  address?: string;
  disconnectWallet: () => Promise<void>;
  getChangeAddress: (enabledApi: any) => Promise<any>;
  enable: (walletName: string) => Promise<{
    status: string;
    stakeKey?: boolean;
    error?: string;
  }>;
  isEnableLoading: string | null;
  error?: string;
  isEnabled: boolean;
  pubDRepKey: string;
  dRepID: string;
  isMainnet: boolean;
  stakeKey?: string;
  setStakeKey: (key: string) => void;
  stakeKeys: string[];
  walletApi?: any;
  registeredStakeKeysListState: string[];
  isStakeKeyRegistered: () => boolean;
}
