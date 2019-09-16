import 'mocha'
import { expect, assert } from 'chai'
import "chai/register-should"
import Activity from '../models/activity'
// import initTest from './test_helper'
import mongoose from 'mongoose'

// initTest();

describe('Activity', () => {
    describe('Displays the activity', () => {
      let activity;
      before(() => {
        activity = new Activity({
            date: Date.now(),
            state: "Planeado",
            capacity: 10,
            peopleAttending: [{ name: "Daniel", age: 22}]
        });
      });
      it('Should check remaining places', () => {
        let result = activity.getRemainingPlaces();
        expect(result).to.be.a("number")
        expect(result).to.equal(9)
      });
      it('Should show current state', ()=>{
        let result = activity.getState();
        expect(result).to.equal("Planeado")
        expect(result).to.be.a("string")
      });
      it('Should show all the people attending', ()=>{
        let result = activity.getAttendants();
        expect(result).to.have.lengthOf(1)
        expect(result).to.be.an('array')
      });
    })
    describe('Handling users', ()=>{
      it('Should add a user if the remaining places are more than 0', () => {
        let activity = new Activity({
          date: Date.now(),
          state: "Planeado",
          capacity: 2,
          peopleAttending: [{ name: "Daniel", age: 22}]
        });
        const user = { name: "Jaime", age: 22}
        let result = activity.addUser(user)
        expect(result.peopleAttending).to.have.lengthOf(2)
        expect(result.peopleAttending).include(user)
      });
      it('Should not add a user if there are no remaining places', () => {
        let activity = new Activity({
          date: Date.now(),
          state: "Planeado",
          capacity: 1,
          peopleAttending: [{ name: "Daniel", age: 22}]
        });
        const user = { name: "Jaime", age: 22}
        expect(()=>{activity.addUser(user)}).to.throw(Error)
      });
      it('Should not add a user when state is "En progreso"', () => {
        let activity = new Activity({
          date: Date.now(),
          state: "En progreso",
          capacity: 2,
          peopleAttending: [{ name: "Daniel", age: 22}]
        });
        const user = { name: "Jaime", age: 22}
        expect(()=>{activity.addUser(user)}).to.throw(Error)
      });
    })
    describe('Handles Activity',()=>{
      it('Should verify that date is not older than today', ()=>{
        var d = new Date();
        d.setDate(d.getDate() - 1);
        let activity = new Activity({
          date: d,
          state: "En progreso",
          capacity: 2,
          peopleAttending: [{ name: "Daniel", age: 22}]
        });
        expect(()=>{activity.verifyDate()}).to.throw(Error)
      });
      it('Should not modify capacity number if value is less or equal than 0',()=>{
        let activity = new Activity({
          date: Date.now(),
          state: "En progreso",
          capacity: 2,
          peopleAttending: []
        });
        let result = activity.setCapacity(20)
        expect(result.capacity).to.be.a("number")
        expect(result.capacity).to.equal(20)
      });
      it('Should not clear an activity that is "En Progreso"', ()=>{
        let activity = new Activity({
          date: Date.now(),
          state: "En progreso",
          capacity: 2,
          peopleAttending: [{ name: "Daniel", age: 22}]
        });
        expect(()=>{activity.clear()}).to.throw(Error)
      });
      it('Should delete an activity and notify all attendees', () => {
        let activity = new Activity({
          date: Date.now(),
          state: "Planeado",
          capacity: 2,
          peopleAttending: [{ name: "Daniel", age: 22, notifyDelete(){}}]
        });
        let result = activity.clear();
        expect(result).to.be.null;
      });
    })
    describe.skip('Modify Activity', () => {
    })
  });
