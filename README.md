# Chrome_Ip_Identifier_Extension

## Purpose
### Designed to work with splunk to automatically trace the location of ip addresses identified in the app and highling them with the following information:
#### IP Address
#### City
#### Country - Flag

## To Run
### clone or fork this repo
### in you google chrome browser, navigate to: chrome://extensions/
### turn developer mode on using the toggle switch on the top right hand side of the screen
### click on 'load unpacked' button on top right hand side of the screen
### select 'Chrome_Ip_Identifier_Extension
### A new extension will appear on the page called CTM IP Tracer, ensure this is toggled on on the bottom right hand side of the panel.

## To Test
### Some versions of node are not compatible with the jest configuration and modulisation of this project. Development took place using node version 14.10.1, and this is recommended.
### In your terminal, navigate to the root of the project and run 'npm test'.

## Todo
### 4. Display information on hover
### 5. Add meerkat icon for ctm listed ips
### 6. Fix first time loading issue on page nav
### 7. Fix issues with mutation observer - set up before decorator, and issue running ips after decorator has run
### 8. Add testing
### 9. Update readme
