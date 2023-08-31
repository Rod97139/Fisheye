class Photographer {
    constructor(data) {
        // condition if ternaire pour vérifier si data existe
        data && Object.assign(this, data);
    }
}

export default Photographer