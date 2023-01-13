import React, { useContext } from 'react'
import Note from './Note'
import { noteContext } from '../context/notes/NoteState'
import { Link } from 'react-router-dom'
const Home = () => {
    const context = useContext(noteContext)
    const { notes, setNotes } = context;
    return (
        <div className='max-w-3xl mx-auto py-5 px-5 mt-5'>
            <span className='font-extrabold text-4xl'>Your Notes</span>
            <div className="flex pt-4 flex-wrap flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row ">
                {notes.map((element) => {
                    return <Note key={element._id} title={element.title} description={element.description} tag={element.tag} date={element.date} />
                })}
            </div>
            <Link to='/home/note/add' className='fixed z-90 bottom-10 right-10 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Link >
        </div>
    )
}

export default Home
