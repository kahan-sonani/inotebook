const express = require('express')
const fetchUser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const router = express.Router()
const { body, validationResult } = require('express-validator')

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json({ notes: notes, success: true })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message, success: false })
    }
})
router.put('/addNote', fetchUser, [
    body('title', 'Title required').isLength({ min: 5 }),
    body('description', 'Description must be atleast 5 chars').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNode = await note.save()
        res.json({ success: true, note: savedNode })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message, success: false })
    }
})

router.put('/updateNote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        newNote.date = Date.now()

        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send({ message: "Note not found" }) }
        if (note.user.toString() !== req.user.id) { return res.status(401).send({ message: "Unauthorized access" }) }

        let savedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ success: true, note: savedNote })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message, success: false })
    }
})

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send({ message: "Note not found" }) }
        if (note.user.toString() !== req.user.id) { return res.status(401).send({ message: "Unauthorized access" }) }

        let deletedNote = await Note.findByIdAndDelete(req.params.id)
        res.json({ message: 'Note deleted', note: deletedNote, success: true })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: 'Internal Server Error', message: e.message, success: false })
    }
})

module.exports = router