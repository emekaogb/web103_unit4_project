import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>PageSmith</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>New Journal</a></li>
                <li><a href='/journals' role='button'>View All</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation