import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const noteContext = createContext();

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const addNote = (title, description, tag) => {
        let note = {
            "_id": "63c0e4df2e4e4418cd7fba1a",
            "user": "63be93343ef23ac1047bedf8",
            "title": "jkhdfkjsdf",
            "description": "sdfsdfkjhsdf",
            "tag": "personal",
            "date": "2023-01-13T04:58:07.307Z",
            "__v": 0
        };
        setNotes(notes.push(note))
    }

    const deleteNote = () => {

    }

    const updateNote = () => {

    }

    const getNotes = async () => {
        const notes = await axios.get(`${host}/api/notes/fetchAllNotes`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                'Content-Type': 'application/json'
            }
        })
        return notes
    }

    const [notes, setNotes] = useState([])
    return <noteContext.Provider value={{ notes, setNotes }}>
        {props.children}
    </noteContext.Provider>
}

export { NoteState };
export { noteContext };