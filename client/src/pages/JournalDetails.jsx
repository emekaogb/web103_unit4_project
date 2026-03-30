import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJournal, deleteJournal } from '../../services/JournalsAPI'
import { calcPrice } from '../utilities/calcprice'
import '../css/JournalDetails.css'

const JournalDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [journal, setJournal] = useState(null)

    useEffect(() => {
        const fetchJournal = async () => {
            const data = await getJournal(id)
            setJournal(data)
        }
        fetchJournal()
    }, [id])

    const handleDelete = async () => {
        await deleteJournal(id)
        navigate('/journals')
    }

    if (!journal) return <p>Loading...</p>

    return (
        <div className='journal-details'>
            <div className='journal-details-header'>
                <img
                    src={`/${journal.icon}_icon.png`}
                    alt={journal.icon}
                    className='journal-details-icon'
                />
                <h2>{journal.name}</h2>
            </div>
            <p><strong>Color:</strong> {journal.color}</p>
            <p><strong>Size:</strong> {journal.size}</p>
            <p><strong>Paper:</strong> {journal.paper}</p>
            <p><strong>Accessories:</strong> {journal.accessories?.length > 0 ? journal.accessories.join(', ') : 'none'}</p>
            <p><strong>Price:</strong> ${calcPrice(journal)}</p>

            <div className='journal-actions'>
                <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                <button className='secondary' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default JournalDetails