import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJournal } from '../../services/JournalsAPI'
import { calcPrice, SIZE_PRICES, PAPER_PRICES, ACCESSORY_PRICES } from '../utilities/calcprice'
import '../App.css'

const COLORS = ['red', 'blue', 'green', 'black', 'purple', 'orange', 'pink', 'yellow']
const ICONS = ['star', 'moon', 'sun', 'leaf', 'heart', 'bolt', 'crown', 'flame']

const CreateJournal = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        color: COLORS[0],
        icon: ICONS[0],
        size: 'small',
        paper: 'blank',
        accessories: [],
    })

    const price = calcPrice(form)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAccessoryToggle = (accessory) => {
        setForm((prev) => {
            const has = prev.accessories.includes(accessory)
            return {
                ...prev,
                accessories: has
                    ? prev.accessories.filter((a) => a !== accessory)
                    : [...prev.accessories, accessory],
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createJournal(form)
        navigate('/journals')
    }

    return (
        <div className='create-journal'>
            <h2>Customize Your Journal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        name='name'
                        type='text'
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder='My Journal'
                    />
                </label>

                <label>
                    Color
                    <select name='color' value={form.color} onChange={handleChange}>
                        {COLORS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Icon
                    <select name='icon' value={form.icon} onChange={handleChange}>
                        {ICONS.map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Size
                    <select name='size' value={form.size} onChange={handleChange}>
                        {Object.entries(SIZE_PRICES).map(([size, price]) => (
                            <option key={size} value={size}>{size} (+${price})</option>
                        ))}
                    </select>
                </label>

                <label>
                    Paper
                    <select name='paper' value={form.paper} onChange={handleChange}>
                        {Object.entries(PAPER_PRICES).map(([type, cost]) => (
                            <option key={type} value={type}>
                                {type} {cost > 0 ? `(+$${cost})` : '(free)'}
                            </option>
                        ))}
                    </select>
                </label>

                <fieldset>
                    <legend>Accessories</legend>
                    {Object.entries(ACCESSORY_PRICES).map(([accessory, cost]) => (
                        <label key={accessory}>
                            <input
                                type='checkbox'
                                checked={form.accessories.includes(accessory)}
                                onChange={() => handleAccessoryToggle(accessory)}
                            />
                            {accessory} (+${cost})
                        </label>
                    ))}
                </fieldset>

                <p><strong>Total: ${price}</strong></p>

                <button type='submit'>Create Journal</button>
            </form>
        </div>
    )
}

export default CreateJournal