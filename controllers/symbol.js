import {STOCK_BALANCES} from "../variables.js"


export const stockBalance = async (req, res) => {
    try {
        return res.status(200).json(STOCK_BALANCES);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}

export const balanceOfUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if(!userId) {
            return res.status(400).json("Please input userId first");
        }
        let output = userId in STOCK_BALANCES;
        if(!!output) {
            return res.status(200).json(STOCK_BALANCES[userId]);
        } else return res.status(400).json({msg: "User Id Not valid"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}
