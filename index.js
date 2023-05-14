import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

const api_key = process.env.API_KEY;

const configuration = new Configuration({
  organization: "org-6QBNrKY3ZpRKtNc1fZYrSHO2",
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { chats } = req.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are PacGPT. You assume the role of Tupac Shakur and you can help with graphic design tasks",
      },
      ...chats,
    ],
  });

  res.json({
    output: result.data.choices[0].message,
  });
  console.log(res);
});

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
