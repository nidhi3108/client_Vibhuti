// const dotenv=require('dotenv')
// const express= require('express')
//
// const app=express();
// const port= process.env.port ||8080;
// dotenv.config({path:'./.env'});
// const cors=require('cors')
//
// app.use(express.json());
// app.use(cors({
//     origin:'*'
// }))
//
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
//   });
//
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`)
// })
//
//

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Course = require('./models/coursemodel');
const Speaker = require('./models/speakermodel');
const CourseSpeaker = require('./models/coursespeakermodel');
const Topic = require('./models/topicmodel');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nidhi3108:123Nid45@cluster0.u5hhcyg.mongodb.net/vibhutitask?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Search endpoint
app.get('/search', async (req, res) => {
    try {
        console.log("req body :: ",req.query)
        const { query, topic, minPrice, maxPrice, sort } = req.query;

        const searchCriteria = {};

        if (query) {
            searchCriteria.name = { $regex: query, $options: 'i' };
        }

        if (topic) {
            searchCriteria.topicId = topic;
        }

        if (minPrice && maxPrice) {
            searchCriteria['priceRange.min'] = { $gte: Number(minPrice) };
            searchCriteria['priceRange.max'] = { $lte: Number(maxPrice) };
        } else if (minPrice) {
            searchCriteria['priceRange.max'] = { $gte: Number(minPrice) };
        } else if (maxPrice) {
            searchCriteria['priceRange.min'] = { $lte: Number(maxPrice) };
        }


        let sortOption = {};
        if (sort === 'newest') {
            sortOption = { createdOn: -1 };
        } else if (sort === 'ascending') {
            sortOption = { 'priceRange.min': 1 };
        }

        const courses = await Course.find(searchCriteria)
            .sort(sortOption)
            .populate('topicId');

        const courseIds = courses.map(course => course._id);
        const courseSpeakers = await CourseSpeaker.find({ courseId: { $in: courseIds } }).populate('speakerId');

        const coursesWithSpeakers = courses.map(course => {
            const speakers = courseSpeakers
                .filter(cs => cs.courseId.toString() === course._id.toString())
                .map(cs => cs.speakerId.name);
            return {
                ...course._doc,
                speakers
            };
        });

        res.json(coursesWithSpeakers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

