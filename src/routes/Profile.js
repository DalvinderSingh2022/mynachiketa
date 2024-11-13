import React, { useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;

        setLoading(true);
        fetch(`https://lichess.org/api/user/${username}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
            })
            .catch(error => {
                setError(true)
            })
            .finally(setLoading(false));
    }

    return (
        <section>
            <form className='profile_form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    id='username'
                    className='input_field'
                    placeholder='username...'
                />
                <button className='btn primary'>search</button>
            </form>
            <UserDetials user={user} loading={loading} error={error} />
        </section>
    )
}

const UserDetials = ({ user, error, loading }) => {

    if (error) {
        return <div>erorr while fetching</div>
    }
    if (loading) {
        return <div>Loaidng...</div>
    }


    if (user) {
        return <div className="user_details">
            <img
                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QALBABAAICAAMIAgEFAQAAAAAAAAECAxEEITESIjJBUWFxoRRSkTNCU4HxE//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAACFrxHTmhN7f8Bc5tRsBoGeJmOkpxkmPcFojW0SkAAAAAAAAAABM6jmqveZ6coL23Oo6IAAAAAAALKX3ylWA0CGO2+U9UwAAAAAAEbzqPdJVlnvfAIAAI3tFK9qeiTJxV95OzHSoOX4i9vD3YQ/8AS/72/lAVGjFxM71k6erU81r4S+6TWfJFXgAROp2vidxtQtxzy0CYAAAAACi/ileot4pBwABhz/1r/Lcx8VXs5e15W5gpAVBo4PxX+Gdr4Suq2tPn0BeAiieLrKCWPxAuAAAAAAU5I1aVyvLHmCsABHJSL11P+vZ2bRWN2mIj3U24qseGJn6BRkwXpPTcesIan0n+Gj8qf0+z8qf0+wRxcPaZibxqPRriIjlHKGb8qf0+06cRS3i7vyC4ABZijrKtdSNVBIAAAAAByY3GpdAUTGp05MxETM9I6rr17Ue7JxczXFMTy3yBly5JyW35eUIAqAAAAL+GyzExS07jy9mt5vTm9LHE3rE+sIqVK9qefRc5WNRqHQAAAAAAAAFWfDXNXU8p8pWgPKy4L4p70bj1hU9pRfhcV+fZ1PtyB5g3W4GN928x8wj+DP8Ak+lGMbq8DX+61p+mjHhx4/DWIn1QYcPCXyc77rX7ehSkUrFY6QkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q=='
                alt='username'
                className="user_profileimage"
            />
            <h2 className="user_username">{user.username}</h2>
            {user?.profile?.bio && <span className="user_bio">{user.profile.bio}</span>}
            <span className='user_gamescount'>Games Played: {user.count.all}</span>
            {user?.perfs &&
                <div>
                    {Object.entries(user.perfs).map(([key, value]) =>
                        <div className="user_rating">
                            <div className="rating_key">{key}</div> :
                            <div className="rating_value">{value.rating}</div>
                        </div>
                    )}
                </div>}
        </div>;
    }

    return <div>Enter username to search</div>
}

export default Profile;