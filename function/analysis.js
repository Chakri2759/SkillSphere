// scripts.js
// Day-to-Day Progress (Bar Chart)
const dailyProgressCtx = document.getElementById('dailyProgressChart').getContext('2d');
const dailyProgressChart = new Chart(dailyProgressCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Progress (%)',
            data: [70, 60, 30, 80, 50, 70, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom' // Move the label below the chart
            }
        }
    }
});

// Overall Progress of Each Course (Pie Chart)
const overallProgressCtx = document.getElementById('overallProgressChart').getContext('2d');
const overallProgressChart = new Chart(overallProgressCtx, {
    type: 'pie',
    data: {
        labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4'],
        datasets: [{
            label: 'Overall Progress',
            data: [55, 10, 15, 20],
            backgroundColor: [
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(54, 162, 235)'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: 'right' // Move the labels to the right of the pie chart
            }
        }
    }
});

// Progress of Each Course in a Day (Horizontal Bar Chart or Stacked Bar Chart)
const courseProgressCtx = document.getElementById('courseProgressChart').getContext('2d');
const courseProgressChart = new Chart(courseProgressCtx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Course 1',
            data: [10, 20, 15, 30, 25, 40, 5],
            backgroundColor: 'rgba(54, 162, 235)'
        },
        {
            label: 'Course 2',
            data: [20, 10, 25, 20, 30, 15, 40],
            backgroundColor: 'rgba(75, 192, 192)'
        },
        {
            label: 'Course 3',
            data: [30, 40, 20, 15, 25, 10, 35],
            backgroundColor: 'rgba(153, 102, 255)'
        },
        {
            label: 'Course 4',
            data: [15, 25, 35, 40, 10, 30, 20],
            backgroundColor: 'rgba(255, 206, 86)'
        }]
    },
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                beginAtZero: true,
                stacked: true
            }
        },
   plugins: {
    legend: {
        display: true,
        position: 'bottom' // Move the label below the chart
    }
}
    }
});
document.addEventListener('DOMContentLoaded', function() {
    let coursesCompleted = 0;
    let badgesEarned = 0;
    const totalCourses = 15; // Total number of courses
    let coursesInProgress = totalCourses; 
    const badgeLevels = ["Bronze", "Silver", "Gold", "Platinum"];
    let highestBadge = "Bronze";

    // Function to calculate and update badge based on percentage completed
    function updateBadge() {
        const completionPercentage = (coursesCompleted / totalCourses) * 100;

        if (completionPercentage <26 ) {
            highestBadge = badgeLevels[0];
        } else if (completionPercentage < 51) {
            highestBadge = badgeLevels[1];
        } else if (completionPercentage < 76) {
            highestBadge = badgeLevels[2];
        } else if (completionPercentage <= 100 ) {
            highestBadge = badgeLevels[3];
        }
    }

    // Example function to simulate completing a course
    function completeCourse() {
        if (coursesInProgress > 0) {
            coursesCompleted++;
            badgesEarned++;
            coursesInProgress--;

            // Update badge based on completion percentage
            updateBadge();

            updateDashboard();
        }
    }

    // Function to update the dashboard
    function updateDashboard() {
        document.getElementById('coursesCompleted').innerText = coursesCompleted;
        document.getElementById('badgesEarned').innerText = badgesEarned;
        document.getElementById('coursesInProgress').innerText = Math.max(coursesInProgress, 0);
        document.getElementById('highestBadge').alt = highestBadge + " Badge";
        // Assuming you have badge images named accordingly
        document.getElementById('highestBadge').src = `images/${highestBadge.toLowerCase()}-badge.png`;
    }

    // Simulate completing a course every 3 seconds
    setInterval(completeCourse, 100);
});