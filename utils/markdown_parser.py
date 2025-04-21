import markdown
from markdown.extensions.codehilite import CodeHiliteExtension

def render_markdown(md_text):
    return markdown.markdown(
        md_text,
        extensions=[
            'fenced_code',
            CodeHiliteExtension(linenums=False, css_class='highlight')
        ]
    )
