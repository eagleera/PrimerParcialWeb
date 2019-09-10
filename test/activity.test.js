
import 'mocha'
import { expect, should, assert } from 'chai'
import mongoose from 'mongoose'
import Activity from '../models/activity'
import initTest from './test_helper'
initTest();

describe('Activity', () => {
    describe('Crear Actividad', () => {
        it('Should create an activity with all the fields', () => {
            const activity = new Activity({ date: Date.now(), capacity: 10 })
            activity.save().then(()=>{
              console.log(activity)
              expect(activity.capacity).to.equal(10);
            })
        })
        it('No debe crear la actividad cuando no se especifica fecha');
        it('No debe crear la actividad cuando la fecha no es de tipo Date');
        it('No debe crear la actividad cuando no se especifica # personas');
        it('No debe crear la actividad cuando el numero de personas no es de tipo entero');
      })
    describe('Modificar Actividad', () => {
      describe('Modificar # personas', () => {
        it('No debe dejar modificar si el valor es diferente a un numero');
        it('El valor numerico no debe de ser menor o igual a 0');
      })
      describe('Modificar Estado', () => {
        it('No debe cambiar el estado a terminado si no llega a la fecha del evento');
        it('No debe cambiar el estado a progreso si no llega a la fecha del evento');
        it('El estado no debe cambiar una ves se encuentre en terminado');
      })
      describe('Agregar persona a la actividad', ()=>{
        it('No debe dejar agregar cuando la cantidad de personas es mayor al limite');
      })
      describe('Eliminar persona de la actividad', ()=>{
        it('Debe eliminar a la persona del arreglo de personas en actividades');
      })
    })
    describe('Eliminar Actividad', () => {
      it('No debe eliminar una actividad en estado "En progreso"');
      it('Debe eliminar una actividad agendada');
      it('Debe notificar a las personas registradas que se elimino la actividad');
    })
  });
