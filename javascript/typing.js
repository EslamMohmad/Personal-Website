function typeEffect(element, jopsArr) {
  const targetElement = document.getElementById(element);

  let currentJopIndex = 0;
  let currentLetterIndex = 0;
  const typingSpeed = 150;
  const erasingSpeed = 50;

  let beginTyping;
  let erasingWait;

  const beginTypingTime = 2000;
  const erasingWaitTime = 2000;

  function typeCurrentJop() {
    const typeFunc = setTimeout(() => {
      if (currentLetterIndex < jopsArr[currentJopIndex].length) {
        targetElement.innerHTML += jopsArr[currentJopIndex][currentLetterIndex];
        currentLetterIndex++;
        typeCurrentJop();
      } else {
        clearTimeout(typeFunc);
        erasingWait = setTimeout(() => eraseCurrentJop(), beginTypingTime);
      }
    }, typingSpeed);
  }

  beginTyping = setTimeout(() => typeCurrentJop(), erasingWaitTime);

  function eraseCurrentJop() {
    clearTimeout(erasingWait);
    const eraseFunc = setTimeout(() => {
      if (currentLetterIndex >= 0) {
        targetElement.innerHTML = jopsArr[currentJopIndex].slice(
          0,
          currentLetterIndex
        );
        currentLetterIndex--;
        eraseCurrentJop();
      } else {
        clearTimeout(eraseFunc);
        if (currentJopIndex < jopsArr.length - 1) {
          currentLetterIndex = 0;
          currentJopIndex++;
          typeCurrentJop();
        } else {
          currentLetterIndex = 0;
          currentJopIndex = 0;
          typeCurrentJop();
          clearTimeout(beginTyping);
        }
      }
    }, erasingSpeed);
  }
}

export default typeEffect;
