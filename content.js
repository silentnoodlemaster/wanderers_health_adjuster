const widgetHTML = `
  <div id="widget" ontouchstart="startSwipe(event)" onmousedown="startDrag(event)">
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


function handleDrag(e) {
  const delta = e.clientX - startX;
  startX = e.clientX;
  updateValue(delta);
}

function handleSwipe(e) {
  const delta = e.touches[0].clientX - startX;
  startX = e.touches[0].clientX;
  updateValue(delta);
}

function startDrag(e) {
  startX = e.clientX;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
}

function startSwipe(e) {
  startX = e.touches[0].clientX;
  document.addEventListener('touchmove', handleSwipe);
  document.addEventListener('touchend', stopSwipe);
}

function stopDrag() {
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

function stopSwipe() {
  document.removeEventListener('touchmove', handleSwipe);
  document.removeEventListener('touchend', stopSwipe);
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
exportFunction(startSwipe, window, {defineAs: 'startSwipe'});
exportFunction(stopSwipe, window, {defineAs: 'stopSwipe'});
exportFunction(updateValue, window, {defineAs: 'updateValue'});
