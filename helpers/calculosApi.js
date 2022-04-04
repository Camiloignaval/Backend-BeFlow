const { default: axios } = require("axios")
const dayjs = require("dayjs")

const calculosApi=async (datos) => {
    const needEx=datos?.needs_exchange
    console.log(needEx)
    const { data }=await axios(`https://mindicador.cl/api/uf/${dayjs(datos?.billed_at).format('DD-MM-YYYY')}`)
    const valorCambio=(data?.serie[0]?.valor)
    datos.exchange_rate=needEx?valorCambio:null
    datos.currency=needEx?'clf':null
    const valorConvertidoPesos=(Number(valorCambio)*Number(datos?.billed_amount)).toFixed(2)
    datos.original_amount=needEx?valorConvertidoPesos:null
    datos.created_at=dayjs().format()

    return datos
}

module.exports={
    calculosApi
}