import { P2P, p2p } from "../utils/p2p";

type PriceInfo = {
  t: string;
  p: number;
};

const PRICE_ORACLE_TOPIC: string = "pepe:prices";

export async function initPriceOracle() {
  const p2pInstanse: P2P = await p2p();
  p2pInstanse.pubsub.on(PRICE_ORACLE_TOPIC, console.log);
  p2pInstanse.pubsub.subscribe(PRICE_ORACLE_TOPIC);
}
