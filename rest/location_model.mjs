import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise",exerciseSchema);

//create exercise
const createExercise = async(name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight:weight, unit:unit, date:date})
    return exercise.save()
};

//update data
const updateUser = async (filter, update) => {
    const result = await User.updateOne (filter, update);
    return result;
}

//find exercise by ID
const findExerciseById = async(filter) => {
    const query = Exercise.findById(filter);
    return query.exec()
}

//find exercise 
const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const replaceExercise = async (id, name, reps, weight, unit, date) => {
    const updates = await Exercise.replaceOne({_id:id}, {name:name, reps:reps, weight:weight, unit:unit, date:date});
    return updates.modifiedCount
}

const deleteById = async (filter) => {
    const del = await Exercise.deleteOne(filter);
    return del.deletedCount
}

export {createExercise, findExerciseById, findExercise, replaceExercise, deleteById}