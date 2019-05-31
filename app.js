const dree = require('dree');
const fs = require('fs');
const csv = require('csv-parser');
const https = require('https');

const MESSAGE_FOLDER = './messages';
const FILES_DOWNLOADED_PER_SECOND = 8;

let attachments = [];

let files = [];

// Grabbing all CSV files from the MESSAGE_FOLDER directory
dree.scan(MESSAGE_FOLDER, {
  extensions: [
    'csv'
  ]
}, (file) => {
  files.push(file);
});

// Reading each file and adding them to the 'attachments' array
for(let file of files) {
  fs.createReadStream(file.path)
    .pipe(csv())
      .on('data', (row) => {
        console.log(row);
        if (row.Attachments) {
          console.log('Found attachment link - ' + files.length);

          // Multiple attachments will show up as multiple URLs in the 'row.Attachments' string
          let links = row.Attachments.split(' ');

          // Putting all the links in the 'attachments' array
          links.forEach((link) => {
            attachments.push(link);
          });
        }
      });
}

console.log(`Found ${attachments.length} CDN links in 'messages' folder.`);

let i = 0;

// Running through attachments and putting them into the 'files' directory
// This has to be an interval so that we don't go over discord's CDN rate limit.
setInterval(() => {
  // The URL of the attachment
  const URL = attachments[i];
  // The format of the CDN link is as follows:
  // https://cdn.discordapp.com/attachments/XXXXXXXXXXX/XXXXXXXXX/file_name.jpg
  // We can't use the end 'file_name.jpg' portion of the URL to name the files, so we must use 'XXXXXXXXX-file_name.jpg'.
  // That way, all the file names are unique.
  let fileName = `${URL.split('/attachments/')[1].split('/')[1]}-${URL.split('/attachments/')[1].split('/')[2]}`;

  console.log(`#${i} / ${attachments.length}`);

  // Creating a new file in the files directory
  const file = fs.createWriteStream('./files/' + fileName);
  const request = https.get(URL, function(response) {
    response.pipe(file);
  }).on('error', (e) => {
    console.error(e);
  });
  // Increment i
  i++;
}, 1000 / FILES_DOWNLOADED_PER_SECOND);
