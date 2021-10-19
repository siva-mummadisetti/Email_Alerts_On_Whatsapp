import fetch from 'node-fetch';
import pkg from 'base-64';
import { readFile, writeFile } from 'fs';
import { createInterface } from 'readline';
import { google } from 'googleapis';
import { load } from 'cheerio';
import { MailParser } from 'mailparser';
const { decode } = pkg;
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function listMessages(auth, query){
  query = 'harshavardhanaws474@gmail.com';
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list(      
      {        
        userId: 'me',  
        q:'harshavardhanaws474@gmail.com is:unread',      
        maxResults:1     
      },  (err, res) => {        
                    if (err) {        
                        reject(err);          
                        return;        
                    }        
                    if (!res.data.messages) {               
                        resolve([]);          
                        return;        
                    }resolve(res.data);  
                getMail(res.data.messages[0].id, auth);
      }    
    );  
  })
}
readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages);

});


function getMail(msgId, auth){
  const gmail = google.gmail({version: 'v1', auth});
  //This api call will fetch the mailbody.
  gmail.users.messages.get({
      userId:'me',
      id: msgId ,
  }, (err, res) => {
      if(!err){
          var snippet = res.data.snippet;
          whatsapp(snippet);

      }
  });
}
async function whatsapp(params) {
    console.log(params);
    var message = JSON.stringify(params);
    await fetch(
        "https://api.callmebot.com/whatsapp.php?phone=+918367426378&text="+message+"&apikey=204898"
    );
}
