const tradeDataParser = (response) => {
    let tooltipDatas = [];
    let mainDatas = [];
  
    if (response?.length !== 0) {
      for (let data of response) {
        tooltipDatas.push({
          exchangeOrderId: data.exchangeOrderId,
          exchangeTradeId: data.exchangeTradeId,
        });
        mainDatas.push({
          remoteOrderId: data.remoteOrderId,
          exchange: data.exchange,
          buyorsell: data.buyorsell,
          exchangeTradeTime: data.exchangeTradeTime,
          scripName: data.scripName,
          quantity: data.quantity,
          rate: data.rate,
        });
      }
    }
    console.log(mainDatas, tooltipDatas);
    return { mainDatas, tooltipDatas };
  };
  
  export default tradeDataParser;
  