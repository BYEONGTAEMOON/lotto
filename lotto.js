function generateLottoNumbers(fixedNumbers = [], excludedNumbers = []) {
  const numbers = new Set(fixedNumbers);
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.has(randomNumber) && !excludedNumbers.includes(randomNumber)) {
      numbers.add(randomNumber);
    }
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function getBallColor(number) {
  if (number <= 10) return "#f4c542"; // 노랑
  if (number <= 20) return "#337ab7"; // 파랑
  if (number <= 30) return "#d9534f"; // 빨강
  if (number <= 40) return "#777"; // 회색
  return "#5cb85c"; // 녹색
}

document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generate");
  const fixedGenerateButton = document.getElementById("fixedGenerate");
  const excludedGenerateButton = document.getElementById("excludedGenerate");
  const resultContainer = document.getElementById("result");
  const fixedNumbersInput = document.getElementById("fixedNumbers");
  const excludedNumbersInput = document.getElementById("excludedNumbers");

  function parseNumbers(input) {
    return input.value
      ? input.value
          .split(",")
          .map((num) => parseInt(num.trim(), 10))
          .filter((num) => num >= 1 && num <= 45)
      : [];
  }

  function generateAndDisplay(fixed = [], excluded = []) {
    const lottoSet = generateLottoNumbers(fixed, excluded);
    resultContainer.innerHTML = lottoSet
      .map(
        (num) =>
          `<span class="ball" style="background-color: ${getBallColor(
            num,
          )}">${num}</span>`,
      )
      .join(" ");
  }

  generateButton.addEventListener("click", function () {
    generateAndDisplay();
  });

  fixedGenerateButton.addEventListener("click", function () {
    const fixedNumbers = parseNumbers(fixedNumbersInput);
    generateAndDisplay(fixedNumbers, []);
  });

  excludedGenerateButton.addEventListener("click", function () {
    const excludedNumbers = parseNumbers(excludedNumbersInput);
    generateAndDisplay([], excludedNumbers);
  });
});
