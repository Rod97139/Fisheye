export const sortBy = (arrayOfObjects, prop) => {
    arrayOfObjects.sort((a, b) => {
        return a[prop] > b[prop] ? 1 : -1;
    });
    }