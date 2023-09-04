import { fetchSpaListener } from "../utils/fetchSpaListener.js";

class Page {
    constructor(App) {
        this.App = App
    }

    async handleNavBarListener() {
        if (!this.App.homeLink) {
            this.App.homeLink = document.querySelector('a')
            fetchSpaListener(this.App.homeLink, this.App)
        }
    }
}

export default Page;