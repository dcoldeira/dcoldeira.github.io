Title: LaTex for Scientific Writings
Date: 2020-08-21 12:00
Category: A Scientific Programming approach...
Tags: scientific writings, physics, maths
Slug: best-tool
Authors: David Coldeira
Summary: LaTex for scientific writings


LaTex, the [document preparation system for high-quality typesetting](https://www.latex-project.org/about/) has been used for scientific writings as a standard for both, scientist writing papers and the publishers.

Writing/coding in LaTex is very simple, it uses plain text and 'markup' tagging conventions which allows you to define the structure of the paper like so:

```LaTex
\documentclass{article}
\begin{document}
  Hello World!
\end{document}
```
This is then transferred to MikTeX or TeX Live (TeX typesetting systems) to produce an output file like .PDf or .DVI.  

A basic paper template will look something like this:

```LaTex
\documentclass{article}

\title{My Paper}
\date{2020-07-01}
\author{David Coldeira}

\begin{document}
  \pagenumbering{gobble}
  \maketitle
  \newpage
  \pagenumbering{arabic}

  My lovely paper contain goes in here...
  
\end{document}
```

Writing mathematical equations are very intuitive and straight forward:

```LaTex
\[E=mc^2\]
```
Will render:

<img src="https://latex.codecogs.com/svg.latex?\Large&space;\\E=mc^2\\"/>

There are plenty of [tutorials](https://www.latex-tutorial.com/tutorials/) and ['howtos'](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes) and [more](https://www.latex-project.org/get/) out there that will be redundant to just do another one here... 

However, it is important to mention that the LaTeX project has a free public software license. The most recent version of the LPPL is version 1.3c. The latest version, in plain text is [here](https://latex-project.org/lppl.txt). There is also a LaTeX version of the license, which authors of LPPL software are encouraged to include in their manuals.

## LaTex in R

If you are writing a paper that needs to show a section of R code then:

```LaTex
\begin{lstlisting}[language=R]
R code goes here...
\end{lstlisting}
```

## LaTex in Python:

In Python, the 'subprocess' module allows you to spawn new processes, you can then run a script to quickly write a file and output a LaTex document in a .PDF form: 

```Py
import subprocess, os

with open("a-tex-file.tex","w") as file:
    file.write("\\documentclass{article}\n")
    file.write("\\begin{document}\n")
    file.write("Hello Paper!\n")
    file.write("\\end{document}\n")
    
p = subprocess.call("pdflatex a-tex-file.tex")
if p != 0:
print("Exit-code not 0, check result!")
else:
os.system("start a-tex-file.pdf")
```
more [here..](https://pypi.org/project/latex/)

There are few libraries in Python like [reportlab](https://pypi.org/project/reportlab/) toolkit, an Open Source that will generate a PDFs and/or graphics out from LaTex. There is also [PyLaTeX](https://jeltef.github.io/PyLaTeX/current/) another common library for this propose. 

**In Conclusion -**  LaTex is a very powerful, simple and customizable tool (particularly true for Python) for writing scientific papers with a huge community and support and libraries out there. 