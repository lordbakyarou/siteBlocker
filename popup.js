const siteInput = document.getElementById("siteInput");
const blockButton = document.getElementById("blockButton");
const unblockButton = document.getElementById("unblockButton");

blockButton.addEventListener("click", () => {
  const siteUrl = siteInput.value.trim();
  if (siteUrl) {
    chrome.runtime.sendMessage({ action: "block", siteUrl }, (response) => {
      if (response.success) {
        console.log(`Blocked ${siteUrl}`);
      } else {
        console.log(`Error blocking ${siteUrl}`);
      }
    });
  }
});

unblockButton.addEventListener("click", () => {
  const siteUrl = siteInput.value.trim();
  if (siteUrl) {
    chrome.runtime.sendMessage({ action: "unblock", siteUrl }, (response) => {
      if (response.success) {
        console.log(`Unblocked ${siteUrl}`);
      } else {
        console.log(`Error unblocking ${siteUrl}`);
      }
    });
  }
});
