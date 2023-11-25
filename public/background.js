function changeColor(colorMap) {
  const sheet = Array.from(document.styleSheets).find(
    (sheet) => sheet.ownerNode?.dataset['emotion'] === 'css'
  );

  if (!sheet) return;

  const newSheet = new CSSStyleSheet();

  for (let rule of Array.from(sheet?.cssRules)) {
    if (!rule.style) continue;

    let newRule = rule.cssText;
    let hasChanged = false;

    if (colorMap[rule.style.backgroundColor]) {
      newRule = newRule.replaceAll(
        rule.style.backgroundColor,
        colorMap[rule.style.backgroundColor]
      );
      hasChanged = true;
    }

    if (colorMap[rule.style.color]) {
      newRule = newRule.replaceAll(
        rule.style.color,
        colorMap[rule.style.color]
      );
      hasChanged = true;
    }
    if (!hasChanged) continue;

    newSheet.insertRule(newRule);
  }

  document.adoptedStyleSheets = [newSheet];
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(window);

    const promise = new Promise((resolve) => {
      const request = XMLHttpRequest();
      request.onloadend = (e) => resolve(e.currentTarget.response);
      request.open('GET', details.url);
      request.send();
    });

    promise.then((res) => {
      const newScript = document.createElement('script');
      newScript.textContent = 'no script';

      document.head.appendChild(newScript);
    });

    return {
      redirectUrl: '',
    };
  },
  { urls: ['*://*.dooray.com/*.js'] },
  ['blocking']
);
