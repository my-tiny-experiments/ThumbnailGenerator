import HTTPObjectFactory from './HTTPObjectFactory.js'

/**
 * Class HTTPRequest
 *
 * this class is responsible of creating HTTP request
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class HTTPRequest {

    /**
     * @constructs HTTPRequest
     *
     * @param {String} url
     * @param {Object} settings
     * @param {Boolean} async
     */
    constructor (url, settings = {}, async = true) {
        this.httpObject = HTTPObjectFactory.make()
        this.async = async
        this.prepare(url, settings)
    }

    /**
     * Prepare
     *
     * prepare the HTTPObject settings
     *
     * @param {String} url
     * @param {Object} settings {responseType: '', headers: {}}
     */
    prepare (url, settings) {
        this.method = settings.method || 'GET'
        this.httpObject.open(this.method, url, this.async)
        if (this.async) {
            this.httpObject.responseType = settings.responseType || 'arraybuffer'
        }

        if (settings.headers) {
            for (let header in settings.headers) {
                this.httpObject.setRequestHeader(header, settings.headers[header])
            }
        }
    }

    /**
     * Execute
     *
     * sends the actual request
     *
     * @param {Function} callback(@param {HTTPObject})
     * @return {HTTPObject}
     */
    execute (callback) {
        let httpObject = this.httpObject
        httpObject.onreadystatechange = (e) => {
            if (httpObject.readyState == 4 && (httpObject.status == 200)) {
                if(callback) {
                    callback(httpObject)
                }
            } else if (httpObject.readyState == 4 && httpObject.status != 200) {
                // throw error
            }
        }
        this.httpObject.send(this.method)
        return httpObject
    }

    /**
     * Response
     *
     * Interface to execute
     *
     * TODO: to return a promise
     *
     * @param {Function} callback
     * @return {HTTPObject}
     */
    response (callback) {
        return this.execute(httpObject => {
            callback(httpObject)
        })
    }

}
