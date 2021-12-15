import React from 'react'
const Feedback = ({feedback}) => {
    return (
        <div>
        {!feedback.alert&&<b>{feedback.piece} adet {feedback.title}</b>}
        <p>{feedback.description}</p>
        </div>
    )
}

export default Feedback
