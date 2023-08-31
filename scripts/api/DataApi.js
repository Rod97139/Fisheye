class DataApi {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return await fetch(this._url)
            .then(res => res.json())
            .catch(err => console.log('an error occurs', err))
    }
}

export default DataApi