function getRndInteger(min, max) {
    var Number = Math.random() * (max - min) + min;
    return Math.floor(Number);
  }