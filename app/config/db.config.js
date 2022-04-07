module.exports = {
  // 1. MongoDB
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://SM:SM12345@cluster0.zeid6.mongodb.net/Sports?retryWrites=true&w=majority',
  
  // 2. Express Server Port
  PORT: process.env.PORT  || 8000
};

