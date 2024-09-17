// Initialize variables to track time
let totalTimeSpent = 0;
let timeSpentOnGraphs = 0;
let graphSectionVisible = false;

let startTime, endTime, graphStartTime, graphEndTime;

// Function to start timing when user visits the page
function startTimer() {
    startTime = new Date().getTime();
}

// Function to stop timing when user leaves the page
function stopTimer() {
    endTime = new Date().getTime();
    totalTimeSpent += (endTime - startTime) / 1000; // Time spent in seconds
    if (graphSectionVisible) {
        graphEndTime = new Date().getTime();
        timeSpentOnGraphs += (graphEndTime - graphStartTime) / 1000;
    }
}

// Function to check if the graph section is visible
function isGraphSectionVisible() {
    const graphSection = document.querySelector('.charts');
    const rect = graphSection.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Function to handle graph section visibility
function handleScroll() {
    if (isGraphSectionVisible()) {
        if (!graphSectionVisible) {
            graphSectionVisible = true;
            graphStartTime = new Date().getTime();
        }
    } else {
        if (graphSectionVisible) {
            graphSectionVisible = false;
            graphEndTime = new Date().getTime();
            timeSpentOnGraphs += (graphEndTime - graphStartTime) / 1000;
        }
    }
}

// Event listener for page visibility change (tab switch or close)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTimer(); // Stop timer when the page is hidden
    } else {
        startTimer(); // Start timer when page becomes visible again
    }
});

// Scroll event to monitor visibility of graph section
window.addEventListener('scroll', handleScroll);

// Event listeners for page load and unload
window.addEventListener('load', startTimer);
window.addEventListener('beforeunload', stopTimer);

// Dummy data for time spent (replace with actual data later)
const timeSpentData = [200, 180, 160, 220, 210, 190, 230]; // Example data for last 7 days

// Chart for displaying time spent on website each day
const ctx = document.getElementById('dailyProgressChart').getContext('2d');
const timeSpentChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
            label: 'Time Spent (minutes)',
            data: timeSpentData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Display updated data in the console every 10 seconds (for debugging)
setInterval(() => {
    console.log(`Total Time Spent: ${totalTimeSpent} seconds`);
    console.log(`Time Spent on Graphs: ${timeSpentOnGraphs} seconds`);
}, 10000);
