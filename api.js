import express from "express";
const router = express.Router();
import * as inr from "./controllers/user.js";
import * as stock from "./controllers/symbol.js";
import * as order from "./controllers/order.js";
import * as common from "./controllers/common.js";

// Endpoints
router.route("/user/create/:userId").post(inr.createUser);
router.route("/symbol/create/:stockSymbol").post(order.createSymbol);
router.route("/orderbook").get(order.orderbook);
router.route("/balances/inr").get(inr.inrBalances);
router.route("/balances/stock").get(stock.stockBalance)
router.route("/reset").post(common.reset);

// Functionalities
router.route("/balance/inr/:userId").get(inr.balanceOfUser);
router.route("/onramp/inr").post(inr.onrampInr)
router.route("/balance/stock/:userId").get(stock.balanceOfUser);
router.route("/orderbook/:stockSymbol").get(order.viewBook)


// 3 main functions
router.route("/order/buy").post(common.buyYesOrNo);
router.route("/order/sell").post(common.sellYesOrNo);
// Minting already happening inside buy and sell, here we are minting fresh tokens to the same user and deducting their balance
router.route("/trade/mint").post(common.mintTokens)

export default router;