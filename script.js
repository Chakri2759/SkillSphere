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

