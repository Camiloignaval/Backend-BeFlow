/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
const axios = require('axios');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const { insertPago, selectAll, selectOne, deleteId, updatePayment } = require("../database/querys");
const { calculosApi } = require('../helpers/calculosApi');
const { estructuraReturnGet } = require('../helpers/estructuraReturnGet');

const insertPay = async (req, res) => {
  const datos=req.body
  try {
    datos.object='payment'
    datos.id=`pmt_${uuidv4()}`
    if(datos?.need_exchange){
      const datosADevolver=await calculosApi(datos)
      console.log(datosADevolver)
      // llamada a base de datos
      await insertPago(Object.values(datosADevolver))
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
const updateOne= async (req,res) => {
  // tomare por suposicion, que el id de parametros y body es el mismo, tomare el del objeto del body
  // console.log(req.params)
  const d=req.body
  try {
    // comprobando estructura objeto
    if(d?.id && d?.description && d?.billed_hours && d?.billed_at && d?.billing_currency &&
      d?.billed_amount && d?.needs_exchange && d?.exchange_currency){
        const datosADevolver=await calculosApi(d)
        const response=await updatePayment(Object.values(datosADevolver))
        // si id enviado existe
        if(response.length>0){
          res.status(200).json({
            message:'payment sucessfully updated'
          })
        }else{
          throw new Error('No existe el id enviado')
        }
      }else{
        throw new Error('Estructura objeto no es la correcta')
      }
  } catch (error) {
    console.log(error.message)
    res.status(400).send('Bad request')

  }
}
module.exports = {
  insertPay,
  notFound,
  getAll,
  getOne,
  deleteOne,
  updateOne
}
