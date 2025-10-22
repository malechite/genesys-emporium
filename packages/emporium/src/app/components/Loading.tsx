import React, { useEffect, useState } from 'react';
import { Progress } from 'reactstrap';

export const Loading = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(prev => prev + 4), 100);
        return () => {
            clearInterval(timer);
            setTime(100);
        };
    }, []);

    return (
        <div className="text-center mt-5">
            <h1>LOADING</h1>
            <Progress
                animated
                className="w-50 mx-auto"
                value={time}
            />
            <div>
                Comments? Questions? Concerns?<br />
                <a href="https://discord.gg/wc7BGW5">Join our Discord!</a>
            </div>
        </div>
    );
};
