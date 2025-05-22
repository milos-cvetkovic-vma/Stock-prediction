import {priceGet} from './investing.js';

const price = await priceGet(process.env.Sp500);
await console.log(price);