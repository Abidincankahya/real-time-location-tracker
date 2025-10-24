# 🌍 Real-Time Location Tracker

Gerçek zamanlı konum takibi yapan web uygulaması.  
Kullanıcılar tarayıcılarından konumlarını paylaşır, diğer kullanıcılar haritada anlık olarak görünür.

## 🚀 Özellikler
- Gerçek zamanlı konum paylaşımı (Socket.io)
- OpenStreetMap tabanlı Leaflet harita
- PostGIS veritabanı ile konum saklama
- Express.js backend API
- WebSocket ile anlık güncelleme

## ⚙️ Kurulum

### PostgreSQL + PostGIS kurulumu
```sql
CREATE DATABASE konumdb;
\c konumdb
CREATE EXTENSION postgis;

CREATE TABLE locations (
  user_id TEXT PRIMARY KEY,
  geom geometry(Point, 4326)
);
```

### Backend başlatma
```bash
cd backend
npm install
node server.js
```

### Frontend açma
`frontend/index.html` dosyasını tarayıcıda aç.  

## 📜 Lisans
MIT License © 2025
