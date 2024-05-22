function showProject(projectId) {
    
    var projects = document.querySelectorAll('.project');
    projects.forEach(function(project) {
        project.style.display = 'none';
    });

    
    var selectedProject = document.getElementById(projectId);
    if (selectedProject) {
        selectedProject.style.display = 'block';
    }
}


