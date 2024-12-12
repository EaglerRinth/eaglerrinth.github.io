let cps = 7

function click() {
  ModAPI.clickMouse()
}
let intervalTime = 1000 / cps;
let intervalID = setInterval(click, intervalTime);
