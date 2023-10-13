const noteModel = require('../models/Notes.js');
const express = require('express');
const mongoose = require('mongoose');





//TODO - Create a new Note
const newNote = {
    noteTitle: "My Lab 6",
    noteDescription: "This is the description of my Lab 6.",
    priority: "MEDIUM",  
    dateAdded: new Date(),
    dateUpdated: new Date()
  };
  console.log(newNote);
  
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description are required"
        });
    }

    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note

    newNote.save()
    .then(savedNote => {
        res.status(201).json(savedNote);
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occurred while saving the note",
            error: error.message
        });
    });
});







//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find

app.get('/notes', (req, res) => {
    // Validate request
    noteModel.find({}, (error, notes) => {
        if (error) {
            return res.status(400).json({
                message: "Note content can not be empty",
                error: error.message
            });
        }
        res.status(200).json(notes);
    });
    //TODO - Write your code here to returns all note
});







//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    //TODO - Write your code here to return onlt one note using noteid
    noteModel.findById(noteId, (error, note) => {
        if (error) {
            return res.status(500).json({
                message: "An error occurred while retrieving the note",
                error: error.message
            });
        }

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    });

});








//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(500).send({
            message: "Note title and description are required"
        });
    }
    const updatedNote = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM',
        dateUpdated: new Date()
    };
    noteModel.findByIdAndUpdate(noteId, updatedNote, { new: true }, (error, updatedNote) => {
        if (error) {
            return res.status(500).json({
                message: "An error occurred while updating the note",
                error: error.message
            });
        }

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updatedNote);
    });
});







//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    // Validate request
    if (!noteId) {
        return res.status(400).send({
            message: "ID is required"
        });
    }

    noteModel.findByIdAndRemove(noteId, (error, removedNote) => {
                if (!removedNote) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.status(200).json({
            message: "deleted successfully",
            deletedNote: removedNote
        });
    });
});
