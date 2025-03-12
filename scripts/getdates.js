// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date of the document
const lastModifiedDate = document.lastModified; 

// Update the copyright year in the footer
const copyrightElement = document.querySelector('footer p:first-child span'); 
copyrightElement.textContent = currentYear;

// Update the last modified date in the footer
const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate}`;