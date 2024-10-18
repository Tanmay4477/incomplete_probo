import { INR_BALANCES, STOCK_BALANCES, ORDERBOOK } from "../variables.js";

export const reset = async (req, res) => {
    try {
        for (let key in INR_BALANCES) {
            if(INR_BALANCES.hasOwnProperty(key)) {
                delete INR_BALANCES[key];
            }
        };
        for (let key in STOCK_BALANCES) {
            if(STOCK_BALANCES.hasOwnProperty(key)) {
                delete STOCK_BALANCES[key];
            }
        };
        for (let key in ORDERBOOK) {
            if(ORDERBOOK.hasOwnProperty(key)) {
                delete ORDERBOOK[key];
            }
        }
        // Problem was assignment to constant variable is not defined and fir uske liye ek alag object banana padta and humko same object ko null krna h
        // INR_BALANCES = {}, STOCK_BALANCES = {}, ORDERBOOK = {} 

        return res.status(200).json({INR_BALANCES, STOCK_BALANCES, ORDERBOOK});
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}

export const sellYesOrNo = async (req, res) => {
    try {
        const { userId, stockSymbol, quantity, price, stockType } = req.body;
        if(!userId || !stockSymbol || !quantity || !price || !stockType) {
            return res.status(400).json("Something is missing in the body");
        }        
        const oppositePrice = (10-parseInt(price));
        const oppositeType = stockType === "yes" ? "no" : "yes";

        STOCK_BALANCES.hasOwnProperty(userId) ? STOCK_BALANCES[userId] : {};    
        STOCK_BALANCES[userId].hasOwnProperty(stockSymbol) ? STOCK_BALANCES[userId][stockSymbol] : {};
        STOCK_BALANCES[userId][stockSymbol].hasOwnProperty(stockType) ? STOCK_BALANCES[userId][stockSymbol][stockType] : {};
        STOCK_BALANCES[userId][stockSymbol][stockType].hasOwnProperty("quantity") ? STOCK_BALANCES[userId][stockSymbol][stockType].quantity : 0;        
        STOCK_BALANCES[userId][stockSymbol][stockType].hasOwnProperty("locked") ? STOCK_BALANCES[userId][stockSymbol][stockType].locked : 0;


                // Important check code
                if(STOCK_BALANCES[userId][stockSymbol][stockType].quantity < quantity) {
                    return res.status(401).json("No Stock Balance, go");
                }


        INR_BALANCES.hasOwnProperty(userId) ? INR_BALANCES[userId] : {};
        INR_BALANCES[userId].hasOwnProperty("balance") ? INR_BALANCES[userId]["balance"] : 0;
        INR_BALANCES[userId].hasOwnProperty("locked") ? INR_BALANCES[userId]["locked"] : 0;

        ORDERBOOK.hasOwnProperty(stockSymbol) ? ORDERBOOK[stockSymbol] : {};
        ORDERBOOK[stockSymbol].hasOwnProperty(stockType) ? ORDERBOOK[stockSymbol][stockType] : {};
        ORDERBOOK[stockSymbol][stockType].hasOwnProperty(price) ? ORDERBOOK[stockSymbol][stockType][price] : {};
        ORDERBOOK[stockSymbol][stockType][price].hasOwnProperty("orders") ? ORDERBOOK[stockSymbol][stockType][price].orders : {};



console.log("dfkjbvdfj");



        if (ORDERBOOK[stockSymbol][oppositeType].hasOwnProperty(oppositePrice)) {
            STOCK_BALANCES[userId][stockSymbol][stockType].quantity -= quantity;
            INR_BALANCES[userId].balance += (price*quantity);

            if(ORDERBOOK[stockSymbol][oppositeType][oppositePrice].total === quantity) {
                ORDERBOOK[stockSymbol][oppositeType][oppositePrice].total -= quantity;
                ORDERBOOK[stockSymbol][oppositeType][oppositePrice].total.orders = {}; 
            }
            return res.status(400).json({ORDERBOOK, STOCK_BALANCES});
        }

        // -----------------------------------------

        STOCK_BALANCES[userId][stockSymbol][stockType].locked += quantity;
        STOCK_BALANCES[userId][stockSymbol][stockType].quantity -= quantity;



        // Important Code
        ORDERBOOK[stockSymbol][stockType][price].hasOwnProperty("total") ? ORDERBOOK[stockSymbol][stockType][price].orders : 0;
        ORDERBOOK[stockSymbol][stockType][price].total += quantity;

        if(ORDERBOOK[stockSymbol][stockType][price].orders.hasOwnProperty(userId)) {
            ORDERBOOK[stockSymbol][stockType][price].orders[userId] += quantity
        }
        else {
            ORDERBOOK[stockSymbol][stockType][price].orders[userId] = quantity;
        }
            
        return res.status(200).json({ORDERBOOK, STOCK_BALANCES});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "msg": error.message
        });
    }
}

export const buyYesOrNo = async (req, res) => {
    try {
        const { userId, stockSymbol, quantity, price, stockType } = req.body;

        const oppositeType = (stockType === "yes") ? "no" : "yes";
        const oppositePrice = (10 - price);

        if(INR_BALANCES[userId].balance < (price*quantity)) {
            return res.status(401).json("No balance");
        }

        if(!ORDERBOOK[stockSymbol][stockType] || !ORDERBOOK[stockSymbol][stockType][price] ) {
            ORDERBOOK[stockSymbol][oppositeType][oppositePrice] = {"total": quantity, "orders": {[userId]: quantity}};
        }

        else {
            if (ORDERBOOK[stockSymbol][stockType][price].total >= quantity){
                ORDERBOOK[stockSymbol][stockType][price].total -= quantity;
                // const arr = Object.keys(ORDERBOOK[stockSymbol][stockType][price].orders);
                // console.log(arr);
                let quantityValue = quantity;
                let thisOrder = (ORDERBOOK[stockSymbol][stockType][price]["orders"]);
                for (let order in thisOrder) {
                    if(thisOrder[order] <= quantityValue) {
                        quantityValue -= thisOrder[order];
                        thisOrder[order] = ""
                    }
                }

            } 
            else {
                const value = ORDERBOOK[stockSymbol][stockType][price].total;
                const finalValue = quantity - value;
                
                ORDERBOOK[stockSymbol][stockType][price].total -= value;
                ORDERBOOK[stockSymbol][oppositeType][oppositePrice] = {"total": finalValue, "orders": {[userId]: finalValue}};
            }
        }

        INR_BALANCES[userId] = INR_BALANCES[userId] || {};
        INR_BALANCES[userId].locked = INR_BALANCES[userId].locked || 0;
        INR_BALANCES[userId].locked += price;
        INR_BALANCES[userId].balance -= INR_BALANCES[userId].locked;
        return res.status(200).json({ORDERBOOK, INR_BALANCES});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "msg": error.message
        });
    }
};

export const mintTokens = async (req, res) => {
    try {
        const {userId, stockSymbol, quantity} = req.body;        

        if(!userId || !stockSymbol || !quantity) {
            return res.status(400).json("Please insert all inputs");
        }
        if(quantity % 2 !== 0 || quantity === 0) {
            return res.status(400).json("Please put quantity in even number")
        }

        if(INR_BALANCES[userId].balance < (quantity*10)) {
            return res.status(400).json("Balance not enough");
        }

        STOCK_BALANCES[userId] = STOCK_BALANCES[userId] ?? {};
        STOCK_BALANCES[userId][stockSymbol] = STOCK_BALANCES[userId][stockSymbol] ?? {};

        let stock = STOCK_BALANCES[userId][stockSymbol];
        stock.yes = stock.yes ?? {quantity: 0, locked: 0};
        stock.no = stock.no ?? {quantity: 0, locked: 0};

        stock.yes["quantity"] += parseInt(quantity/2);
        stock.yes["locked"] += stock.yes["locked"];
        stock.no["quantity"] += parseInt(quantity/2);
        stock.no["locked"] += stock.no["locked"];

        INR_BALANCES[userId].balance -= (quantity * 10);
        INR_BALANCES[userId].locked += (quantity * 10);

        res.status(200).json({STOCK_BALANCES, INR_BALANCES});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}