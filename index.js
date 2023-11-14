const express = require('express');
const server = express();
const axios = require("axios");
const cors = require('cors');

//server.use(cors);

const config = {
  headers: {
    "x-api-key": "sec_kPnDKgfMSmiAbadZQlbU7HcAwmIpEx1T",
    "Content-Type": "application/json",
  },
};

server.use(cors());

server.use(
    express.urlencoded({extended: true})
);

server.use(express.json());




server.get('/healthcheck', (req, res)=>{
    return res.json({result: 'Api online'})
});


server.post('/getResponse', (req, res)=>{
    var payload = {
        referenceSources: true,
        sourceId: "cha_rJj86HsKcVbVCBS91punQ",
        messages: [
          {
            role: "user",
            content: req.body.request.toString()
          },
        ],
      };

    console.log(payload);

    var result = "";

    axios
    .post("https://api.chatpdf.com/v1/chats/message", payload, config)
    .then((response) => {
        result = response.data.content;
        return res.json({result: result, references: response.data.references})
    })
    .catch((error) => {
    console.error("Error:", error.message);
    console.log("Response:", error.response.data);
    });
    
});



server.listen(3000, ()=>{
    console.log('Server up....')
});
