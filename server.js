import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { saveLocation, getAllLocations } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", async (socket) => {
  console.log("Yeni kullanıcı bağlandı:", socket.id);

  socket.on("sendLocation", async (data) => {
    await saveLocation(data);
    io.emit("receiveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("Kullanıcı ayrıldı:", socket.id);
  });
});

app.get("/locations", async (req, res) => {
  const result = await getAllLocations();
  res.json(result);
});

server.listen(5000, () => console.log("🚀 Server 5000 portunda çalışıyor"));