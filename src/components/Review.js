import React from 'react';

function Review({c}){
    return(
        <div className="one-review book">
            <div className="title-author">
                <h3>{c.title}</h3>
                <h4>{c.author}</h4>
                <p>{`"${c.review}"`}</p>
            </div>
        </div>
    )
}
export default Review;