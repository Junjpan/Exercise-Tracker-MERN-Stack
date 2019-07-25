const router = require('express').Router();
const Exercise = require('../models/exercise');

router.route('/').get((req, res) => {
    Exercise.find({},
        (err, exercise) => {
            if (err) { res.status(400).json(err) }
            res.json(exercise)

        })
})

router.route('/add').post((req, res) => {
    const user = req.body.user;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const duration = Number(req.body.duration);

    const newExercise = new Exercise({ user, description, date, duration });

    newExercise.save()
        .then(() => res.send("New exercise has been added"))
        .catch((err)=> res.status(400).json({"err": err}))
})

router.route('/:id').get((req, res) => {
    var { id } = req.params;
    Exercise.findById({ "_id": id }, (err, exercise) => {
        if (err) { res.status(400).json(err) }
        res.json({ exercise })
    })
})

router.route("/:id").delete((req, res) => {
    var { id } = req.params;
    Exercise.findByIdAndDelete({ "_id": id })
        .then(() => { res.send("Current ID has been deleted") })
        .catch((err) => res.status(400).json("err" + err))
})

router.route("/update/:id").post((req, res) => {
    var { id } = req.params;
    Exercise.findById(id)
        .then(exercise => {
            exercise.user = req.body.user;//!!
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);
            exercise.duration = Number(req.body.duration);
        
    exercise.save()
            .then(()=>res.send("exercise has been updated"))
            .catch((err)=>res.status(400).json("err"+err)) 
})
    .catch(err => res.status(400).json(err))
})
module.exports = router;