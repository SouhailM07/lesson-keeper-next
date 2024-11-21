import { connect, connection } from "mongoose";

export default function connectMongoose() {
  // Check if the connection is already established
  if (connection.readyState >= 1) {
    console.log("============================");
    console.log("DB is already connected");
    console.log("============================");
    return;
  }

  // If not connected, establish a new connection
  connect(process.env.URI!)
    .then(() => {
      console.log("============================");
      console.log("DB is connected successfully");
      console.log("============================");
    })
    .catch((err) => {
      console.log("============================");
      console.log("DB connection failed");
      console.log("Error:", err.message);
      console.log("============================");
    });
}
