# discord-file-dumper

Discord's Data Dump does not include the actual files you have uploaded to discord, only the CDN links to access the files. This will run through the 'messages' directory discord gives you in your Data Dump and pull out all of the files linked in them through Discord's CDN.

### Instructions:
 - Paste the contents of the 'messages' folder from your Discord Data Dump into the local 'messages' folder. 
 - Download Node.JS if you have not already
 - Clone this project somewhere on to your machine 
 - Navigate to the cloned project using Command Prompt or equivalent
 - Run the command `node app.js` 
 - You will then start to see a bunch of logging happen in the console. This is normal, the script is running through your message history and grabbing CDN links for later. 
 - Once all the CDN links have been found in the message files, it will start scraping the files from Discord's CDN at a rate of 8 files/second. 
 - Once all of the files have been scraped, the **program will crash**. 
 - You can then go and view all of your files in the `files` directory.
 
 *NOTE: If you have an antivirus and have uploaded some shady files to Discord, it will probably trigger as they get downloaded on to your machine.*
 
 ## Pull Requests
 Found an issue? Open a pull request! :)
