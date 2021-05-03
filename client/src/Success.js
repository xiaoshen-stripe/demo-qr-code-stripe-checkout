import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
// 2. retrieve session data including the receipt url 
// 3. show button with the receipt URL 
const Success = () => {

    const [sessionData, setSessionData] = useState(null);
    // 1. Get the session Id from the url 
    // https://reactrouter.com/web/example/query-parameters

    const useQuery = () => new URLSearchParams(useLocation().search);
    const sessionId = useQuery().get("session_id");


    useEffect(() => {
        const fetchSessionData = async () => {
            const queryParams = new URLSearchParams({
                id: sessionId,
            });
            // https://stackoverflow.com/a/58437909
            const sessionData = await fetch('/get-checkout-session?' + queryParams).then(res => res.json());
            setSessionData(sessionData);
        }

        fetchSessionData();
    }, [sessionId]);

    return (
        <div className="success">
            <h2 className="success-msg">Your order will be ready soon!</h2>
            { sessionData && (<a href={sessionData.payment_intent.charges.data[0].receipt_url} target="_blank" rel="noreferrer">
                <button>View Receipt</button>
            </a>)}
        </div>
    )
};

export default Success;