import { writable } from "svelte/store";
import type { InMessage } from "libp2p-interfaces/src/pubsub";
import { Type, Field, Message } from "protobufjs";
import { config } from "../utils/config";
import { p2p } from "../utils/p2p";

const PRICE_ORACLE_TOPIC: string = "pepe:prices";

class ProtoPrice extends Message<ProtoPrice> {
  @Field.d(1, "string")
  public ticker: string;
  @Field.d(2, "double")
  public price: number;
  @Field.d(4, "int64")
  public timestamp: number;
}

@Type.d("ProtoPrices")
class ProtoPrices extends Message<ProtoPrices> {
  @Field.d(1, ProtoPrice, "repeated")
  public prices: ProtoPrice[];
}

export type Price = {
  price: number;
  timestamp: Date;
};

export type PriceMap = {
  [ticker: string]: Price;
};

const { subscribe, update } = writable<PriceMap>({});

const updatePrices =
  (newPrices: PriceMap) =>
  (state: PriceMap): PriceMap =>
    Object.keys(newPrices).reduce(
      (acc, ticker) => ({
        ...acc,
        [ticker]:
          state[ticker] && state[ticker].timestamp > newPrices[ticker].timestamp
            ? state[ticker]
            : newPrices[ticker],
      }),
      state
    );

const handleP2POracle = (priceOracle: string) => (msg: InMessage) => {
  if (msg.from === priceOracle) {
    if (!ProtoPrices.verify(msg.data)) {
      const oraclePrices: ProtoPrices = ProtoPrices.decode(msg.data);
      update(
        updatePrices(
          oraclePrices.prices.reduce(
            (acc, data) => ({
              ...acc,
              [data.ticker]: { price: data.price, timestamp: data.timestamp },
            }),
            {}
          )
        )
      );
    }
  }
};

let inited = false;
export const initPriceOracle = async () => {
  if (!inited) {
    const cfg = await config();
    const p2pInstance = await p2p(cfg.p2p);

    p2pInstance.pubsub.on(
      PRICE_ORACLE_TOPIC,
      handleP2POracle(cfg.oracle.address)
    );
    p2pInstance.pubsub.subscribe(PRICE_ORACLE_TOPIC);
  }
};

export const prices = { subscribe };
