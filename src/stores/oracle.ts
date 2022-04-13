import { Type, Field, Root } from "protobufjs";
import { config } from "../utils/config";
import { P2P, p2p } from "../utils/p2p";

const PRICE_ORACLE_TOPIC: string = "pepe:prices";

const RootType = new Root().define("oracle");
const Price = new Type("Price")
  .add(new Field("ticker", 1, "string"))
  .add(new Field("price", 2, "double"))
  .add(new Field("timestamp", 4, "int64"));
RootType.add(Price);

const Prices = new Type("Prices").add(
  new Field("prices", 1, "Price", "repeated")
);
RootType.add(Prices);

export async function initPriceOracle() {
  const cfg = await config();
  const p2pInstanse: P2P = await p2p(cfg.p2p);
  p2pInstanse.pubsub.on(PRICE_ORACLE_TOPIC, (msg) => {
    console.log(msg);
    console.log(Prices.decode(msg.data));
  });
  p2pInstanse.pubsub.subscribe(PRICE_ORACLE_TOPIC);

  p2pInstanse.on("peer:discovery", (peerId) => {
    console.log("Discovered:", peerId.toB58String());
  });
  p2pInstanse.connectionManager.on("peer:connect", (connection) => {
    console.log(
      "Connection established to:",
      connection.remotePeer.toB58String()
    );
  });
}
