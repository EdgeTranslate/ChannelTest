import Channel from "./library/channel_client.js";

const channel = new Channel();

channel.on("hello_content", (result) => {
    alert(result);
});

channel.request("get_url", {}).then((result) => {
    channel.dispatch("content_loaded", result);
});
