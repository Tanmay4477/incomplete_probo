import { INR_BALANCES } from "../variables.js";

export const createUser = async (req, res) => {
    try {
        const id = req.params.userId;
        if(!id) {
            return res.status(404).json("Please input id");
        }
        INR_BALANCES[id] = {
            balance: 0,
            locked: 0
        };
        return res.status(200).json(INR_BALANCES);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "Catch error found"        
        })
    }
}


export const inrBalances = async (req, res) => {
    try {
        return res.status(200).json(INR_BALANCES);
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
            return res.status(404).json("Please input userId first");
        }
        let output = userId in INR_BALANCES;
        if(!!output) {
            return res.status(200).json(INR_BALANCES[userId]);
       }
       else return res.status(400).json("User not exist");

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}


export const onrampInr = async (req, res) => {
    try {
        const {userId, amount} = req.body;
        if(!INR_BALANCES[userId]) {
            return res.status(401).json("User not found");
        }
        if(!INR_BALANCES[userId].balance) {
            INR_BALANCES[userId] = {balance: 0, locked: 0};
        }
        
        INR_BALANCES[userId].balance += amount/100;
        return res.status(200).json(INR_BALANCES[userId]);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error.message
        })
    }
}
