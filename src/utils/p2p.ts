import type { EventEmitter } from "events";
import Libp2p, { Libp2pOptions } from "libp2p";
import WebSockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import MPLEX from "libp2p-mplex";
import { NOISE } from "libp2p-noise";
import GossipSub from "libp2p-gossipsub";

export type P2P = Libp2p & EventEmitter;

const defaultConfig: Libp2pOptions = {
  addresses: {
    listen: [
      "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
      "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star",
      "/dns4/shrouded-shelf-54137.herokuapp.com/tcp/443/wss/p2p-webrtc-star",
    ],
  },
  modules: {
    transport: [WebSockets, WebRTCStar],
    connEncryption: [NOISE],
    streamMuxer: [MPLEX],
    pubsub: GossipSub,
  },
  config: {
    peerDiscovery: {
      autoDial: true,
    },
    pubsub: {
      enabled: true,
      emitSelf: true,
    },
  },
};

let instance: P2P;

export const p2p = async (): Promise<P2P> => {
  if (!instance) {
    instance = await Libp2p.create(defaultConfig);
    await instance.start();
  }

  return instance;
};
