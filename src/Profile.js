import { useContext } from 'react';
import UserContext from './userContext';

const Profile = () => {
    const currUser = useContext(UserContext)
    return (
        <div>
            {Object.keys(currUser).map(key => (
                <p key={key}>{key}: {currUser[key].toString()}</p>
            ))}
        </div>
    )
}

export default Profile;