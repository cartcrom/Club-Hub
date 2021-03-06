import React from 'react';
import API from '../services/api'
import { RouteComponentProps } from 'react-router';

const VerificationPage: React.FC<RouteComponentProps<{id : string}>> = (props) => {

    const id = props.match.params.id;
    API.verifyUser(id, () => props.history.push('/login'), (err : any) => alert(err))

    return(
        <div></div>
    )
}

export default VerificationPage;