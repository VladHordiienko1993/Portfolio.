const {Chat,User,UserChat,Message} = require("../models");
const createError = require('http-errors')
module.exports.createChatWithBots = async (req, res, next) => {
  try {
    const { user } = req.session;
    const botIds = [2, 3];

    if(!user || !user.id){
        // return next(createError(401),'User Not authenticated')
        return res.status(401).send({error: 'User Not authenticated'})
    }

    // Проверка, существует ли уже чат, где данный пользователь является владельцем
    const existingChat = await Chat.findOne({
      where: { ownerId: user.id }
    });

    if (existingChat) {
      // Если чат существует, возвращаем информацию о существующем чате
      // console.log(existingChat.id)
      return res.status(200).send({data: existingChat.id,message:'OK'});
    }

    // Создание нового чата, если пользователь еще не владеет чатом
    const newChat = await Chat.create({ ownerId: user.id });

    // Добавление пользователя (владельца) в чат
    await newChat.addUser(user.id);

    // Добавление ботов в чат
    for (const botId of botIds) {
      const bot = await User.findByPk(botId);
      if (bot) {
        await newChat.addUser(bot);
      } else {
        console.log(`Bot with ID ${botId} not found`);
      }
    }
    // console.log(newChat.id)
    res.status(201).send({ data: newChat.id });
  } catch (error) {
    console.error("Error creating or managing chat:", error);
    next(error);
  }
};


module.exports.addMessage = async (req,res,next)=>{
  
    try {
    const { text, userId, chatId } = req.body; 
    
    
      // Проверка, что пользователь принадлежит к чату
      const userChat = await UserChat.findOne({
        where: {
          userId: userId,
          chatId: chatId
        }
      });
  
      if (!userChat) {
        return res.status(403).send({ message: "You are not a member of this chat." });
      }
  
      // Создание и отправка нового сообщения
      const message = await Message.create({
        userId,
        chatId,
        text
      });
  
      res.status(201).send({data: message});
    } catch (error) {
      next(error)
    }
};


module.exports.renderMessages = async(req,res,next)=>{
  try {
      const {chatId} = req.body;
    
    console.log(chatId); // не рвбответ 


        // Получение всех сообщений из чата
        const messages = await Message.findAll({
          where: { chatId },
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'name'] // Информация о каждом отправителе
          }],
          order: [['createdAt', 'ASC']] // Сообщения отсортированы по времени отправки
        });
    
        res.status(200).send({data:messages});
  } 
  
   catch (error) {
    next(error);
  }
};