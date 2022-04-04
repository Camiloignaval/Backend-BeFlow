const estructuraReturnGet=(array) => {
    // generacion de estructura solicitada
    const arrayResponder=array.map(({id,object, description,billed_hours,billed_at,billing_currency,billed_amount,
        need_exchange, exchange_currency,original_amount,currency,exchange_rate,created_at,updated_at})=>(
         {
          id,object,description,billed_hours,billed_at,amount:billed_amount,currency,
          exchange:{
            original_amount,currency,exchange_rate
          }, created_at,updated_at
         }))
        return arrayResponder
}

module.exports={
    estructuraReturnGet
}