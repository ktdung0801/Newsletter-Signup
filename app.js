const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
// const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000...");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const https = require("https");

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/175cf06be1";
    const options = {
        method: "POST",
        auth: "danny:decd4d5ce7d86f18b560085b9e1bdba7-us17"
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            //console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

// API Key
// decd4d5ce7d86f18b560085b9e1bdba7-us17

// List id
// 175cf06be1
