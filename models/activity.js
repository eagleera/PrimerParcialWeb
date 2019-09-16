import mongoose from 'mongoose'

const Schema = mongoose.Schema

const activitySchema = new Schema({
  date: { type: String, required: true },
  state: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  peopleAttending: [Object],
})

/**
 * Class for the Order model.
 */
class ActivityClass {
  constructor() {
  }

  addUser(user){
    const remainingPlaces = this.getRemainingPlaces()
    const state = this.getState()
    if(remainingPlaces <= 0){
      throw new Error("There are no remaining places left")
    }
    if(state == "En progreso"){
      throw new Error("Cannot add user when state is in progress")
    }
    this.peopleAttending.push(user)
    return this;
  }

  clear(){
    if(this.state == "En progreso"){
      throw new Error("Cannot delete an activity in progress")
    }
    this.peopleAttending.forEach(person => {
      //ESTA FUNCIÓN ES DE LA PERSONA
      person.notifyDelete()
    });
    return null;
  }

  getAttendants(){
    if(this.peopleAttending){
      return this.peopleAttending
    }
    throw new Error("PeopleAttending not defined")
  }

  getRemainingPlaces(){
    var remainingPlaces = 0;
    if(this.capacity > this.peopleAttending.length){
      remainingPlaces = this.capacity - this.peopleAttending.length;
    }
    return remainingPlaces;
  }

  getState(){
    if(this.state){
      return this.state
    }
    throw new Error("State not defined")
  }

  setCapacity(capacity){
    if(capacity <= 0 || typeof capacity !== "number"){
      throw new Error("Capacity needs to be a number and bigger than 0")
    }
    this.capacity = capacity;
    return this;
  }

  verifyDate(){
    var today = new Date(Date.now()).toLocaleString();
    var date = new Date(this.date).toLocaleString();
    if(Date.parse(today) > Date.parse(date)){
      throw new Error("Date cannot be older than today")
    }
    return true
  }
}

//Load class
activitySchema.loadClass(ActivityClass);

export default mongoose.model('Activity', activitySchema)
