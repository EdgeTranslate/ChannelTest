import Channel from "./library/channel_server.js";

const channel = new Channel();

channel.provide("get_url", () => chrome.runtime.getURL(""));

channel.on("content_loaded", (detail, sender) => {
    console.log(`content: ${detail}`);
    channel.dispatchToTabs(sender.tab.id, "hello_content", detail);
});

channel.on("options_loaded", (detail) => {
    console.log(`options: ${detail}`);
    channel.dispatch("hello_options", detail);
});

channel.on("popup_loaded", (detail) => {
    console.log(`popup: ${detail}`);
    channel.dispatch("hello_popup", detail);
});

const promise1 = new Promise((resolve, reject) => {
    chrome.tabs.create({url: "https://www.baidu.com"}, () => {
        if (chrome.runtime.lastError) {
            reject();
        } else {
            resolve();
        }
    });
});

const promise2 = new Promise((resolve, reject) => {
    chrome.runtime.openOptionsPage(() => {
        if (chrome.runtime.lastError) {
            reject();
        } else {
            resolve();
        }
    });
});

Promise.all([promise1, promise2]).then(() => {
    setTimeout(() => {
        channel.dispatch("loaded", {});
    }, 5000);
});
