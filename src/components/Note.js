import React from 'react'
import { useNavigate } from 'react-router-dom';

const Note = (props) => {

    const navigate = useNavigate()
    const handleClickButton = () => {
        navigate('/home/note/edit', { state: { note: props.note, edit: +true } })
    }

    const date = new Date(props.note.date);
    return (
        <button onClick={handleClickButton} className="flex-grow relative px-1 py-1 cursor-pointer">
            <div className="hover:shadow-2xl hover:border-blue-600 h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
                <div className="text-start p-5">
                    <h2 className="text-sm font-medium text-blue-400 mb-1">{date.toDateString()}</h2>
                    <h1 className="text-2xl font-semibold mb-3">{props.note.title}</h1>
                    <p className="leading-relaxed mb-1">{props.note.description}</p>
                    <div className='left-5 bottom-4 flex items-center mt-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                        </svg>
                        <h3 className='font-semibold text-sm ml-1'>{props.note.tag}</h3>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Note
