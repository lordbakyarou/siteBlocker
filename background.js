chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "block") {
    chrome.storage.sync.get(["blockedSites"], (result) => {
      const blockedSites = result.blockedSites || [];
      if (!blockedSites.includes(request.siteUrl)) {
        blockedSites.push(request.siteUrl);
        chrome.storage.sync.set({ blockedSites }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false });
      }
    });
  }
  if (sendResponse) {
    sendResponse({ success: true }); // Make sure sendResponse is defined
  } else if (request.action === "unblock") {
    chrome.storage.sync.get(["blockedSites"], (result) => {
      const blockedSites = result.blockedSites || [];
      const updatedBlockedSites = blockedSites.filter(
        (url) => url !== request.siteUrl
      );
      chrome.storage.sync.set({ blockedSites: updatedBlockedSites }, () => {
        sendResponse({ success: true });
      });
    });
    if (sendResponse) {
      sendResponse({ success: true }); // Make sure sendResponse is defined
    }
  }
  return true;
});
