export class QRService {
    constructor() {
        this.API_URL = "https://api.qrserver.com/v1/create-qr-code/";
    }
    generateURL(url) {
        return `${this.API_URL}?size=480x480&data=${encodeURIComponent(url)}`;
    }
}
