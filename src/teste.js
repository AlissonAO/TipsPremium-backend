function printNumbers(from, to) {
  let current = from;
  let sair = true;
  let timerId = setInterval(function () {
    console.log(current);
    if (current == to) {
      //clearInterval(timerId);
    }
    current++;
  }, 4000);
}

// usage:
printNumbers(5, 10);
