// Theme toggle with persistent storage
document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference when page loads
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    // Apply the saved theme if it exists
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = 'Dark Mode';
    }
    
    // Add click event listener to toggle theme
    themeToggle.addEventListener('click', function() {
        // Toggle the dark-theme class
        body.classList.toggle('dark-theme');
        
        // Update localStorage and button text
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Light Mode';
            console.log('Theme set to dark');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Dark Mode';
            console.log('Theme set to light');
        }
    });
});
