import AbstractGenerator from './../Core/AbstractGenerator.js'

export default class PdfGenerator extends AbstractGenerator {
    constructor (file) {
        super(file)
    }

    generate (callback) {
        this.parse(this.file, content => {
            callback(content)
        })
    }
}
