/// <reference types="svelte" />

interface Window {
  WavesKeeper: WavesKeeper.TWavesKeeperApi;
}

declare var WavesKeeper: WavesKeeper.TWavesKeeperApi;

declare namespace WavesKeeper {
  type TWavesKeeperApi = {
    publicState(): Promise<IPublicStateResponse>;
    on(event: "update", cb: (state: IPublicStateResponse) => any): object;
    initialPromise: Promise<any>;
  };

  interface IPublicStateResponse {
    initialized: boolean;
    locked: boolean;
    account: TPublicStateAccount | null;
    network: TPublicStateNetwork;
    txVersion: Record<number, Array<number>>;
  }

  type TPublicStateNetwork = {
    code: string;
    server: string;
    matcher: string;
  };

  type TPublicStateAccount = {
    name: string;
    publicKey: string;
    address: string;
    networkCode: string;
    network: string;
    balance: TAccountBalance;
    type: string;
  };
}
