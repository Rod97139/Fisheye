class Media {
    constructor(data) {
        data && Object.assign(this, data);
    }

    get file() {
        // si null
        return this.image ?? this.video;
    }

    get bigFile() {
        const file = this.image ? this.image.split(".")[0]+"_xl.jpg" : this.video;
        return file;
    }
}

export default Media;