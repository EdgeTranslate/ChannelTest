import Channel from "./library/channel.js";

const channel = new Channel();

channel.provide("get_url", () => chrome.runtime.getURL(""));

const cCanceler = channel.on("content_loaded", (detail, sender) => {
    console.log(`content: ${detail}`);
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
        channel.emit("loaded", {});
    }, 5000);
});
