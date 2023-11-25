export const runOnCurrentTab = <T extends Array<any>>(injection: {
  func: (...args: T) => void;
  args: T;
}) => {
  chrome.tabs.query({ active: true }, function (tabs) {
    if (!tabs[0].id) return;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      ...injection,
    });
  });
};

// export const runOnUrl = () => {
//   chrome.tabs.query(
//     {
//       url: ['https://*.dooray.com/*'],
//     },
//     (tabs) => {
//       chrome.scripting.executeScript({ target: [] });
//     }
//   );
// };
