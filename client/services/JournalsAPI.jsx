const BASE_URL = '/api/journals'

export const getAllJournals = async () => {
    const response = await fetch(BASE_URL)
    return response.json()
}

export const createJournal = async (journal) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journal),
    })
    return response.json()
}

export const updateJournal = async (id, updates) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    })
    return response.json()
}

export const deleteJournal = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    return response.json()
}
