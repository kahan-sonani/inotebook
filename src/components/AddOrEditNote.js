import { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { noteContext, NoteState } from '../context/notes/NoteState'

const AddOrEditNote = (props) => {
    const context = useContext(noteContext)
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef()

    const { addNote, deleteNote, updateNote } = context;
    const [note, setNote] = useState(location.state.note)
    const edit = location.state.edit

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleDeleteClick = (e) => {
        if (window.confirm("Do you really want to delete the note?")) {
            if (deleteNote(note._id))
                toast.success('Note deleted successfully')
            else
                toast.error('Something went wrong!')
            navigate('/home')
        }
        e.preventDefault();
    }
    const onSaveChangesClick = () => {
        if (formRef.current.checkValidity()) {
            const result = edit ? updateNote(note) : addNote(note)
            console.log(result)
            navigate('/home')
            if (!result) {
                toast.error('Something went wrong!');
            } else {
                toast.success(`Note ${edit ? 'updated' : 'added'} successfully`);
            }
        }
    }

    return (
        <form ref={formRef}>
            <div className='max-w-3xl mx-auto py-5 px-5 mt-5'>
                <div className='flex items-center justify-between mr-10'>
                    <div className='flex items-center'>
                        <Link to='/home'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </Link>
                        <span className='pl-4 font-extrabold text-4xl'>{edit ? 'Edit' : 'Add'} Note</span>
                    </div>
                    {edit ? <button onClick={handleDeleteClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                    </button> : <div />}

                </div>
                <div className="mr-5 ml-5 mb-5">

                    <label className="block p-5">
                        <span className=" block font-semibold text-slate-500">Title</span>
                        <input minLength={5} required onChange={onChange} type="text" name='title' value={note.title} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "/>
                    </label>
                    <label className="block pr-5 pl-5 pb-5">
                        <span className=" block font-semibold text-slate-500">Description</span>
                        <textarea minLength={5} required onChange={onChange} name='description' value={note.description} rows={4} type="text" className="row- resize-none mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "/>
                    </label>
                    <label className="block pr-5 pl-5 pb-5">
                        <span className=" block font-semibold text-slate-500">Tag</span>
                        <input minLength={5} required onChange={onChange} value={note.tag} name='tag' type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "/>
                    </label>
                    <button onClick={onSaveChangesClick} className='font-normal mr-5 mb-5 ml-5 rounded-md p-3 text-white bg-blue-600'>Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export default AddOrEditNote
