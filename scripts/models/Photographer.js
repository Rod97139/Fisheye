class Photographer {
    constructor(data) {
        // condition if ternaire pour vérifier si data existe
        data && Object.assign(this, data);
    }

    get name() {
        return this.name;
    }

    get id() {
        return this.id;
    }

    get city() {
        return this.city;
    }

    get country() {
        return this.country;
    }

    get tagline() {
        return this.tagline;
    }

    get price() {
        return this.price;
    }

    get tags() {
        return this.portrait;
    }
}