export function changeColor(colorMap) {
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

// 수정하기 - extension용 stylesheet이 dooray.com에 오면 만들어짐.
// extension은 색상 정보를 local storage에 저장하여 사용.
// initialize - 처음 진입 시, 해당 탭에 stylesheet 적용
// changeTheme - 모든 dooray.com에 stylesheet 적용
