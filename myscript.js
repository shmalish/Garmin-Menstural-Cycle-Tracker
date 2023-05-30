window.addEventListener('load', function() {
  var targetElement = document.querySelector('.header-left');

  var newDiv = document.createElement('div');
  newDiv.innerHTML = `
    <div id="period-tracking-form" style="display: flex; justify-content: space-between; width: 80%; margin-left: 10%;margin-top:10%">
        <div style="display: flex; flex-direction: column;">
            <label for="lastPeriodStart">Last period start:</label>
            <input type="date" id="lastPeriodStart">
        </div>
        <div style="display: flex; flex-direction: column;">
            <label for="periodDuration">Period duration:</label>
            <input type="number" id="periodDuration">
        </div>
        <div style="display: flex; flex-direction: column;">
            <label for="cycleLength">Cycle length:</label>
            <input type="number" id="cycleLength">
        </div>
        <button id="calculateCycle" style=" background-color: #4CAF50; /* Green */ border: none; color: white;padding: 10px 10px;text-align: center;text-decoration: none;display: inline-block;font-size: 10px;margin-left: 10px">Calculate Cycle</button>
    </div>
  `;
  targetElement.appendChild(newDiv);

  function calculateAndHighlightCycle(lastPeriodStart, periodDuration, cycleLength) {
    var periodStartDate = new Date(lastPeriodStart);

    var calendarCells = document.querySelectorAll('.calendar-data');

    for (var i = 0; i < 60; i++) {
      var currentDate = new Date(periodStartDate.getTime() + (24 * 60 * 60 * 1000 * i));

      for (var cell of calendarCells) {
        var cellDate = cell.querySelector('.day-number').innerText;
        if (cellDate == currentDate.getDate()) {
          if (i % cycleLength < periodDuration) {
            cell.style.backgroundColor = 'lightskyblue'; // Period days
          } else if (i % cycleLength >= cycleLength - 14 && i % cycleLength < cycleLength - 9) {
            cell.style.backgroundColor = 'teal'; // Ovulation days
          } else {
            cell.style.backgroundColor = 'white'; // Non period days
          }
        }
      }
    }
  }

  // Load saved data from localStorage
  if(localStorage.getItem("lastPeriodStart")) {
    document.getElementById("lastPeriodStart").value = localStorage.getItem("lastPeriodStart");
  }
  if(localStorage.getItem("periodDuration")) {
    document.getElementById("periodDuration").value = localStorage.getItem("periodDuration");
  }
  if(localStorage.getItem("cycleLength")) {
    document.getElementById("cycleLength").value = localStorage.getItem("cycleLength");
  }

  // If all required data is available, calculate and highlight the cycle upon page load
  if (localStorage.getItem("lastPeriodStart") && localStorage.getItem("periodDuration") && localStorage.getItem("cycleLength")) {
    setTimeout(function() {
      calculateAndHighlightCycle(localStorage.getItem("lastPeriodStart"), localStorage.getItem("periodDuration"), localStorage.getItem("cycleLength"));
    }, 3000); // Wait for 3 seconds
  }

  document.getElementById("calculateCycle").addEventListener("click", function() {
    var lastPeriodStart = document.getElementById("lastPeriodStart").value;
    var periodDuration = document.getElementById("periodDuration").value;
    var cycleLength = document.getElementById("cycleLength").value;

    // Save input data to localStorage
    localStorage.setItem("lastPeriodStart", lastPeriodStart);
    localStorage.setItem("periodDuration", periodDuration);
    localStorage.setItem("cycleLength", cycleLength);

    calculateAndHighlightCycle(lastPeriodStart, periodDuration, cycleLength);
  });
}, false);
