from flask import Flask, render_template, abort, send_from_directory, Response
import os
import pathlib
from utils.markdown_parser import render_markdown

# Create the Flask app with explicit static folder using pathlib
current_dir = pathlib.Path(__file__).parent.absolute()
static_folder = current_dir / 'static'

app = Flask(__name__, 
           static_folder=str(static_folder),
           static_url_path='/static')

POSTS_DIR = "posts"

# Print debugging info at startup
print(f"App running from directory: {current_dir}")
print(f"Static folder path: {static_folder}")
print(f"Static folder exists: {static_folder.exists()}")
print(f"Contents of static folder: {[x.name for x in static_folder.iterdir() if static_folder.exists()]}")

def get_posts():
    """Get all blog posts from the posts directory."""
    # Create posts directory if it doesn't exist
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        # Create a sample post if directory is empty
        with open(os.path.join(POSTS_DIR, "welcome.md"), "w", encoding="utf-8") as f:
            f.write("# Welcome to my Blog!\n\nHey there! 👋 Welcome to my corner of the internet where I share my journey through the world of technology and software development. As a passionate developer, I believe in learning and sharing knowledge with the community.\n\n## What to Expect\n\nI'll be diving into various topics including:\n\n* 💻 Programming tutorials and code snippets\n* 🚀 Tech insights and industry trends\n* ⚡ Development best practices and tips\n* 🔧 Personal projects and their development process")
    
    posts = []
    seen_slugs = set()  # Track slugs to prevent duplicates
    
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".md"):
            slug = filename[:-3]
            
            # Skip if we've already processed this slug
            if slug in seen_slugs:
                continue
                
            seen_slugs.add(slug)
            path = os.path.join(POSTS_DIR, filename)
            
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                
            html = render_markdown(content)
            
            # Extract title from the first heading
            lines = content.splitlines()
            title = None
            
            for line in lines:
                if line.startswith('# '):
                    title = line.replace('# ', '').strip()
                    break
                    
            if not title:
                title = slug.replace('-', ' ').title()
            
            posts.append({
                "slug": slug,
                "title": title,
                "content": html
            })
    
    # Sort posts (newest first - assuming filenames contain dates)
    # You might want to modify this if you have a different sorting preference
    return sorted(posts, key=lambda x: x["slug"], reverse=True)

# Direct route for JavaScript that doesn't rely on file system paths
@app.route('/js/theme-toggle.js')
def serve_theme_toggle_js():
    # This returns the JavaScript content directly
    js_content = """
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference when page loads
        const savedTheme = localStorage.getItem('theme');
        
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
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = 'Dark Mode';
            }
        });
    });
    """
    return Response(js_content, mimetype='application/javascript')

@app.route("/")
def index():
    posts = get_posts()
    return render_template("index.html", posts=posts)

@app.route('/post/<slug>')
def post(slug):
    path = os.path.join(POSTS_DIR, f"{slug}.md")
    if not os.path.exists(path):
        abort(404)
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract title from first heading
    lines = content.splitlines()
    title = None
    
    for i, line in enumerate(lines):
        if line.startswith('# '):
            title = line.replace('# ', '').strip()
            # Remove the title line from content
            content = '\n'.join(lines[:i] + lines[i+1:])
            break
    
    if not title:
        title = slug.replace('-', ' ').title()
    
    html = render_markdown(content)
    return render_template("post.html", title=title, content=html)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/debug')
def debug():
    # Use pathlib for more reliable path handling in WSL
    app_dir = pathlib.Path(__file__).parent.absolute()
    static_dir = app_dir / 'static'
    js_dir = static_dir / 'js'
    css_dir = static_dir / 'css'
    
    debug_info = {
        'app_directory': str(app_dir),
        'static_directory': str(static_dir),
        'js_directory': str(js_dir),
        'css_directory': str(css_dir),
        'static_exists': static_dir.exists(),
        'js_exists': js_dir.exists(),
        'css_exists': css_dir.exists(),
        'js_files': [f.name for f in js_dir.iterdir()] if js_dir.exists() else [],
        'css_files': [f.name for f in css_dir.iterdir()] if css_dir.exists() else [],
        'os_name': os.name,
        'environment': {k: v for k, v in os.environ.items() if k.startswith('WSL')}
    }
    
    return f"""
    <h1>Debug Info</h1>
    <pre>{debug_info}</pre>
    <p>CSS URL: <a href="/static/css/style.css">/static/css/style.css</a></p>
    <p>JS URL: <a href="/js/theme-toggle.js">/js/theme-toggle.js</a></p>
    """

if __name__ == "__main__":
    app.run(debug=True)