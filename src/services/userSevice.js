import {generateRandomColorForUser} from '../helpers/utils';

// array in the local storage for all of the registered users
const getAllUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const users = getAllUsers();

// login attempt event
const login = (username, password) => {
    const filteredUsers = users.filter(user => user.password === password && user.username === username)
    if (filteredUsers.length) {
        const authUser = filteredUsers[0];
        localStorage.setItem('authUser', JSON.stringify(authUser));
        return {success: true, authUser};
    } else {
        // user not found
        const error = 'Username/password is incorrect';
        return {success: false, error};
    }
};

// logout event
const logout = () => {
    localStorage.removeItem('authUser');
};

// register new user event
const register = newUser => {

    // check if user with the same username already exist
    const existingUser = users.filter(user => user.username === newUser.username).length;
    if (existingUser) {
        const error = `Username ${newUser.username} is already exist`;
        return {success: false, error};
    };

    // save the new user
    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
    newUser.color = generateRandomColorForUser();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return {success: true}
};

export const userService = {login, logout, register, getAllUsers};