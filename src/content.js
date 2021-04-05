import Channel from "./library/channel_client.js";

const channel = new Channel();

const canceler = channel.on("hello_content", (result) => {
    alert(result);
    canceler();
});

channel.request("get_url", {}).then((result) => {
    channel.emit("content_loaded", result);
});
