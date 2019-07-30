export default class Color {

    constructor(name, code) {

        this.name = name;
        this.code = code;

    }

    properties() {
        return {
            name: this.name,
            code: this.code
        }
    }
}
