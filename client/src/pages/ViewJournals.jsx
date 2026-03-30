import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllJournals } from '../../services/JournalsAPI'
import { calcPrice } from '../utilities/calcprice'
import '../css/ViewJournal.css'

const ViewJournals = () => {
    const [journals, setJournals] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJournals = async () => {
            const data = await getAllJournals()
            setJournals(data)
            setLoading(false)
        }
        fetchJournals()
    }, [])

    return (
        <div className='view-journals'>
            <h2>All Journals</h2>
            {loading ? null : journals.length === 0 ? (
                <p>No journals yet. <a href='/'>Create one!</a></p>
            ) : (
                <div className='journals-grid'>
                    {journals.map((journal) => (
                        <div
                            key={journal.id}
                            className='journal-card'
                            onClick={() => navigate(`/journals/${journal.id}`)}
                            style={{ backgroundColor: journal.color }}
                        >
                            <div className='journal-card-spine' />
                            <div className='journal-card-body'>
                                {journal.icon && (
                                    <img
                                        src={`/${journal.icon}_icon.png`}
                                        alt={journal.icon}
                                        className='journal-icon'
                                    />
                                )}
                                <div className='journal-card-footer'>
                                    <h3 className='journal-card-name'>{journal.name}</h3>
                                    <p>${calcPrice(journal)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewJournals