export let INR_BALANCES = {
    "user1": {
        balance: 1000,
        locked: 0
    },
    "user2": {
        balance: 20,
        locked: 0
    },
    "user3": {
        balance: 25,
        locked: 0
    },
    "user4": {
        balance: 50,
        locked: 0
    }
}



export let ORDERBOOK = {
    "BTC_USDT_10_OCT_2024_9_30": {
        "yes": {
            "9.5": {
                "total": 12,
                "orders": {
                    "user1": 2,
                    "user2": 1,
                    "user3": 5,
                    "user4": 4
                }
            },
            "8.5": {
                "total": 5,
                "orders": {
                    "user1": 3,
                    "user2": 2
                }
            }
        },
        "no": {

        }
    },
    "BTC_USDT_10_OCT_2024_8_30": {
        "yes": {
            "8.5": {
                "total": 10,
                "orders": {
                    "user1": 5,
                    "user2": 1
                }
            }
        }
    }
}



export let STOCK_BALANCES = {
	"user1": {
	   "BTC_USDT_10_OCT_2024_9_30": {
		   "yes": {
			   "quantity": 5,
			   "locked": 0
		   },
           "no": {
                "quantity": 0,
                "locked": 0
           }
	   }
	},
	"user2": {
		"BTC_USDT_10_OCT_2024_9_30": {
		   "no": {
			   "quantity": 3,
			   "locked": 4
		   }
	   }
	},
    "user4": {
		"BTC_USDT_10_OCT_2024_9_30": {
		   "yes": {
			   "quantity": 3,
			   "locked": 0
		   },
           "no": {
            "quantity": 1,
            "locked": 0
           }
	   }
	},
}

