export const getGreetingMessage = () => {
    return ([
        'Good Night ',
        'Good Morning ',
        'Good Afternoon ',
        'Good Evening '
    ][ parseInt(new Date().getHours() / 24 * 4) ]
    );
};

export const generateRandomColorForUser = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};