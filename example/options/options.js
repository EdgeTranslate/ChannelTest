import Channel from "../../src/channel.js";

const channel = new Channel();

const canceler = channel.on("hello_options", (result) => {
  let text = document.createElement("p");
  text.textContent = result;
  document.body.appendChild(text);
  canceler();
});

channel.request("get_url", {}).then((result) => {
  channel.emit("options_loaded", result);
});
