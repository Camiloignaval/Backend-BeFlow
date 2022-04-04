/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
const axios = require('axios');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const { insertPago, selectAll, selectOne, deleteId } = require("../database/querys");
const { estructuraReturnGet } = require('../helpers/estructuraReturnGet');

const insertPay = async (req, res) => {
  const datos=req.body
  console.log(datos)
 const fechaFormateada=dayjs(datos?.billed_at).format('DD-MM-YYYY')
  try {
    datos.object='payment'
    datos.id=`pmt_${uuidv4()}`
    if(datos?.need_exchange){

      // console.log(`https://mindicador.cl/api/uf/${dayjs(datos?.billed_at).format('DD-MM-YYYY')}`)
      const { data }=await axios(`https://mindicador.cl/api/uf/${fechaFormateada}`)
      const valorCambio=(data?.serie[0]?.valor)
      datos.exchange_rate=valorCambio
      datos.currency='clf'
      const valorConvertidoPesos=(Number(valorCambio)*Number(datos.billed_amount)).toFixed(2)
      datos.original_amount=valorConvertidoPesos
      datos.created_at=dayjs().format()
      // llamada a base de datos
      const response = await insertPago(Object.values(datos))
      res.status(201).json({
        msg: 'Payment created',
      })
      
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).send('Bad request')
  }
}

const notFound=(req,res) => {
  res.status(404).send('Not Found')
}

const getAll= async(req,res) => {
  const pagina=req?.query?.page
  const arrayLimitOffset=[100,100*(pagina-1)]
  try {
    const response=await selectAll(arrayLimitOffset)
    if(response.length>0){
      // generacion de estructura solicitada
     const arrayResponder=estructuraReturnGet(response)
      res.status(200).send(arrayResponder)
    }else{
      throw new Error('No existen registros')
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).send('Not Found')
  }
}
const getOne=async (req,res) => {
  try {
    const response= await selectOne(Object.values(req.params))
    if(response.length>0){
      const arrayDevolver=estructuraReturnGet(response)
      return res.status(200).send(arrayDevolver[0])
    }else{
      throw new Error('No existe id solicitado')
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).send('Not Found')
  }
}

const deleteOne=async (req,res) => {
  try {
    const response= await deleteId(Object.values(req.params))
    if(response.length>0){
      res.status(200).json({
        message:'payment sucessfully deleted'
      })
    }else{
      throw new Error('Id no ha sido encontrado')
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).send('Bad request')
  }
}
const updateOne= async () => {
  
}
module.exports = {
  insertPay,
  notFound,
  getAll,
  getOne,
  deleteOne,
  updateOne
}
