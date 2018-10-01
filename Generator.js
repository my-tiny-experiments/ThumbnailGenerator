import HTTPRequest from './Core/HTTPRequest.js'
import Parser from './Core/Parser.js'
import Handler from './Core/Handler'

/**
 * Class Generate is the library entrypoint
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class Generator extends Handler {
    constructor (file) {
        super(file)
    }

    /**
     * Get Thumbnail Promise Example
     *
     * TODO: I should change all thumb generation to promises
     * but I used this so when I want to use await or when
     * I want to just return a promise. but for now all
     * of the converters are written as callbacks.
     *
     * @param {Function} callback
     * @return {Promise}
     */
    getThumbnailPromiseExample (callback) {
        return new Promise ((resolve, reject) => {
            this.validate({
                size: 'min: 110000 | min: 100000'
            }).generate(this.file, (...args) => {
                resolve(...args)
            })
            console.log(this.errors)
        })
    }

    /**
     * Get Thumbnail
     * TODO: to use promises :)
     *
     * generate the thumbnail from the file just sent.
     * developer could use generate from the Parnet 
     * but, I put it here because I want to show
     * how to modify the Handler behavior
     * @param {Function} callback
     */
    getThumbnail (callback) {
        this.generate(this.file, callback)
    }
}
