/* eslint-disable eqeqeq */
require('express/lib/response')
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DDBBUSER,
  host: process.env.HOST,
  password: process.env.DDBBPASS,
  database: process.env.DDBBNAME,
  port: process.env.DDBBPORT
})


const insertPago = async (data) => {
  const query=`INSERT INTO payment
  (id, "object", description, billed_hours, billed_at, billing_currency, billed_amount, need_exchange, exchange_currency, original_amount, currency, exchange_rate,created_at)
  VALUES($9, $8, $1, $2, $3, $4, $5, $6, $7,$12, $11, $10,$13);
  
  `
  try {
    const res=await pool.query(query,data)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
}

const selectAll=async (data) => {
  const query=`select * from payment p
  LIMIT $1
  OFFSET $2;`
  try {
    const res=await pool.query(query,data)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
}

const selectOne=async (id) => {
  const query=`select * from payment p where p.id =$1`
  
  try {
    const res=await pool.query(query,id)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
}

const deleteId=async (id) => {
  const query=`DELETE FROM payment p
  WHERE p.id=$1 returning *;
  `
  try {
    const res=await pool.query(query,id)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
}

const updatePayment= async (datos) => {
  const query=`UPDATE payment
  SET description=$2, billed_hours=$3, billed_at=$4, billing_currency=$5, billed_amount=$6, need_exchange=$7, exchange_currency=$8, original_amount=$11, currency=$10, exchange_rate=$9, updated_at=$12 where id=$1 returning *;
  `
  try {
    const res=await pool.query(query,datos)
    return res.rows
  } catch (error) {
    console.log(error.message)
    throw new Error ('Ha ocurrido un error')
  }
  
}
module.exports = {
  insertPago,
  selectAll,
  selectOne,
  deleteId,
  updatePayment
}
