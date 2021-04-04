import Channel from "../library/channel_client.js";

const channel = new Channel();

channel.on("hello_popup", (result) => {
    let text = document.createElement("p");
    text.textContent = result;
    document.body.appendChild(text);
});

channel.request("get_url", {}).then((result) => {
    channel.dispatch("popup_loaded", result);
});
