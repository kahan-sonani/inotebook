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
        if (!result.data.success) {
            return false;
        } else {
            notes.push(note)
            setNotes(notes)
            return true;
        }
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
        if (!result.data.success) {
            return false;
        } else {
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            return true;
        }
    }

    const updateNote = async (note) => {
        const result = await axios.put(`${host}/api/notes/updateNote/${note._id}`,
            note
            , {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Content-Type': 'application/json'
                },
            })

        if (!result.data.success) {
            return false;
        } else {
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
            return true;
        }
    }
    const getNotes = async () => {
        const result = await axios.get(`${host}/api/notes/fetchAllNotes`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZTkzMzQzZWYyM2FjMTA0N2JlZGY4In0sImlhdCI6MTY3MzQzMzkwOH0.qRfTf8DZug2HLFSS_nORGzEnREextwvF6tMZkNSV4RI',
                'Content-Type': 'application/json'
            }
        })
        if (!result.data.success) {
            return false;
        } else {
            result.data.notes.sort((a, b) => {
                return b.description.length - a.description.length
            })
            setNotes(result.data.notes)
            return true;
        }
    }

    return <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
        {props.children}
    </noteContext.Provider>
}

export { NoteState };
export { noteContext };