import Channel from "../library/channel_client.js";

const channel = new Channel();

channel.on("loaded", () => {
    console.log("loaded");
    channel.dispatch("options_received", {});
});