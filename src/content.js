import Channel from "./library/channel_client.js";

const channel = new Channel();

channel.request("get_url", {}).then((result) => {
    console.log(result);
    channel.dispatch("content_received", {});
});
