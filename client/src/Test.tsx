import React from 'react';
import { Route, RouteComponentProps } from 'react-router';


//type Props = {setLogin: Function};
//type LoginProps = Props & RouteComponentProps<{}>;

interface TestProps extends RouteComponentProps {
    t: Function
}

const Test: React.FC<TestProps> = (props) => {
    return (
        <p onClick={() => {console.log(props)}}> test </p>
        )
    }
;

export default Test