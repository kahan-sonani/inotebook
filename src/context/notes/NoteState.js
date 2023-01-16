import axios from "axios";
import React, { createContext, useState } from "react";

const noteContext = createContext();

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([])

    const addNote = async (note) => {
        const result = await axios.put(`${host}/api/notes/addNote`,
            note
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                    'Content-Type': 'application/json'
                },
            })
        notes.push(note)
        setNotes(notes)
    }

    const deleteNote = async (id) => {
        const result = await axios.delete(`${host}/api/notes/deleteNote/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                'Content-Type': 'application/json'
            }
        })
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    const updateNote = async (note) => {
        const result = await axios.put(`${host}/api/notes/updateNote/${note._id}`,
            note
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                    'Content-Type': 'application/json'
                },
            })
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let item in newNotes) {
            if (item._id === note._id) {
                item.title = note.title;
                item.description = note.description;
                item.tag = note.tag;
                break;
            }
        }

        setNotes(newNotes)
    }
    const getNotes = async () => {
        const notess = await axios.get(`${host}/api/notes/fetchAllNotes`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                'Content-Type': 'application/json'
            }
        })
        notess.data.sort((a, b) => {
            return b.description.length - a.description.length
        })
        setNotes(notess.data)
    }

    return <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
        {props.children}
    </noteContext.Provider>
}

export { NoteState };
export { noteContext };