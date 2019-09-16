import Payments from '../models/paymentModel';
import mongoose from 'mongoose'
import "regenerator-runtime/runtime";
import "core-js/stable";
import User from '../models/UserModel'

exports.payment_controller = class  PaymentController {

  constructor() {

  }

  /*
  *function dedicated
  *to create example payment*/
  async create_example_payment(){
    const payment = new Payments({
      user:mongoose.Types.ObjectId(),
      amount:123.123,
      description:'Pago de casona',
      status:true}
    )
    payment.save()
    return payment._id
  }

  /*
  *Funcion dedicada a borrar los pagos*/
  async delete_payment(user_id, payment_id){
    if(this.validate_admin_user(await User.findById(user_id))){
      const payment = await Payments.findById(payment_id)
      if(payment.status){
          await Payments.findByIdAndDelete(payment_id)
          return {'00':'Delete true'}
      }else{
        return {'error':'Status not done'}
      }

    }else{
      return false
    }
  }

  /*
  *Funcion encargada de checar
  *si el usuario tiene acceso al
  *update*/
  async update_access(user_id){
    if(this.validate_admin_user(await User.findById(user_id))){
      return true
    }else{
      return false
    }
  }

  /*
  *Funcion encargada de regresar
  *todos los pagos de un usuario*/
  async get_my_payments(user_id){
    return await Payments.find({user:user_id})
  }

  /*
  *Funcion encargada de regresar todos los pagos
  *si el usuario es administrador*/
  async get_all_payments(user_id){
    if(this.validate_admin_user(await User.findById(user_id))){
      return await Payments.find({})
    }else {
      return false
    }
  }

  validate_admin_user(user){
    if(user.admin){
      return true
    }else{
      return false
    }
  }

  /*
  *Funcion encargada de valiar
  *si se puede crear el pago*/
  async validate_payment(){
    if(await this.validate_user(this.user)){
      if(this.validate_amount(this.amount)){
        return true
      }else {
        return false
      }
    }else{
      return false
    }
  }

  /*
  *Funcion encargada de validar si el usuario
  *Existe*/
  async validate_user(user_id){
    let user = await User.findById(user_id)
    if (user){
      return true
    }else {
      return false
    }
  }

  /*
  *Funcion encargada de validar
  *si la cantidad es un numero*/
  validate_amount(amount){
    return Number(amount) === amount ;
  }
}
