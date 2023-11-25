(async () => {
  function changeColor(colorMap) {
    setTimeout(() => {
      const sheets = Array.from(document.styleSheets).filter(
        (sheet) => sheet.ownerNode?.dataset['emotion'] === 'css'
      );

      if (!sheets.length) return;

      const newSheet = new CSSStyleSheet();
      sheets.forEach((sheet) => {
        console.log(sheet.cssRules.length);

        Array.from(sheet?.cssRules)
          .filter((rule) => rule.style)
          .forEach((rule) => {
            rule.cssText.replaceAll();
            let newRule = rule.cssText;
            let hasChanged = false;

            console.log(
              rule.style.backgroundColor,
              rule.style.color,
              colorMap[rule.style.backgroundColor],
              colorMap[rule.style.color]
            );

            if (colorMap[rule.style.backgroundColor]) {
              console.log(
                rule.style.backgroundColor,
                colorMap[rule.style.backgroundColor],
                rule.cssText,
                newRule
              );
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
            if (!hasChanged) return;

            console.log(newRule);

            newSheet.insertRule(newRule);
          });
      });

      document.adoptedStyleSheets = [newSheet];
    }, 0);
  }

  console.log('################## init');
  window.onload = (event) => {
    chrome.storage.local.get(null).then((colorMap) => {
      console.log(colorMap);
      // console.log('DOMContentLoaded', colorMap);
      changeColor(colorMap);
    });
  };
})();
