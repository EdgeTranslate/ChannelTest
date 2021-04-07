import Channel from "./library/channel.js";

const channel = new Channel();

channel.provide("get_url", () => Promise.resolve(chrome.runtime.getURL("")));

const cCanceler = channel.on("content_loaded", (detail, sender) => {
  channel
    .requestToTab(sender.tab.id, "get_title")
    .then((result) => console.log(`page ${result} loaded`));

  channel.emitToTabs(sender.tab.id, "hello_content", detail);
  cCanceler();

  // This should generate a warning.
  cCanceler();
});

const oCanceler = channel.on("options_loaded", (detail) => {
  console.log(`options: ${detail}`);
  channel.emit("hello_options", detail);
  oCanceler();

  // This should generate a warning.
  oCanceler();
});

const pCanceler = channel.on("popup_loaded", (detail) => {
  console.log(`popup: ${detail}`);
  channel.emit("hello_popup", detail);
  pCanceler();

  // This should generate a warning.
  pCanceler();
});

/**
 * Open pages.
 */
chrome.tabs.create({ url: "https://www.baidu.com" });
chrome.runtime.openOptionsPage();
