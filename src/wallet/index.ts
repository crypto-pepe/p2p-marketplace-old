export type AssetInfo =
  | {
      decimals: number;
      symbol: string;
    }
  | undefined;

export default interface IWallet {
  onChanged(callback: Function);
  onDisconnect(callback?: Function);
  isAvailable(): Promise<boolean>;
  getAddress(): Promise<string>;
  getNetwork(): Promise<string>;
  getAccountBalance(asset?: string): Promise<BigInt>;
  getAssetInfo(asset?: string): Promise<AssetInfo>;
  setChain(chainId: string): Promise<unknown>;
}
