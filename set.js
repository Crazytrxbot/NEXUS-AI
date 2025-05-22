




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xydVJtZmE5Q0hlSVRVcS9NMkFXQlBvNFdTUzRmT28vNkp0czlHT28yST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUW9Cd0g2SWRzVjUzM1FnLzltWHdEUmw5QWFYZDJhMjFzMnQ5QTdpTlFqRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQWNjVGxmUlk4cHNENSswUXRPU1B1WWorSERWbHE5L0lreWZlb21ZNTFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwdHVrQU1aRmtuU1V5MmlnWlVrRkFKWDBPR0V3WFdTZUFzZlRxeDYvQzI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNJN1JiTjlWQVVIV0tTS2paRy9YNGxUMUNaQUVHWStHR3IwV3hKQUJUbU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJFbEJiRVpRdTJINDlLMm1VWkpmQXRvMWZpVkdrZDJHZHdnRGdxdHBxeUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0J5V2hCaFRFMmNudnJvazBRTUc3eG9KU2Q3T3JvbTEyQlY1aS9XNlluMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSS9yQzIvQ2RLbTQ3S1pRUDBreHUrN3pJUUxhMEFRSllLVE12cENTZFdYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZpZmpRVEZhdWRad05HbzNMczZCbG1weFcrT0tRQTF1OHpTOXR5MmhiRlBFanVpNG1TSVJtOWp5OUpONCtUTFp1MzZCUGJ2TTVjTzN5L2c1MmlUYWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6IlFLWUpxTEpxZ2R4WFNSZXRieVhwUm9yRmVMbC8yVDlqYkxkWUloRHBaMHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5NDc1NzI5NTY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY0N0I0RUNFMDI5RjAzQjhEQjVBMUI5OTM4NUFCQTM4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4ODgyMDZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTQ3NTcyOTU2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1RTJBRjE3MjVFMTQ0M0U2MTI4OUJGRTkzMkNBNUExNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODg4MjExfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk0NzU3Mjk1NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTI1ODYyNDk5RDNCNDVBQjA2MjgzN0I5NDg5NUUxNEYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzg4ODIxOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5NDc1NzI5NTY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjczNEZBQjNBMTZGQzdDM0I5N0Y3MjYwMzgxNUQzQjUwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4ODgyMjZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTQ3NTcyOTU2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERjc0REUyMTMwM0FFQUI5MzhDNjI0RTg3RUE0MEJDNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODg4MjMzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk0NzU3Mjk1NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzYzMzdDRjgwNkQxOUUyQzU4MkQ1RjI4NTYwMDgwRjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzg4ODIzNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiWkJMV1EzVzMiLCJtZSI6eyJpZCI6IjkxOTQ3NTcyOTU2NjozOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjM5MjA4ODA2NzgxMDA1OjM5QGxpZCIsIm5hbWUiOiLwnZmO8J2YvPCdmZTwnZi88J2ZiSDwn4ya8J+NgyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmFlaTdFQ0VMdlF1c0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZUpLZ1BNSnZQbktRWTdiczZZVmFhaW0yVkFzWVZEN3BoYzFZc09mUGR3ST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQXNXeFo3NzJlVzJXRXd0R1NyR0oxcHJ1d2lHOHJoTVhSWWZDbFVpWmxFT3NrMXJLMW0vc0JqT3RNZENiV00wbDA4RitDM2YreldvdzE5ZGsvREZyQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IldDODBpSHNib0k1eWFGTCtMZ3BSeFZwZnIxVVpBL1QxWmNxOUpnYW1JWU45OE04a3FxZ0dBdHlPTkovY3V5WEk1RVdoOXNhUzVZS1Z6MnhUSCtMOWd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NDc1NzI5NTY2OjM5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhpU29EekNiejV5a0dPMjdPbUZXbW9wdGxRTEdGUSs2WVhOV0xEbnozY0MifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Nzg4ODIwMCwibGFzdFByb3BIYXNoIjoiM2ZZd0NLIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKUW0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254710772666",
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
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
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
