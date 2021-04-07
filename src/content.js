import Channel from "./library/channel.js";

const channel = new Channel();

channel.provide("get_title", () => Promise.resolve(document.title));

const canceler = channel.on("hello_content", (result) => {
    alert(result);
    canceler();
});

channel.request("get_url", {}).then((result) => {
    channel.emit("content_loaded", result);
});
