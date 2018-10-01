import AbstractGenerator from './../Core/AbstractGenerator.js'

/**
 * Class ImgGenerator
 *
 * is just converting the image to base64 string to be
 * shown in an image tag, because images do not need
 * to be converted to image as the rest of files.
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class ImgGenerator extends AbstractGenerator {
    constructor (file) {
        super(file)
    }

    generate (callback) {
        this.parse(this.file, content => {
            callback(content)
        })
    }
}
