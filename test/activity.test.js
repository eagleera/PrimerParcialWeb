import 'mocha'
import { expect, assert } from 'chai'
import "chai/register-should"
import Activity from '../models/activity'
import initTest from './test_helper'
import mongoose from 'mongoose'

initTest();

describe('Activity', () => {
    describe('Create Activity', () => {
      it('Should create an activity with all the fields', () => {
          const activity = new Activity({ date: Date.now(), state: "Planeado", capacity: 10 })
          activity.save((err, doc)=>{
            should.not.exist(err);
            should.exist(doc);
            doc.should.be.an('object');
          })
      });
      it('Should not create the activity without date', ()=>{
        const activity = new Activity({ state: "Planeado", capacity: 10 })
          activity.save((err, doc) => {
            should.exist(err);
            expect(err.message).to.equal('Activity validation failed: date: Path `date` is required.');
            should.not.exist(doc);
          })
      });
      it('Should not create the activity without date being of Date type', ()=>{
        const activity = new Activity({ date: "estonoesundate", state: "Planeado", capacity: 10 })
        activity.save((err, doc) => {
          should.exist(err);
          expect(err.message).to.equal('Activity validation failed: date: Cast to Date failed for value "estonoesundate" at path "date"');
          should.not.exist(doc);
        })
      });
      it('Should not create the activity without specifying a capacity number', ()=>{
        const activity = new Activity({ date: Date.now(), state: "Planeado"})
          activity.save((err, doc) => {
            should.exist(err);
            expect(err.message).to.equal('Activity validation failed: capacity: Path `capacity` is required.');
            should.not.exist(doc);
          })
      });
    })
    describe('Modify Activity', () => {
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
    describe('Eliminar Actividad', () => {
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
