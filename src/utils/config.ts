export type P2PConfig = {
  addresses: string[];
};

export type OracleConfig = {
  address: string;
};

export type Config = { p2p: P2PConfig; oracle: OracleConfig };

let instance: Config;

export const config = async (
  path: string = "./config.json"
): Promise<Config> => {
  if (!instance) {
    instance = await (await fetch(path)).json();
  }

  return instance;
};
