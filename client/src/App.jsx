import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewJournals from './pages/ViewJournals'
import EditJournal from './pages/EditJournal'
import CreateJournal from './pages/CreateJournal'
import JournalDetails from './pages/JournalDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateJournal title='PageSmith | Customize' />
    },
    {
      path:'/journals',
      element: <ViewJournals title='PageSmith | Custom Journals' />
    },
    {
      path: '/journals/:id',
      element: <JournalDetails title='PageSmith | View' />
    },
    {
      path: '/edit/:id',
      element: <EditJournal title='PageSmith | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App