import React, { useContext, useEffect } from 'react'
import Note from './Note'
import { noteContext } from '../context/notes/NoteState'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const context = useContext(noteContext)

    const { notes, getNotes } = context;
    const navigate = useNavigate();
    useEffect(() => {
        getNotes();
    }, [])

    const addNoteClick = () => {
        navigate('/home/note/add', { state: { note: { title: "", description: "", tag: "" } } })
    }
    return (
        <div className='max-w-3xl mx-auto py-5 px-5 mt-5'>
            <span className='font-extrabold text-4xl'>Your Notes</span>
            <div className="flex pt-4 flex-wrap flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                {notes.length === 0 ?
                    <h2 className='p-2 text-slate-500'>No Notes</h2>
                    : notes.map((element) => {
                        return <Note key={element._id} note={element} />
                    })}
            </div>
            <button onClick={addNoteClick} className='fixed z-90 bottom-10 right-10 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </ button>
        </div>
    )
}

export default Home
