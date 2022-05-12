function typeEffect(element, jopsArr) {
  const targetElement = document.getElementById(element);

  let currentJopIndex = 0;
  let currentLetterIndex = 0;
  const typingSpeed = 150;
  const erasingSpeed = 50;

  let beginTyping; // start first time
  let erasingWait; // wait and start erasing
  let nextJop; // wait and start next text

  const beginTypingTime = 2000;
  const erasingWaitTime = 2000;
  const nextJopWait = 500;

  function typeCurrentJop() {
    clearTimeout(nextJop);
    const typeFunc = setTimeout(() => {
      if (currentLetterIndex < jopsArr[currentJopIndex].length) {
        targetElement.innerHTML += jopsArr[currentJopIndex][currentLetterIndex];
        currentLetterIndex++;
        typeCurrentJop();
      } else {
        clearTimeout(typeFunc);
        erasingWait = setTimeout(() => eraseCurrentJop(), erasingWaitTime);
      }
    }, typingSpeed);
  }

  beginTyping = setTimeout(() => typeCurrentJop(), beginTypingTime);

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
          nextJop = setTimeout(() => typeCurrentJop(), nextJopWait);
        } else {
          currentLetterIndex = 0;
          currentJopIndex = 0;
          clearTimeout(beginTyping);
          nextJop = setTimeout(() => typeCurrentJop(), nextJopWait);
        }
      }
    }, erasingSpeed);
  }
}

export default typeEffect;
