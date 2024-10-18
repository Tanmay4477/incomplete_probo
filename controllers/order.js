import { ORDERBOOK} from "../variables.js"

export const orderbook = async (req, res) => {
    try {
        return res.status(200).json(ORDERBOOK);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}




export const viewBook = async (req, res) => {
    try {
        const stockSymbol = req.params.stockSymbol;
        if(!stockSymbol) {
            return res.status(500).json("Please input Stock Symbol");
        }
        if(!(stockSymbol in ORDERBOOK)) {
            return res.status(501).json("Stock Symbol does not exist yet");
        }
        return res.status(200).json(ORDERBOOK[stockSymbol]);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

export const createSymbol = async (req, res) => {
    try {
        let symbol = req.params.stockSymbol;
        if(!symbol) {
            return res.status(400).json("Please input symbol first");
        }
        ORDERBOOK[symbol] = {yes: {}, no: {}};
        return res.status(200).json(ORDERBOOK);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}