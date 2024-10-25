const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURrWnI1dVRlN2Era1k3SnhUSnVadmdRcnBZNnl3Q2lGRnhXQUVrbkgyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekxBQ1Jxdm80Y2srTTRaellGVnRKbmUrZ2JyU3NhMWpPUXNwTit5V0ZWMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTGNzUzRUYlhhbXQycTg2TmwycGZUd1QzdGR2Qm9hZkpWdEFjYi83YzA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqcXBwdFRsR0FyYlF1dXNBZ0t3Q3NyZFhrMys5S3p3YlA2Z0pPWlU2OTBVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhLRkJpTVVtR1h4WTRVcUdlTnFvVEZIR3dVLzdpZzJNZnhjUWhRNWJnV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldQcjVDYmI0UU9TdUxieDMxQ083RkRrOU9nUHI5OWYwNXdOb3N0T0lJa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid05qRzVrRFZPVlFxdXJvQkpkd1hLbmphVG9uL2hpeDVTQVlENk96aHFHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid25lNlh3RDZLVzNJTm45dEJEVEMyYlJxbHNQMktyaElrTEZ0Mzd5eGRocz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFGaCtNQTV3cURleFVXckRHU3hKK0FVNk1abWxPeTEyRW80WjdOZVpnYldUZk4zcS9XWnNLQVpvQ2FVVVRhOHErODUrZzVFQ2VLajZveGFVcG9GTEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDcsImFkdlNlY3JldEtleSI6ImZFaUQzS2RhMi8ySFNiajdFZkhCczVoYldCaXIvOVQveU1hOWhSM3VMWGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzA4MzM2NDQ4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJFRDhGMzE5MzFBNjY1OEIyQTYwNzBENDFCOTlEOURFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk4MzY5NDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwODMzNjQ0OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFNEUxQkRCQjIyMzVCNTRCOTRDMThDNkQyMDIwNTZFNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI5ODM2OTQxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDgzMzY0NDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTlBRjU0RUMxN0FEQUY3QTQwMzE4Q0FGNkE0QzZGN0MifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTgzNjk0Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzA4MzM2NDQ4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZEM0MxMEU4ODM3RTVDRUVFOTU0REI5NzJEQ0UwMUFEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk4MzY5NDJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im9ZUVFYS045UklxV05SeERzOHZTMUEiLCJwaG9uZUlkIjoiNjYyZDE2YWYtNDIxNC00NTFmLTlhOTctMjEyZjRlYTQxN2YxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCelJCbjQrZGZIdUV4YzNHTlB0aVkyZk4vdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIcDJ5UG1WdHprVjRuZ3Jhd3VHN0xlMEZCYzg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUllQMlROR1QiLCJtZSI6eyJpZCI6IjI1NDcwODMzNjQ0ODoyNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJUcmFjZVdpbGwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lqbnRPSUZFUDd1N0xnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJvV1dLcjBJVFBma3I2RnJRZGIydWNyaDkzZ0JOQ3loQVVCS3dOd2grRUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlBXUFN4VEVnN1JhSGZ0cktjcXVFMGdMUXdpMjl0ank2bHkwQ25UN1g1c1JSbkRSa1F6QnpPVzJXeGlpc0RtUkloanJ2VmVHckF5Z3I0KytEakxqSkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpMVBHVDJvUUxRL2p1Z0ZVc244UlFEcG9BZmcxdVg2K2lXKzRDNFdBKzFMVHZ0VDJwdFUyTm9WSVBrNmUzQ0FmekhiN0E2TGhhVjRCcGZBdFNyYU1CZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwODMzNjQ0ODoyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRYUZsaXE5Q0V6MzVLK2hhMEhXOXJuSzRmZDRBVFFzb1FGQVNzRGNJZmhBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5ODM2OTQwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlxRiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
