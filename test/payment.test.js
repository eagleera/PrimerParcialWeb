import 'mocha'
import { expect, should, assert } from 'chai'
import mongoose from 'mongoose'
import Payment from '../models/payment'
import initTest from './test_helper'
initTest();

describe('Payments',()=>{
  describe('create',()=>{
    it.only('Should create a payment',()=>{
      const payment = new Payment({user:mongoose.Types.ObjectId(), amount:123.123, description:'Pago de casona'})
      payment.save((err, payment)=>{
        if(err){
          return assert.fail('no se guardo')
        }
        return assert.ok(payment)
      })
    });
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
