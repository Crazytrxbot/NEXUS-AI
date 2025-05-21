




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEQ2TkZrMTdBbnJTTngvNTN2dU5URGZzNUlnTm1EQUJiOUdZL0dZTjIycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmVxOUtWOUVYZ0ZnY3lmcXpIQUV2OXJ3ekJ1YTREYXpzTXZod0xRZEpUYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QWpGUEpaQjNtUVhyUUFSZVhaZU8rOTdVaWV5MmE2Y0RtdXpJcWZrOWtjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2MDJGS2hPMSs0Y0JDWWdRRW5jMktveTVkaW9TK1Zwcm5SL3FrVVF5TENRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJJcEFTQ3hON0xlV3dmRkMvM0g2L2QzZmxxcVR5ZEZ0OElWRVl3dmE0VjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFOM0pUa3ZLK2NEcC9XRVpWVW5TN3Bpa3V4bkJFL3FEdjRTenRHVTZEM2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUNWUFRGQUdMZ3Ntbm1OTU9UUDJNMUROeEMwYXZwcy8yVWRWT0JveWIwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVdIaXMyd2N3bFN0N3RRTGQ5ZzhJS2RPSm5CY2t6R25CZU1mR1RMcTFndz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhEdUtyNnNta0paQzBpRjQxY3dSZjBNZjhlVkJIQVV5am1SWHc1dm1zcnUrcTh4Yjdnd0wxVUhSSklyemRkdnN2WHNsQVBEWVJLRmpTUFRoVEZkMUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzIsImFkdlNlY3JldEtleSI6Ik9ibUgrRG50VkxQU1hrRUp0QmQ0emlhbkh6dmFlRHo3MXJLcjR1TUVQUTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5ODgzNTY1NTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjEwOUZBNURGMUQxNURGODAwMjFCMEU2QTk1QzczRDhGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4MDcxMzl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTg4MzU2NTU2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDQTNEOTY1OTlFN0VBMDMxMUE0ODBGNDI0QkU0NkVDMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODA3MTQwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk4ODM1NjU1NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkJBQkIwRkE1MkQ5RjI0NkFERUZDMURDRjk2MTI0QTYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzgwNzE1Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUFI0QjRCWTEiLCJtZSI6eyJpZCI6IjkxOTg4MzU2NTU2MzozOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI0OTgxNzI1OTMxNTI0MTozOUBsaWQiLCJuYW1lIjoi8J2Zj/CdmafwnZme8J2ZqPCdmZ3wnZmWIOKdpOKAjfCfqbkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lNDZhQURFSlRYdGNFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVXVlJOWGttYnRHdW84ajUrMlpoN0wwdndjQXJiSU1JczRybXhNa1JPbkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImEzSGd6ZXQzem14ekU1TGNoREk3dXpRTGtPMmhRdlNQUHhybnM5SWxBc1VkZEF6bExTTEpnQ0FGRUFLZGJJVGloQ3lGTzg1ZERiS2NIVXkwSFRTcURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3TWFxbXFmQTJlZTFnQnpMSXVhZkZDN1VrYWtxb2NLOFdmcGQ0OXFpNmJIN3ZjNzBVekU5TFVKcE1rcHhOa0c5VmN0QjNhUVFEWDBYcHRyaWxxdGVBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTg4MzU2NTU2MzozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJibGxVVFY1Sm03UnJxUEkrZnRtWWV5OUw4SEFLMnlEQ0xPSzVzVEpFVHB3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDc4MDcxMzcsImxhc3RQcm9wSGFzaCI6IjRaUlA2UyIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWdLIn0=',
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
