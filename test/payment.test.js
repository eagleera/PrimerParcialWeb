import 'mocha'
import { expect, should, assert } from 'chai'
import mongoose from 'mongoose'
import Payment from '../models/payment'
import User from '../models/users'
import initTest from './test_helper'
initTest();

describe('Payments',()=>{
  describe('create',()=>{
    it('Should create a payment',()=>{
      const payment = new Payment({user:mongoose.Types.ObjectId(), amount:123.123, description:'Pago de casona', status:false})
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
        const payment = new Payment({user:user_id, amount:123.123, description:'Pago de casona', status:false})
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
      const payment = new Payment(hola)
      payment.save((err, payment)=>{
        if(err){
          console.log('entro')
          return assert.isNotOk(false,'Tiene que fallar')
        }else{
          console.log('lo guardo')
          return assert.ok(payment)
        }
      })
    })
  })
  describe('readme',()=>{
    it('Return all payments user is admin',()=>{
      let payments = Payment.find({},(err, payments)=>{
        return assert.ok(payments)
      })
    })
    it('Return your payments',()=>{
      let payments = Payment.find({user:mongoose.Type.ObjectId()},(payments)=>{
        return assert.ok(payments)
      })
    })
  })
  describe('update',()=>{
    it('You Cannot',()=>{
      console.log('Not posible');
    })
  })
  describe('delete',()=>{
    it('Only an admin',()=>{
      const user_id = function get_user(){
        return mongoose.Types.ObjectId()
      }
      Payment.findByIdAndRemove(user_id)
    })
    it('Cannot delete if payment status is not done',()=>{
      Payment.findById(id, (err, payment)=>{
        if (payment.status == false){
          return assert.isNotOk(false,'Has to fail')
        }
      })
    })
    it('delete when status is done',()=>{
      Payment.findById(id, (err, payment)=>{
        if (payment.status == true){
          Payment.findByIdAndRemove(id)
          return assert.ok(payment)
        }
      })
    })
  })
})
