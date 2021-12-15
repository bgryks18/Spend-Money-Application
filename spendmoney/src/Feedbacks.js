import React from 'react'
import Feedback from './Feedback';

const Feedbacks = ({feedbacks}) => {
    if (feedbacks) {
        return (
            feedbacks.map((item,index)=>{
                return (
                    <Feedback feedbacks={feedbacks} feedback={item} index={index} key={index}/>
                )
            })
        )
    } else {
        return (
            <></>
        )
    }
}

export default Feedbacks
