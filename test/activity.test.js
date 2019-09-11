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
    describe('Creates Activity',()=>{
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
    })
    describe.skip('Modify Activity', () => {
      let activity;
      beforeEach((done) => {
        activity = new Activity({ date: Date.now(), state: "Terminado", capacity: 10 });
        activity.save()
          .then(() => done());
      });
      it('Should not modify capacity number if value is less or equal than 0',()=>{
        activity.set('capacity', -1)
        activity.save((err, doc)=>{
          should.exist(err);
          expect(err.message).to.equal('Activity validation failed: capacity: Path `capacity` (-1) is less than minimum allowed value (1).');
          should.not.exist(doc);
        })
      });
      it('Should add a person to the attending array', () => {
        var person = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        activity.peopleAttending.push(person)
        activity.save((err,doc)=>{
          should.not.exist(err)
          expect(doc.peopleAttending).to.have.lengthOf(1)
        })
      });
      it('Should only let a person register if capacity is below limit', () => {
        var person1 = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        activity.set('capacity', 1)
        activity.peopleAttending.push(person1)
        if(activity.capacity >= activity.peopleAttending.length){
          activity.save((err, doc)=>{
            expect(doc.capacity).to.be.equal(1);
          });
        }else{
          assert.fail("Capacity is less than people attending length")
        }
      });
    })
    describe.skip('Eliminar Actividad', () => {
      let activity;
      beforeEach((done) => {
        activity = new Activity({ date: Date.now(), state: "Planeado", capacity: 15 });
        activity.save()
          .then(() => done());
      });
      it('Should not delete an activity that is "En Progreso"', ()=>{
        if(activity.state !== "En progreso"){
          activity.remove()
            .then(()=>Activity.findOne({state: "Planeada"}))
            .then((activity)=>{
              should.not.exist(activity)
            })
        }else{
          assert.fail("Cannot delete an activity that is in 'En Progreso'")
        }
      });
      it('Should delete an activity that exist on the agenda',()=>{
        activity.remove()
          .then(()=>Activity.findOne({state: "Planeada"}))
          .then((activity)=>{
            should.not.exist(activity)
        })
      });
      it('Should delete an activity and find all attendees', () => {
        var person1 = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        activity.peopleAttending.push(person1)
        var arrayPeople = activity.peopleAttending;
        activity.remove()
          .then(()=>Activity.findOne({state: "Planeada"}))
          .then((activity)=>{
            should.not.exist(activity)
        })
        expect(arrayPeople.length).to.equal(1);
      });
    })
  });