import Channel from "./library/channel_server.js";

const channel = new Channel();

channel.provide("get_url", () => chrome.runtime.getURL(""));

channel.on("content_received", () => console.log("content received"));

channel.on("options_received", () => console.log("options received"));

channel.on("popup_received", () => console.log("popup received"));

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
