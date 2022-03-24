import type { EventEmitter } from "events";
import Libp2p from "libp2p";
import WebSockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import MPLEX from "libp2p-mplex";
// import Bootstrap from "libp2p-bootstrap";
import { NOISE } from "libp2p-noise";
import GossipSub from "libp2p-gossipsub";

export const P2P = async () => {
  const p2p: Libp2p & EventEmitter = await Libp2p.create({
    addresses: {
      // Add the signaling server address, along with our PeerId to our multiaddrs list
      // libp2p will automatically attempt to dial to the signaling server so that it can
      // receive inbound connections from other peers
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
      //   peerDiscovery: [Bootstrap],
    },
    config: {
      peerDiscovery: {
        autoDial: true,
      },
      pubsub: {
        enabled: true,
        emitSelf: false,
      },
    },
  });

  p2p.on("peer:discovery", (peerId) => {
    console.log(`Found peer ${peerId.toB58String()}`);
  });
  p2p.connectionManager.on("peer:connect", (connection) => {
    console.log(`Connected to ${connection.remotePeer.toB58String()}`);
  });
  p2p.connectionManager.on("peer:disconnect", (connection) => {
    console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
  });
  p2p.connectionManager.on("connection:start", (connection) => {
    console.log(`Connection start from ${connection.remotePeer.toB58String()}`);
  });
  p2p.connectionManager.on("connection:end", (connection) => {
    console.log(`Connection end from ${connection.remotePeer.toB58String()}`);
  });

  await p2p.start();

  p2p.pubsub.subscribe("pepe");
  p2p.pubsub.on("pepe", (msg) => {
    console.log(`node received: ${new TextDecoder().decode(msg.data)}`);
  });
  setInterval(async () => {
    await p2p.pubsub.publish("pepe", new TextEncoder().encode("hello"));
    console.log(p2p.pubsub.peers);
  }, 5000);

  return p2p;
};
