var GoogleSpreadsheet = require('google-spreadsheet');
var request = require("request")
var sleep = require('system-sleep');
var doc = new GoogleSpreadsheet('1GgCCW2uH_4HKRdd9JzXIKcnPpcesxWnqnSXmixS9VbY');
var sheet;
var fees = {
    "CAS": 358,
    "NET": 3.96,
    "DRT": 545,
    "LOC": 11.076,
    "MANA": 143,
    "ICOS": .76,
    "SNC": 88,
    "FYN": 1.849,
    "ENG": 14,
    "DENT": 1000,
    "PLR": 15,
    "BAS": 578,
    "AMM": 39,
    "CTX": 780,
    "1ST": 75,
    "TAAS": 3.1,
    "MSP": 121,
    "LEND": 200,
    "PLU": 0.87,
    "AIR": 1294,
    "WRC": 107,
    "AMB": 36,
    "TNT": 180,
    "FUEL": 123,
    "GVT": 0.8,
    "ADX": 13.38,
    "DATA": 166,
    "STAR": 2.144,
    "SAN": 6.5,
    "BNT": 2.57,
    "DDF": 152,
    "SWT": 7.7,
    "ATS": 860,
    "ATM": 1588,
    "PTOY": 91,
    "HVN": 120,
    "EBET": 84,
    "IND": 221,
    "PRO": 13,
    "BQX": 4.7,
    "CCT": 195,
    "IXT": 24,
    "POE": 329,
    "BMC": 20,
    "ZRX": 23,
    "PIX": 225,
    "PAY": 3.1,
    "CTR": 15,
    "OMG": 1.22,
    "MTH": 92,
    "AVT": 8.8,
    "TRX": 270,
    "VERI": 0.087, "LA": 41, "QVT": 26, "CFI": 181, "SUB": 36, "BET": 363, 
		"DICE": 8.5, "NEU": 20.1, "STX": 45, "ZSC": 701, "FUN": 203, "BCPT": 20.15, "CDT": 210, 
		"SNT": 233, "EOS": 1.5, "VEN": 3.6, "R": 6 // do not include SMART
};
var currentdo = [];
var tokendo = [];
var threshold = .4;
//var creds = require('/home/jd4/EthTokenArbTradingNodeGoogleSheets/googlesheet.json');
var cheerio = require('cheerio');

var creds = require('C:\\Users\\owner\\Documents\\EthTokenArbTradingNode-master\\googlesheet.json');
const commandLineArgs = require('command-line-args')
const optionDefinitions = [{
        name: 'start',
        alias: 's',
        type: Number
    },
    {
        name: 'max',
        type: Number,
        alias: 'm'
    }
]
const options = commandLineArgs(optionDefinitions)
////console.log(options['starSt']);
////console.log(options['max']);
function ed(x, error6, response6, data6, tokenAddr, cells, currentValue) {

    try {
        if (!error6 && response6.statusCode === 200) {
            //////////console.log(data6);
            var buyDone = false;
            var sellDone = false;
            var buyTotal = 0;
            var sellTotal = 0;
            while (buyDone == false) {  try{
                for (var buys in data6['buys']) {
                    if (buys == data6['buys'].length) {
                        buyDone = true;
                        break;
                        buyPrice = 0;

                        //console.log('ed buy' + buyPrice);
                    }
                    buyTotal = buyTotal + parseFloat(data6['buys'][buys]['ethAvailableVolumeBase']);
                    if (buyTotal >= threshold) {
                        buyDone = true;
                        buyPrice = data6['buys'][buys]['price'];
                        //////console.log(buyPrice);
                        //console.log('ed buy' + buyPrice);
                        //bps['ed'] = buyPrice;
                        break;
                    }
                } }catch(err){}
            } 
            while (sellDone == false) { try{
                for (var sells in data6['sells']) {
                    if (sells == data6['sells'].length) {
                        sellDone = true;
                        break;
                        sellPrice = 1000000;

                        //console.log('ed sell' + sellPrice);
                    }

                    sellTotal = sellTotal + parseFloat(data6['sells'][sells]['ethAvailableVolumeBase']);
                    if (sellTotal >= threshold) {
                        sellDone = true;
                        sellPrice = data6['sells'][sells]['price'];
                        //console.log('ed sell' + sellPrice);
                        //////console.log(sellPrice);


                        //sps['ed'] = sellPrice;
                        break;
                    }
                }}catch(err){}
            } try{
            if (buyDone == false || sellDone == false) {
                var url6 = 'https://api.etherdelta.com/orders/' + tokenAddr + '/0'; //sleep(1060);
                //console.log(url6);
                setTimeout(function() {
                    request.get(url6, {
                        json: true,
                        timeout: 33000
                    }, function(error, response, data) {
                        ed(x, error, response, data, tokenAddr, cells, currentValue);
			
                    });
                }, Math.random() * (9000 - 1000) + 1000);
                //sleep(Math.random() * (43000 - 25000) + 25000);
            } else {
				if (sellPrice > 0.0000001){
                cells[1].value = sellPrice.toString();
                cells[3].value = sellTotal.toString();
				}
				else {
                cells[1].value = "too small";
                cells[3].value = sellTotal.toString();
					
				}
                cells[1].save();
                cells[3].save();
				if (buyPrice > 0.0000001){
                cells[2].value = buyPrice.toString();
                cells[4].value = buyTotal.toString();
				}
				else {
					cells[2].value = "too small";
					cells[4].value = buyTotal.toString();
				}
                cells[2].save();
                cells[4].save();
				if (cells[1].value > cells[15].value){
				if (isNaN(1 + ((sellTotal * sellPrice) / 1))){//fees[currentValue]))){
			var nan = -99999;
		}
		else {
			var nan = (1 + ((sellTotal * sellPrice) / 1)); //fees[currentValue]));
			//console.log('nan nan '+ nan);
		}}else{
			var nan = (1 + ((sellTotal * sellPrice) / 1)); //fees[currentValue]));
			//console.log('ED nan nan '+ nan);
		}
		//console.log('celly celly x = ' + x);
        cells[19].value = "=if(R" + (x) + "=0 ,-100, -1*(1-(S" + (x).toString() + "/R" + (x).toString() + ")/" + 1  + "))";//nan + "))";
        cells[19].save();
		setTimeout(function(){
			if (cells[20].value.startsWith('https://etherdelta.com')) {
			console.log('ed startswith!!!!');
			sleep(3000);
		doc.addRow(2,{"currentValue": currentValue, "percent": cells[19].value, "bidex": cells[21].value.substring(8,18)},function(){sleep(5 * 60 * 1000);});
			console.log('ed lala!!!');
		}
		console.log('past ed check');
		}, 9000);
		sleep(10000);
                x = x + 1;
                if (x == (options['max'])) {
                    //x = options['start'];
                console.log('exiting....');
						process.exit();
				}
                setTimeout(function() {
                        //console.log(count11);
						
                        oulala123(x, sheet);
                    }, 5000);
					
		}}catch(err){console.log(err);}
        } else { try {
            var url6 = 'https://api.etherdelta.com/orders/' + tokenAddr + '/0'; //sleep(1060);
            //console.log(url6);
            setTimeout(function() {
                request.get(url6, {
                    json: true,
                    timeout: 43000
                }, function(error, response, data) {
                    ed(x, error, response, data, tokenAddr, cells, currentValue);
                });
            }, Math.random() * (9000 - 1000) + 1000);
        }catch(err){} }
		
    } catch (err) {
        //console.log(err);
    }
}

function rest(x, tokenAddr, cells, currentValue) {

    if (options['max'] == 2) {
        for (var abc = 1; abc < 16; abc++) {
            if (cells[abc]) {
                cells[abc].value = " ";
            }
        }
    } else {
        for (var abc = 1; abc < 16; abc++) {
            if (cells[abc]) {
                cells[abc].value = " ";
            }
        }
    }
    for (var abc = 29; abc < 40; abc++) {
        if (cells[abc]) {
            cells[abc].value = " ";
        }
    }
    var url2 = "https://bittrex.com/api/v1.1/public/getorderbook?market=ETH-" + currentValue + "&type=both";
    //console.log(url2);
    //sleep(1060)
    request.get(url2, {
        json: true,
        timeout: 13000
    }, function(error, response, data5) {
        //////////console.log(data5);
        var buyDone = false;
        var sellDone = false;
        var buyTotal = 0;
        var sellTotal = 0;
        //////console.log(buyTotal);
        //////console.log(sellTotal);
        try {
            while (buyDone == false) {
                for (var buys in data5['result']['buy']) {
                    buyTotal = buyTotal + (data5['result']['buy'][buys]['Quantity'] * data5['result']['buy'][buys]['Rate']);
                    if (buys == data5['result']['buy'].length) {
                        buyDone = true;
                        break;
                        buyPrice = 0;

                    }
                    //////console.log(buyTotal);
                    if (buyTotal >= threshold) {
                        buyDone = true;
                        buyPrice = data5['result']['buy'][buys]['Rate'];
                        //////console.log(buyPrice);

                        cells[6].value = buyPrice.toString();
                        cells[8].value = buyTotal.toString();
                        cells[6].save();
                        cells[8].save();

                        //bps['bit'] = buyPrice;
                        break;
                    }
                }
            }
            while (sellDone == false) {
                for (var sells in data5['result']['sell']) {
                    if (sells == data5['result']['sell'].length) {
                        sellDone = true;
                        break;
                        sellPrice = 1000000;

                    }
                    sellTotal = sellTotal + (data5['result']['sell'][sells]['Quantity'] * data5['result']['sell'][sells]['Rate']);

                    //////console.log(sellTotal);
                    if (sellTotal >= threshold) {
                        sellDone = true;
                        sellPrice = data5['result']['sell'][sells]['Rate'];
                        //////console.log(sellPrice);

                        cells[5].value = sellPrice.toString();
                        cells[7].value = sellTotal.toString();

                        cells[7].save();
                        cells[5].save();

                        //sps['bid'] = sellPrice;
                        break;
                    }
                }
            }
        } catch (err) {
            if (err instanceof TypeError) {} else {
                //console.log(err);
            }
            // //console.log(err);
        }

        var url3 = 'https://www.binance.com/api/v1/depth?symbol=' + currentValue + "ETH";
        //console.log(url3);
        //sleep(1060)
        request.get(url3, {
            json: true,
            timeout: 13000
        }, function(error, response, data3) {
            ////////console.log(data3);
            var buyDone = false;
            var sellDone = false;

            try {
                if (data3['bids'].length == 0 || data3['asks'].length == 0) {

                    buyDone = true;
                    sellDone = true;
                }
                if (data3.code == -1121) {
                    buyDone = true;
                    sellDone = true;
                }
                var buyTotal = 0;
                var sellTotal = 0;
                //////console.log(buyTotal);
                //////console.log(sellTotal);
                while (buyDone == false) {
                    for (var buys in data3['bids']) {
                        buyTotal = buyTotal + (data3['bids'][buys][1] * data3['bids'][buys][0]);
                        if (buys == data3['bids'].length) {
                            buyDone = true;
                            break;
                            buyPrice = 0;

                        }
                        //////console.log(buyTotal);
                        if (buyTotal >= threshold) {
                            buyDone = true;
                            buyPrice = data3['bids'][buys][0];
                            //////console.log(buyPrice);

                            cells[10].value = buyPrice.toString();
                            cells[12].value = buyTotal.toString();
                            cells[10].save();
                            cells[12].save();
                            //bps['bin'] = buyPrice;
                            break;
                        }
                    }
                }
                while (sellDone == false) {
                    for (var sells in data3['asks']) {
                        if (sells == data3['asks'].length) {
                            sellDone = true;
                            break;
                            sellPrice = 1000000;

                        }
                        sellTotal = sellTotal + (data3['asks'][sells][1] * data3['asks'][sells][0]);

                        //////console.log(sellTotal);
                        if (sellTotal >= threshold) {
                            sellDone = true;
                            sellPrice = data3['asks'][sells][0];
                            //////console.log(sellPrice);

                            cells[9].value = sellPrice.toString();
                            cells[11].value = sellTotal.toString();
                            cells[9].save();
                            cells[11].save();

                            //sps['bin'] = sellPrice;
                            break;
                        }
                    }
                }
            } catch (err) {
                if (err instanceof TypeError) {} else {
                    //console.log(err);
                }

                //  //console.log(err)
            }
            var url9 = "https://api.liqui.io/api/3/depth/" + currentValue.toLowerCase() + "_eth";
            //console.log(url9);
            sleep(1);
            request.get(url9, {
                json: true,
                timeout: 13000
            }, function(error, response, data9) {
                //////////console.log(data5);
                var buyDone = false;
                var sellDone = false;
                var buyTotal = 0;
                var sellTotal = 0;
                //////console.log(data9);
                try {
                    if (data9.success == 0) {

                        buyDone = true;
                        sellDone = true;
                    }
                } catch (err) {
                    //console.log(err);
                }
                try {
                    //////console.log(buyTotal);
                    //////console.log(sellTotal);
                    while (buyDone == false) {
                        for (var buys in data9[currentValue.toLowerCase() + '_eth']['bids']) {
                            buyTotal = buyTotal + (data9[currentValue.toLowerCase() + '_eth']['bids'][buys][0] * data9[currentValue.toLowerCase() + '_eth']['bids'][buys][1]);
                            if (buys == data9[currentValue.toLowerCase() + '_eth']['bids'].length) {
                                buyDone = true;
                                break;
                                buyPrice = 0;

                            }
                            //////console.log(buyTotal);
                            if (buyTotal >= threshold) {
                                buyDone = true;
                                buyPrice = data9[currentValue.toLowerCase() + '_eth']['bids'][buys][0];
                                //////console.log(buyPrice);

                                cells[29].value = buyPrice.toString();
                                cells[31].value = buyTotal.toString();
                                cells[29].save();
                                cells[31].save();
                                //bps['liq'] = buyPrice;
                                break;
                            }
                        }
                    }
                    while (sellDone == false) {
                        for (var sells in data9[currentValue.toLowerCase() + '_eth']['asks']) {
                            if (sells == data9[currentValue.toLowerCase() + '_eth']['asks'].length) {
                                sellDone = true;
                                break;
                                sellPrice = 1000000;

                            }
                            sellTotal = sellTotal + (data9[currentValue.toLowerCase() + '_eth']['asks'][sells][0] * data9[currentValue.toLowerCase() + '_eth']['asks'][sells][1]);

                            //////console.log(sellTotal);
                            if (sellTotal >= threshold) {
                                sellDone = true;
                                sellPrice = (parseFloat(data9[currentValue.toLowerCase() + '_eth']['asks'][sells][0]) + 0.015);
                                //////console.log(sellPrice);

                                cells[28].value = sellPrice.toString();
                                cells[30].value = sellTotal.toString();

                                cells[30].save();
                                cells[28].save();

                                //sps['liq'] = sellPrice;
                                break;
                            }
                        }
                    }
                    var url6 = 'https://api.etherdelta.com/orders/' + tokenAddr + '/0'; //sleep(1060);
                    //console.log(url6);
                    request.get(url6, {
                        json: true,
                        timeout: 43000
                    }, function(error6, response6, data6) {
                        sleep(Math.random() * (9000 - 1000) + 1000)
                        ed(x, error6, response6, data6, tokenAddr, cells, currentValue);
						

                    });
                } catch (err) {
                    if (err instanceof TypeError) {} else {
                        //console.log(err);
                    }
                    //     //console.log(err);
                }

            }); //5th

        }); //4th
    }); // 3rd

}

function oulala123(x, sheet) {
    var y = 0;
	sleep(Math.random() * (28000 - 1000) + 1000);
    //console.log('lala' + x);
    //console.log(currentdo[x - 2]);
    sleep(50);
    sheet.getCells({
        'min-row': x,
        'max-row': x,
        'return-empty': true
    }, function(err, cells) {
        threshold = parseFloat(cells[58].value);
        //console.log(threshold);

        //console.log(currentdo[x - 2]);
        try {
            ////console.log(x);
            sleep(2);
            var currentValue = currentdo[x - 2];
            /*if (currentValue != "8BT" && 
            	currentValue != "AMB" && 
            	currentValue != "B2X" && 
            	currentValue != "BOS" && 
            	currentValue != "CAT" && 
            	currentValue != "CL" && 
            	currentValue != "CRS" && 
            	currentValue != "GRAPH" && 
            	currentValue != "HRB" && 
            	currentValue != "ICX" && 
            	currentValue != "IGNIS" && 
            	currentValue != "IML" && 
            	currentValue != "MPK" && 
            	currentValue != "MRV" && 
            	currentValue != "PBKX" && 
            	currentValue != "PQT" && 
            	currentValue != "RLC" && 
            	currentValue != "ROOTS" && 
            	currentValue != "SBD" && 
            	currentValue != "STAR" && 
            	currentValue != "Steem" && 
            	currentValue != "TFL" && 
            	currentValue != "TGT" && 
            	currentValue != "WEALTH" && 
            	currentValue != "WTT" && 
            	currentValue != "XLC" && 
            	currentValue != "XTZ"){ */

            var goforit = true;
            var url = 'https://hitbtc.com/system-health';
            //console.log(url);
            request(url, function(error, response, html) {
                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                    var $ = cheerio.load(html);
                    $('tr').each((i, elm) => {

                        var val = $(elm).children().eq(0).text().replace(/\s/g, '');
                        var withdrawal = $(elm).children().eq(6).first().text().replace(/\s/g, '');
                         var hourdays = $(elm).children().eq(10).first().text().replace(/\s/g, '');
                         var deposit = $(elm).children().eq(1).first().text().replace(/\s/g, '');
                        if (val == currentValue && ((withdrawal || deposit) == "Offline")) {
                            //console.log(val);
                            goforit = false;
                        }
					if (val == currentValue ){// && (hourdays.indexOf('days') > -1 )){// || hourdays.indexOf('hours') > -1 )) {
							//goforit = false;
							//console.log('hourdays\n\n\n');
}

                    });
                } else {
                    //console.log(error);
                }

                if (goforit == true && currentValue != "STU"  && currentValue != "SMART"&& currentValue != "STV") {

                    ////console.log(Object.keys(data)[y + options['start']]);

                    console.log(currentValue);

                    //currentValue = "CAT";
                    //currentValue = "OMG";
                    ////console.log(currentValue);
                    //if (options['max'] == 2){
                    //currentValue = cells[0].value;


                    //}
                    // else {

                    cells[0].value = currentdo[x - 2];
                    cells[0].save();
                    //}

                    //currentValue = "MCO";
                    var doit = true;
                    if (currentValue != "CAT" && doit == true) {

                        //console.log(currentValue);
                        try {
                            var tokenAddr = tokendo[x - 2];
                            // sleep(1000);
                            //sleep(1000);
                            var url4 = 'https://api.hitbtc.com/api/1/public/' + currentValue + 'ETH/orderbook';
                            //console.log(url4);
                            //sleep(1060)
                            request.get(url4, {
                                json: true,
                                timeout: 13000
                            }, function(error, response, data4) {
                                ////console.log(data4);
                                var buyDone = false;
                                var sellDone = false;
                                try {
                                    if (data4['bids'].length == 0 || data4['asks'].length == 0) {

                                        buyDone = true;
                                        sellDone = true;
                                    }
                                    if (data4.code == -1121) {
                                        buyDone = true;
                                        sellDone = true;
                                    }
                                    var buyTotal = 0;
                                    var sellTotal = 0;
                                    //////console.log(buyTotal);
                                    //////console.log(sellTotal);

                                    while (buyDone == false) {
                                        for (var buys in data4['bids']) {
                                            buyTotal = buyTotal + (data4['bids'][buys][1] * data4['bids'][buys][0]);
                                            if (buys == data4['bids'].length) {
                                                buyDone = true;
                                                break;
                                                buyPrice = 0;

                                            }
                                            //////console.log(buyTotal);
                                            if (buyTotal >= threshold) {
                                                buyDone = true;
                                                buyPrice = data4['bids'][buys][0];
                                                //////console.log(buyPrice);

                                                cells[14].value = buyPrice.toString();
                                                cells[16].value = buyTotal.toString();
                                                cells[14].save();
                                                cells[16].save();

                                                //bps['hit'] = buyPrice;
                                                break;
                                            }
                                        }
                                    }
                                    while (sellDone == false) {
                                        for (var sells in data4['asks']) {
                                            if (sells == data4['asks'].length) {
                                                sellDone = true;
                                                break;
                                                sellPrice = 1000000;

                                            }
                                            sellTotal = sellTotal + (data4['asks'][sells][1] * data4['asks'][sells][0]);

                                            //////console.log(sellTotal);
                                            if (sellTotal >= threshold) {
                                                sellDone = true;
                                                sellPrice = data4['asks'][sells][0];
                                                ////console.log(sellPrice);
                                                cells[13].value = sellPrice.toString();
                                                cells[15].value = sellTotal.toString();
                                                cells[13].save();
                                                cells[15].save();
                                                //sps['hit'] = sellPrice;
                                                break;
                                            }
                                        }
                                    }
                                } catch (err) {
                                    if (err instanceof TypeError) {} else {
                                        //console.log(err);
                                    }

                                    ////console.log(err)
                                }
                                rest(x, tokenAddr, cells, currentValue); 
/* var url6 = 'https://api.etherdelta.com/orders/' + tokenAddr + '/0'; //sleep(1060);
            //console.log(url6);
                request.get(url6, {
                    json: true,
                    timeout: 43000
                }, function(error, response, data) {
                    ed(x, error, response, data, tokenAddr, cells, currentValue);

                }); */



                                //  cells[23].value = data['ETH_' + currentValue]['baseVolume'];
                                //	cells[23].save();


                            });
                        } catch (err) {
                            //console.log(err);
                        }

                    } else {
                        running = false;
                        x = x + 1;
                        if (x >= options['max']) {
                            //console.log('rerun');
							x = options['start'];
							console.log('exiting...');
							process.exit();
                           /* setTimeout(function() {
                        //console.log(count11);
                        oulala123(x, sheet);
                    }, 5000); */
					
                        }
                    }
                } else {
                        x = x + 1;
                        if (x <= options['max']) {
                            setTimeout(function() {
                        //console.log(count11);
                        oulala123(x, sheet);
                    }, 5000);
					
                        }
                }
            });
            if (goforit == true) {}
        } catch (err) {
            //console.log(err);
        }
        y++;
    });
}


function oulala() {
    // spreadsheet key is the long id in the sheets URL 
    doc.useServiceAccountAuth(creds, function lala() {
        doc.getInfo(function(err, info) {
            //////console.log('Loaded doc: '+info.title+' by '+info.author.email);
            sheet = info.worksheets[0];
            //console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);



            // 1st request
            sheet.getCells({
                'min-row': options['start'],
                'max-row': options['max'],
                'return-empty': true
            }, function(err, cells) {
                if (cells) {
                    //console.log(err);
                    sheet.bulkUpdateCells(cells, function(result) {
                        if (err) {
                            //console.log(err);
                        }

                    });
                }
                var lineReader = require('readline').createInterface({
                    input: require('fs').createReadStream('decimals.csv')
                });
                var lc = 0;
                var currents = [];
                var tokens = [];
                lineReader.on('line', function(line) {
                    var arr = line.split(",");
                    currents[lc] = arr[0];
                    tokens[lc] = arr[1];
                    lc++;
                });
                setTimeout(function() {
                    var x = 0;
                    var count11 = 0;
                    ////console.log(currents[currentValue]);
                    var lalaurl = "https://api.hitbtc.com/api/1/public/symbols";
                    request.get(lalaurl, {
                        json: true,
                        timeout: 13000
                    }, function(error, response, lala) {
                        for (var currentValue in currents) {
                            var doit = false;
                            ////console.log(lala['symbols']);
                            for (symbol in lala['symbols']) {
                                ////console.log(lala['symbols'][symbol]['symbol']);
                                if (currents[currentValue] + "ETH" == lala['symbols'][symbol]['symbol']) {
                                    //console.log(lala['symbols'][symbol]['symbol']);
                                    console.log(currents[currentValue] + "ETH");
                                    doit = true;
                                    currentdo[count11] = currents[currentValue];
                                    tokendo[count11] = tokens[x];
                                    count11++;
                                    console.log(count11);
                                }
                            }
                            x++;
                        }
                    });
                    setTimeout(function() {
                        //console.log(count11);
                        oulala123(options['start'], sheet);
                    }, 5000);
					
                }, 3000);
            });
        });
    });
}

oulala();
