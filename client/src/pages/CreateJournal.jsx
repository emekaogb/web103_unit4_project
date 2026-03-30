import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJournal } from '../../services/JournalsAPI'
import { calcPrice, SIZE_PRICES, PAPER_PRICES, ACCESSORY_PRICES } from '../utilities/calcprice'
import '../css/JournalForm.css'

const COLORS = ['maroon', 'brown', 'coral', 'darkkhaki', 'rosybrown', 'darkgreen', 'cornflowerblue', 'darkslateblue']
const ICONS = ['star', 'moon', 'sun', 'leaf', 'heart', 'bolt', 'crown', 'flame']

const TABS = ['Name', 'Color', 'Icon', 'Size', 'Paper', 'Accessories']

const CreateJournal = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({
        name: '',
        color: COLORS[0],
        icon: ICONS[0],
        size: 'small',
        paper: 'blank',
        accessories: [],
    })

    const price = calcPrice(form)
    const isLast = step === TABS.length - 1

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

    const handleSubmit = async () => {
        await createJournal(form)
        navigate('/journals')
    }

    return (
        <div className='journal-form'>
            <h2>Customize Your Journal</h2>

            <div className='tab-bar'>
                {TABS.map((tab, i) => (
                    <button
                        key={tab}
                        className={`tab-btn ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                        onClick={() => setStep(i)}
                        type='button'
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className='tab-content'>
                {step === 0 && (
                    <label>
                        Journal Name
                        <input
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={handleChange}
                            placeholder='My Journal'
                        />
                    </label>
                )}

                {step === 1 && (
                    <div className='option-grid'>
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                type='button'
                                className={`color-btn ${form.color === c ? 'selected' : ''}`}
                                style={{ background: c }}
                                onClick={() => setForm({ ...form, color: c })}
                            >
                                {form.color === c ? '✓' : ''}
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className='option-grid'>
                        {ICONS.map((icon) => (
                            <button
                                key={icon}
                                type='button'
                                className={`icon-btn ${form.icon === icon ? 'selected' : ''}`}
                                onClick={() => setForm({ ...form, icon })}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className='option-list'>
                        {Object.entries(SIZE_PRICES).map(([size, cost]) => (
                            <button
                                key={size}
                                type='button'
                                className={`option-btn ${form.size === size ? 'selected' : ''}`}
                                onClick={() => setForm({ ...form, size })}
                            >
                                <span>{size}</span>
                                <span>+${cost}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 4 && (
                    <div className='option-list'>
                        {Object.entries(PAPER_PRICES).map(([type, cost]) => (
                            <button
                                key={type}
                                type='button'
                                className={`option-btn ${form.paper === type ? 'selected' : ''}`}
                                onClick={() => setForm({ ...form, paper: type })}
                            >
                                <span>{type}</span>
                                <span>{cost > 0 ? `+$${cost}` : 'free'}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 5 && (
                    <div className='option-list'>
                        {Object.entries(ACCESSORY_PRICES).map(([accessory, cost]) => (
                            <button
                                key={accessory}
                                type='button'
                                className={`option-btn ${form.accessories.includes(accessory) ? 'selected' : ''}`}
                                onClick={() => handleAccessoryToggle(accessory)}
                            >
                                <span>{accessory}</span>
                                <span>+${cost}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <p className='price-display'>Total: <strong>${price}</strong></p>

            <div className='tab-nav'>
                <button
                    type='button'
                    className='nav-btn'
                    onClick={() => setStep((s) => s - 1)}
                    disabled={step === 0}
                >
                    Back
                </button>
                {isLast ? (
                    <button
                        type='button'
                        className='nav-btn submit-btn'
                        onClick={handleSubmit}
                        disabled={!form.name}
                    >
                        Create Journal
                    </button>
                ) : (
                    <button
                        type='button'
                        className='nav-btn'
                        onClick={() => setStep((s) => s + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreateJournal