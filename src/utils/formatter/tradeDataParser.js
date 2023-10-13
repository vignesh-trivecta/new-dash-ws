const tradeDataParser = (response) => {
    let tooltipDatas = [];
    let mainDatas = [];
  
    if ((response?.length !== 0 && response  !== undefined) && response !== 404 && response) {
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
    return { mainDatas, tooltipDatas };
  };
  
  export default tradeDataParser;
  
