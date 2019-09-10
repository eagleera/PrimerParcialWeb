import 'mocha'
import { expect, should } from 'chai'
import mongoose from 'mongoose'
import Payment from '../models/payment'


describe('Payments',()=>{
  describe('create',()=>{
    it('Should create a payment',()=>{
      const payment = new Payment({'user':'123123','amount':'123.123','description':'Pago de casona'})
      payment.save(done)
      console.log('pagado')
    })
    it('')
    it('')
  })
  describe('delete',()=>{
    it('')
    it('')
    it('')
  })
  describe('update',()=>{
    it('')
    it('')
    it('')
  })
})
