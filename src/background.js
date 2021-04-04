import Channel from "./library/channel_server.js";

const channel = new Channel();

channel.provide("get_url", () => chrome.runtime.getURL(""));

channel.on("content_received", () => console.log("content received"));

channel.on("options_received", () => console.log("options received"));

channel.on("popup_received", () => console.log("popup received"));

setTimeout(() => {
    channel.dispatch("loaded", {});
}, 1000);
