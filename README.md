# About

***May or may not continue development on this***

TForm is a dynamic webform written in vanilla JavaScript. Its ultimate end-goal is to replace the need for the standard &lt;form&gt; element, giving enhanced functionality because of its dynamic nature. 
  
The project is in its early stages of development, though functional. It was extracted from a larger project that I'm working on, and so if future developments continue it will reflect the needs of said project.
  
# Usage
  
***1. Use &lt;t-form&gt;&lt;/t-form&gt; to create the form.***
Attributes include "id", "method" and "url." Example:
    
<code> &lt;t-form id="myForm" method="post" url="127.0.0.1"&gt;&lt;/t-form&gt;</code>

***2. Insert standard form elements as children*** (e.g., &lt;input&gt;), and or use one of the T-Form Elements provided as a replacement (e.g., &lt;t-box&gt; in place of &lt;input&gt;). Each T-Form Element may have different attributes you can use. 

If you use standard HTML form elements, default verification will be used (e.g., checkValidity()). However, if you use T-Form Elements, then verification will be performed by that element.

***3. Use JavaScript to submit the form*** (see the example below).
  
  ***(Do not initialize any web components from this package. This is done automatically.)***
  
  # Example
  
See example.js
  
