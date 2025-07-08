import React, { useEffect } from 'react'
import SuperbotDetails from '../../component/superbot-details/SuperbotDetails'
import { getSuperbotDirections } from '../../store/superbot-details/get-superbot-directions-slice';
import store from '../../store';

const SuperbotDetailsPage: React.FC = () => {

    useEffect(() => {
        store.dispatch(getSuperbotDirections());
    }, [])

    return (
        <div>
            <SuperbotDetails />
        </div>
    )
}

export default SuperbotDetailsPage