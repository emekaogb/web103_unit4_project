import express from 'express'
import JournalsController from '../controllers/journals.js'

const router = express.Router()

router.get('/', JournalsController.getJournals)
router.get('/:id', JournalsController.getJournal)
router.post('/', JournalsController.createJournal)
router.patch('/:id', JournalsController.updateJournal)
router.delete('/:id', JournalsController.deleteJournal)

export default router