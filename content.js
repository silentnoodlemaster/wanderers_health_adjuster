const widgetHTML = `
  <div id="widget" onwheel="handleSwipe(event)" onmousedown="startDrag(event)">
    <span id="value">0</span>
  </div>
  <button class="button has-txt-value-string" onClick="adjustHealth()">Adjust Health</button>
  <style>
    #widget {
      width: 100%;
      height: 50px;
      background: repeating-linear-gradient(to right, transparent 2px, #444 8px);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      cursor: grab;
    }
    #widget:active {
      cursor: grabbing;
    }
    #widget:active #value {
      font-size: 110%;
    }
    #widget #value {
      user-select: none;
      transition: font-size 0.1s ease;
    }
  </style>
`;

function injectWidget() {
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = widgetHTML;
  const healthContainer = document.getElementById('healthPointsContainer');
  healthContainer.appendChild(widgetContainer);
}

function updateValue(delta) {
  console.log('updateValue', delta);
  currentValue += delta;
  document.getElementById('value').innerText = currentValue;
}

function reset() {
  currentValue = 0;
  document.getElementById('value').innerText = currentValue;
}

function handleSwipe(e) {
  const delta = e.deltaX > 0 ? 1 : -1;
  updateValue(delta);
}

function handleDrag(e) {
  const delta = e.clientX - startX;
  startX = e.clientX;
  updateValue(delta);
}


function startDrag(e) {
  startX = e.clientX;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
}

function stopDrag() {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

function adjustHealth() {
  console.log('adjustHealth', currentValue);
  document.getElementById('char-current-health').click();
  const input = document.getElementById('current-health-input');
  input.value = currentValue+parseInt(input.value);
  reset();
  input.dispatchEvent(new Event('input'));
  input.dispatchEvent(new Event('change'));
  input.dispatchEvent(new Event('blur'));
  
}

let currentValue = 0;
let startX = 0;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectWidget);
} else {
  injectWidget();
}

exportFunction(adjustHealth, window, {defineAs: 'adjustHealth'});
exportFunction(handleSwipe, window, {defineAs: 'handleSwipe'});
exportFunction(handleDrag, window, {defineAs: 'handleDrag'});
exportFunction(startDrag, window, {defineAs: 'startDrag'});
exportFunction(stopDrag, window, {defineAs: 'stopDrag'});
exportFunction(updateValue, window, {defineAs: 'updateValue'});
