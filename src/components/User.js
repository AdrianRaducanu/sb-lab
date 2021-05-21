import React from 'react';
function User({u}){
    const imgRandom = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGLAUGhvGs1mg90ntWQRy0zWejCoWb7fw3ZlZvUCEj3OAtoAWfnlVtiHo7wLptXg451-E&usqp=CAU";
    return(
        <div className = "single-user">
            <img src={u.imageUrl.includes("imageUrl") ? imgRandom : u.imageUrl}></img>
            <h1 onClick={()=>{console.log(u.imageUrl)}}>{u.givenName}</h1>
            <h1>{u.familyName}</h1>
            <h2>Reviews: {u.books.length}</h2>
        </div>
    )
}
export default User;