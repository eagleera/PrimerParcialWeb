import mongoose from 'mongoose'

const initTest = () =>{
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/test');
    mongoose.connection
        .once('open', () => console.log('Connected!'))
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
    beforeEach((done) => {
        mongoose.connection.collections.activities.drop(() => {
            done();
        });
    });
}
export default initTest;