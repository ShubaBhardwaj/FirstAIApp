Step1:-> 1st we did the instalizing the project by 'npm init -y'

Step2:->  we need the some env "
            MONGO_URI=
            JWT_SECRET=
            
            MAILTRAP_SMTP_HOST=
            MAILTRAP_SMTP_PORT=
            MAILTRAP_SMTP_USER=
            MAILTRAP_SMTP_PASS=
            for mailtrap go on there website and login create account it is used for the sending the mails

            GEMINI_API_KEY=
            this is our AI model which can be replaced by anyothere else

            APP_URL=http://localhost:3000"

Step3:->  then we need the nodemon for the our server to up and running
Step4:-> - now we need the bcrypit this is the pasward utility 
        - Cors this utility for connecting with frontend
        - env utility
        - Express utility
        - mongoose
        - nodemailer for just processing
        - JsonWebToken
Step5:-> for AI Part
        @inngest/agent-kit
        inngest

Step6:-> Now we completed the Models of the Schema

Step7:-> Now we make the utils for sending the the mail after user come in our database for suscessfully login

Step8:-> Now we make the inngest part in which we first make the client of it and then onSignup function (In this I learn how to make segmentad piplines and this pipline are connected to each other i can use the somthing from previous pipline also.)