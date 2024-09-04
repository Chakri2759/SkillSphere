// progressBar Working

let studentProgress = 70; // This should be updated based on the actual work completed by the student
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
    loaderProgress.style.strokeDasharray =`${offset}`,100;

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