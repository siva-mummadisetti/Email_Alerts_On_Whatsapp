# email-alerts-on-whatsapp
Intro :
        
         This helps users to get new email on alerts on whatsapp.
  
Technologies:
              
              This is developed using node js.
              The APIs used are
                1. GMAIL API - To authenticate a user and retrieve their emails.
                2. CallMeBot API - To send retrieved emails as alerts on whatsapp.
           
Steps to follow:
                  
                 1. Creating a project on Google Console:
                 
                    Open https://console.developers.google.com/ website and you need to create a project. On the top left corner, there will be a list of your previous projects or option select a project.A modal will pop up. Select on the option NEW PROJECT. select -> NEW PROJECT Enter a project name and create the project.
                    
                 2. Enable Gmail API:
                 
                    Ensure that you've selected that project, then in the search box search Gmail API. Enable Gmail API.
                    
                 3. Configure Project:
                 
                    => You need credentials but before creating credentials you need to configure credentials. On the left-hand side, you'll find OAuth consent Screen. Click on it.
                    => User Type -> External
                    => Enter app information ie, app name, supporting email, developer contact information.
                    => Scope page save and continue
                    => Test User Tab: Click on add user and you can add up to 100 emails. Add your email for testing. Save and continue.
                    => Finally, after setting up, click on Credentials.
                    
                4. Create Credentials:
                
                    After landing on Credentials, on the top click on CREATE CREDENTIALS. Click on OAuth client ID. Select your application type. As we're using NodeJS, it is a web application. Add URI's as http://localhost:3000. Create and you'll get your credentials.
                    
                5. Code set up:
                
                   •  In the folder, where you created this file, the terminal add the command
                      =>  npm init -   it initializes package.json
                   •  You need to install some dependencies with the command
                      =>  npm i googleapis cheerio mailparser js-base64 open
                   
                   •  Go to google developers console in your project. Navigate to the credentials part. In OAuth 2.0 Client IDs, you'll find a small download icon, download your credentials file from there and add to your folder where you've created this project. Name this file as "credentials.json".
                   
                   •  Run your code in your terminal. When you run for the first time, you'll get something like this :
                   
                      =>  "Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&response_type=code&client_id=479559853488-050lms0ffusprdhh938s954q0s36kg4i.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
                   Enter the code from that page here:"
                   
                   •  Click on that URL and enter the code.
                   Now, in order to be able to manage the labels of the messages, you need to change the initial scope from gmail.readonly to gmail.modify.
                      =>  const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
                      
                   •  Delete token.json from your working directory.
                   One error that some of you might get. The reference code has credentials.installed but it should be credentials.web. When you check the file, credentials.json you'll find everything is inside web object. So, if you get that error just check your creddentials.json file once and replace installed accordingly.
                  
                6. Final Output:
               
                    npm run server
                   
                   

          
