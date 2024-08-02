const ensureLoggedIn = (currUser) => {
    if (!currUser) {
        throw new Error('You must be logged in to view this page');
    }
    return null;
}

export { ensureLoggedIn };