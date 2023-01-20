import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.ywpae1t.mongodb.net/?retryWrites=true&w=majority`;
  console.log(username,password);
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error:", error);
  }
};

export default Connection;