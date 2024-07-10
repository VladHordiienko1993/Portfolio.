const {Router} = require("express");
const ChatController = require("../../controllers/chat.controller");




const chatRouter = Router();

chatRouter.post('/', ChatController.createChatWithBots);
chatRouter.post('/chatId/userId/messages', ChatController.addMessage);
chatRouter.post('/chatId/messages', ChatController.renderMessages);

module.exports = chatRouter;