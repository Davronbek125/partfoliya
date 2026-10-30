// Alwaysdata upstream IPv6 manzilga ulanadi (HOST=fd00::...), Next esa
// sukut bo'yicha 0.0.0.0 (faqat IPv4) da tinglaydi va natijada 502 qaytadi.
// Shu sabab Next'ning `server.js` fayli `server-real.js` ga ko'chiriladi,
// bu fayl esa uni dual-stack (`::`) interfeysda ishga tushiradi.
//
// Bu Node runtime fayli (Next build ichida emas), shuning uchun CommonJS.
/* eslint-disable @typescript-eslint/no-require-imports */

process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.HOSTNAME = process.env.HOSTNAME || "::";

require("./server-real.js");
