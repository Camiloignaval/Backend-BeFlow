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
module.exports = {
  insertPago,
  selectAll
}
