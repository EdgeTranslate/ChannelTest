import Channel from "../library/channel_client.js";

const channel = new Channel();

channel.on("hello_options", (result) => {
    let text = document.createElement("p");
    text.textContent = result;
    document.body.appendChild(text);
});

channel.request("get_url", {}).then((result) => {
    channel.dispatch("options_loaded", result);
});
