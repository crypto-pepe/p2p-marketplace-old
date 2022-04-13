import type { EventEmitter } from "events";
import Libp2p, { Libp2pOptions } from "libp2p";
import WebSockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import MPLEX from "libp2p-mplex";
import { NOISE } from "libp2p-noise";
import GossipSub from "libp2p-gossipsub";
import type { P2PConfig } from "./config";

export type P2P = Libp2p & EventEmitter;

const defaultConfig: Libp2pOptions = {
  addresses: {
    listen: [],
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
      canRelayMessage: true,
      emitSelf: false,
      messageProcessingConcurrency: 10,
    },
  },
};

let instance: P2P;

export const p2p = async (config: P2PConfig): Promise<P2P> => {
  if (!instance) {
    instance = await Libp2p.create({
      ...defaultConfig,
      addresses: { listen: config.addresses },
    });
    await instance.start();
  }

  return instance;
};
