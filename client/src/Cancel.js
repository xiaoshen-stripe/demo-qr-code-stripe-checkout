import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (<div className="cancel">
        <h2 className="cancel-msg">Your order was incomplete.</h2>
        <Link to="/">
            <button>Please try again</button>
        </Link>
    </div>);
}

export default Cancel;