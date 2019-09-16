import 'mocha'
import { expect, should, assert } from 'chai'
import mongoose from 'mongoose'
import Payment from '../models/paymentModel'
import User from '../models/UserModel'
import initTest from './test_helper'
import payment_controller from '../controller/paymentController'
const paymentCtr = new payment_controller.payment_controller()
initTest();

describe.only('Payments',()=>{

  describe('create',()=>{

    it('Should exist the user', async ()=>{
      const payment = new Payment({
        user:mongoose.Types.ObjectId(),
        amount:123.123,
        description:'Pago de casona',
        status:false})
      const response = await payment.validate_user(payment.user)
      expect(response).to.be.equal(false)
    })

    it('Should not create if amount is number',()=>{
      const payment = new Payment({
        user:mongoose.Types.ObjectId(),
        amount:123.12,
        description:'Pago de casona',
        status:false})
      expect(payment.validate_amount(payment.amount)).to.be.true
    })

    it('Should create a payment',async ()=>{
      const payment = new Payment({
        user:mongoose.Types.ObjectId("5d7fc57ade43390a55b67185"),
        amount:123.123,
        description:'Pago de casona',
        status:false})
      const response = await payment.validate_payment()
      expect(response).to.be.true
    })
  })

  describe('readme',()=>{

    it('Return all payments user is admin',async ()=>{
      const user = mongoose.Types.ObjectId("5d7fc57ade43390a55b67185")
      const response = await paymentCtr.get_all_payments(user)
      expect(response).to.be.false
    })

    it('Return your payments',async ()=>{
      const user = mongoose.Types.ObjectId("5d7fc57ade43390a55b67185")
      const response = await paymentCtr.get_my_payments(user)
      expect(response).to.deep.equal([])
    })

  })

  describe('update',()=>{

    it('Only admin',async ()=>{
      const user = mongoose.Types.ObjectId("5d7fe420af5977298ee1fd22")
      const response = await paymentCtr.update_access(user)
      expect(response).to.be.true
    })

  })

  describe('delete',()=>{

    it('Only an admin',async ()=>{
      const user = mongoose.Types.ObjectId("5d7fc57ade43390a55b67185")
      const payment = mongoose.Types.ObjectId("5d7733576c4d582b4f1ebdba")
      const response = await paymentCtr.delete_payment(user, payment)
      expect(response).to.be.false
    })

    it('Cannot delete if payment status is not done',async ()=>{
      const user = mongoose.Types.ObjectId("5d7fe420af5977298ee1fd22")
      const payment = mongoose.Types.ObjectId("5d7733cc92c23e2bc166a1a4")
      const response = await paymentCtr.delete_payment(user, payment)
      expect(response).to.deep.equal({'error':'Status not done'})
    })

    it.only('delete when status is done',async ()=>{
      //use create_example_payment if need
      const user = mongoose.Types.ObjectId("5d7fe420af5977298ee1fd22")
      const payment = await paymentCtr.create_example_payment()
      const response = await paymentCtr.delete_payment(user, payment)
      expect(response).to.deep.equal({'00':'Delete true'})

    })

  })
})
