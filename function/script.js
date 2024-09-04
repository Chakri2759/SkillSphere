document.addEventListener('DOMContentLoaded', () => {
    // Dashboard JavaScript
    if (document.getElementById('timeSpentTopic1')) {
        // Load and display statistics
        let timeSpentTopic1 = localStorage.getItem('timeSpentTopic1') || 0;
        document.getElementById('timeSpentTopic1').textContent = timeSpentTopic1;

        let completionTimeSkill1 = localStorage.getItem('completionTimeSkill1') || 0;
        document.getElementById('completionTimeSkill1').textContent = completionTimeSkill1;

        // Load and display learning paths
        let paths = JSON.parse(localStorage.getItem('learningPaths')) || [];
        let pathList = document.getElementById('pathList');
        paths.forEach(path => {
            let li = document.createElement('li');
            li.textContent = path.name;
            pathList.appendChild(li);
        });

        // Load and display resources
        let resources = JSON.parse(localStorage.getItem('resources')) || [];
        let resourceList = document.getElementById('resourceList');
        resources.forEach(resource => {
            let li = document.createElement('li');
            li.textContent = resource.url;
            resourceList.appendChild(li);
        });
    }

    // Path Creator JavaScript
    if (document.getElementById('createPathForm')) {
        document.getElementById('addResource').addEventListener('click', () => {
            let resourceType = document.getElementById('resourceType').value;
            let resourceUrl = document.getElementById('resourceUrl').value;
            if (resourceUrl) {
                let resourceList = document.getElementById('resourceList');
                let li = document.createElement('li');
                li.textContent = `${resourceType}: ${resourceUrl}`;
                resourceList.appendChild(li);
                document.getElementById('resourceUrl').value = '';
            }
        });

        document.getElementById('createPathForm').addEventListener('submit', (e) => {
            e.preventDefault();
            let pathName = document.getElementById('pathName').value;
            let resources = [];
            document.querySelectorAll('#resourceList li').forEach(li => {
                resources.push({ url: li.textContent.split(': ')[1] });
            });
            let paths = JSON.parse(localStorage.getItem('learningPaths')) || [];
            paths.push({ name: pathName, resources: resources });
            localStorage.setItem('learningPaths', JSON.stringify(paths));
            alert('Learning Path Created!');
            document.getElementById('createPathForm').reset();
            document.getElementById('resourceList').innerHTML = '';
        });
    }

    // Resource Uploader JavaScript
    if (document.getElementById('uploadForm')) {
        document.getElementById('uploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            let fileInput = document.getElementById('resourceFile');
            if (fileInput.files.length > 0) {
                let uploadedFiles = document.getElementById('uploadedFiles');
                for (let file of fileInput.files) {
                    let li = document.createElement('li');
                    li.textContent = file.name;
                    uploadedFiles.appendChild(li);
                }
                fileInput.value = ''; // Clear the input
            }
        });
    }

    // Progress Tracker JavaScript
    if (document.getElementById('progressList')) {
        let progress = JSON.parse(localStorage.getItem('progress')) || [];
        let progressList = document.getElementById('progressList');
        progress.forEach(item => {
            let div = document.createElement('div');
            div.textContent = `${item.pathName}: ${item.progress}% completed`;
            progressList.appendChild(div);
        });
    }

    // Authentication JavaScript
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            if (username && password) {
                localStorage.setItem('loggedInUser', username);
                alert('Login Successful!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard after login
            }
        });
    }
});


// Search bar custimization
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-box input');

searchIcon.addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');

    if (searchContainer.classList.contains('active')) {
        searchInput.placeholder = ''; // Clear placeholder on expansion
        searchInput.focus(); // Focus on input when expanded
    } else {
        searchInput.placeholder = 'Search....'; // Restore placeholder on shrink
        searchInput.blur(); // Blur input when shrunk
    }
});

searchInput.addEventListener('blur', function() {
    if (window.innerWidth <= 600) {
        searchInput.placeholder = 'Search....'; // Restore placeholder if clicked outside
    }
});


// progressBar Working

let studentProgress = 69; // This should be updated based on the actual work completed by the student
let val = studentProgress; // Set val to the student's progress

function completeTask() {
    // Assume each task is worth a certain percentage of the total progress
    const taskProgress = 5; // Example: Each task adds 10% to progress
    studentProgress += taskProgress;

    // Ensure that studentProgress doesn't exceed 100%
    if (studentProgress > 100) {
        studentProgress = 100;
    }

    updateStudentProgress(studentProgress);
}

function updateCircularLoader(percentage) {
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderPercentage = document.getElementById('loader-percentage');

    // Calculate the stroke-dasharray for the percentage
    const offset = (percentage / 100) * 100;
    loaderProgress.style.strokeDasharray =` ${offset}, 100`;

    // Update the percentage text
    loaderPercentage.textContent =`${percentage}%`;
}

// Example: Simulate loading progress
let progress = 0;
const interval = setInterval(() => {
    val = studentProgress; // Update val according to the student's progress
    if (progress <= val) {
        updateCircularLoader(progress);
        progress++;
    } else {
        clearInterval(interval); // Stop the interval once loading is complete
    }
}, 40); // Update every 50 milliseconds

// Example: Function to update student progress
function updateStudentProgress(newProgress) {
    studentProgress = newProgress; // This function would be called whenever the student's progress is updated
    val = studentProgress; // Update the val variable to reflect the new progress
}


  // Data for the bar chart
  Chart.defaults.elements.bar.borderRadius = 5;
  const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
          label: 'Daily progress',
          data: [60, 50, 70, 100, 30, 70, 10],  // Example data
          backgroundColor: '#0080ff',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          borderradius:2
      }]
  };

  // Configuration options for the bar chart
  const config = {
      type: 'bar',
      data: data,
      options: {
          scales: {
            x: {
                  grid: {
                      display: false  // Remove grid lines on the x-axis
                  }
              },
              y: {
                  beginAtZero: true,
                  grid: {
                      display: false  // Remove grid lines on the y-axis
                  },
                  max:100
              }
          }
      }
  };

  // Render the bar chart
  const myBarChart = new Chart(
      document.getElementById('myBarChart'),
      config
  );

  const pieData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: 'Performance Distribution',
          data: [12, 19, 3, 5, 2, 3],  // Example data
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  };

  // Configuration options for the pie chart
  const pieConfig = {
      type: 'pie',
      data: pieData,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'bottom',
              }
          }
      }
  };

  // Render the pie chart
  const myPieChart = new Chart(
      document.getElementById('myPieChart'),
      pieConfig
  );



// schedule card

 