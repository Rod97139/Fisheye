class Media {
    constructor(data) {
        data && Object.assign(this, data);
    }

    get file() {
        // si null
        return this.image ?? this.video;
    }
}

export default Media;