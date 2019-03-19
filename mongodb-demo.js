const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') // MongoDB connector
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

// Create MongoDB Schema by mongoose
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); // Class
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Oleg',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

createCourse();
