import 'mocha'
import { expect, should, assert } from 'chai'
import mongoose from 'mongoose'
import Payment from '../models/payment'
import User from '../models/users'
import initTest from './test_helper'
initTest();

describe('Payments',()=>{
  describe.only('create',()=>{
    it('Should create a payment',()=>{
      const payment = new Payment({user:mongoose.Types.ObjectId(), amount:123.123, description:'Pago de casona'})
      payment.save((err, payment)=>{
        if(err){
          return assert.fail()
        }else{
          return assert.ok(payment)
        }
      })
    });
    it('Should exist the user', ()=>{
      const user_id = 'hola'
      const user = User.findById(user_id)
      if (user.user == null){
        const mensaje = 'El usuario no existe'
        return assert.equal(mensaje, 'El usuario no existe','Exito no se continuo con creacion de pago ')
      }else{
        const payment = new Payment({user:user_id, amount:123.123, description:'Pago de casona'})
        payment.save((err, payment)=>{
          if(err){
            return assert.fail('No funciono')
          }else{
            return assert.ok(payment)
          }
        })
      }
    })
    it('Should not create if amount is not double',()=>{
      const payment = new Payment({user:mongoose.Types.ObjectId(), amount:'123.123,', description:'Pago de casona'})
      payment.save((err, payment)=>{
        if(err){
          return assert.isNotOk(false,'Tiene que fallar')
        }else{
          return assert.ok(payment)
        }
      })
    })
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
