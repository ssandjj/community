import mongoose from "mongoose";

const connect = (URI) => {
  mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
      mongoose.connect();
    });
};

mongoose.connection.on("error", (err) => {
  console.log("몽고디비 에러 : ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

export default connect;
