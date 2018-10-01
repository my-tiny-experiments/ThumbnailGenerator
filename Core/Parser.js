import HTTPRequest from './HTTPRequest.js'
import NoFileError from './../Errors/NoFileError.js'

/**
 * Class Parser is the class responsible for file parsing
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class Parser {

    /**
     * @constructs Parser
     */
    constructor (file) {
        this.file = file
    }

    /**
     * parse
     *
     * parse will check for the type of the resource it gets
     * parse can parse remote files from their urls and
     * it can parse local file from its resource.
     *
     * @param {Function} callback(@param {String} file content)
     */
    parse (callback) {
        if (typeof this.file == 'string') {
            this.parseRemoteFile(callback)
        } else {
            this.parseLocalFile(callback)
        }
    }

    /**
     * Get File Content Type
     *
     * this function can get the content type of file from its url
     * or the file resource itselfe, if the file sent is a url
     * it will do a HEAD request to that url then it will
     * read the Content-Type response header. But if
     * the file is a local file it will just get
     * the file.type property
     *
     * @return {String} Content-Type as "application/pdf"
     * @throws {NoFileException}
     */
    getFileContentType () {
        if(! this.file) {
            throw new NoFileError('File cannot be null', 'Core/Parser.js')
        }

        if (typeof this.file == 'string') {
            return this.getRemoteContentType()
        } else {
            return this.getLocalContentType()
        }
    }

    /**
     * Get Remote Head
     *
     * execute HEAD request to get information about the requested url
     * @param {String} head http response headers key
     * @return {String}
     */
    getRemoteHead (head) {
        let httpRequest = new HTTPRequest(
            this.file,
            {method: 'HEAD', responseType: 'text'},
            false
        )

        let response = httpRequest.execute()
        let headValue = response.getResponseHeader(head)
        return headValue
    }

    /**
     * Get Remote Content Type
     *
     * This function will do the actual HEAD request
     * to a given resource in order to get its type
     *
     * @return {String} Content-Type
     */
    getRemoteContentType () {
        let contentType = this.getRemoteHead('content-type')
        if (contentType) {
            return contentType
        } else {
            return 'text/plain'
        }
    }

    /**
     * Get Local Content Type
     *
     * get the File object type attribute
     *
     * @return {String} Content-Type
     */
    getLocalContentType () {
        return this.file.type || 'text/plain'
    }

    getFileSize () {
        if (typeof this.file == 'string') {
            return this.getRemoteFileSize()
        } else {
            return this.getLocalFileSize()
        }
    }

    /**
     * get a remote file size
     *
     * @return {String}
     */
    getRemoteFileSize () {
        this.getRemoteHead('content-length')
    }

    /**
     * Get Local File Size
     *
     * @return {String}
     */
    getLocalFileSize () {
        return this.file.size
    }

    /**
     * Parse Local File
     *
     * Parse the local file resource into base64 string
     *
     * @param {Function} onloadCallback(@param {String} base64 content)
     */
    parseLocalFile (onloadCallback) {
        let fileReader = new FileReader()
        fileReader.onError = () => {
            fileReader.abort()
            throw new Error ('cannot parse the file')
        }

        fileReader.onload = () => {
            onloadCallback(fileReader.result)
        }

        fileReader.readAsDataURL(this.file)
    }

    /**
     * Parse Remote File
     *
     * This will request a remote file by its url and get the content
     * then convert that content to base64 string
     *
     * @param {Function} onloadCallback(@param {String} base64)
     * @param {Object} Settings
     */
    parseRemoteFile (onloadCallback, settings = {}) {
        let httpRequest = new HTTPRequest(this.file, settings)

        httpRequest.response(httpObject => {
            let uInt8Array = new Uint8Array(httpObject.response)
            let base64 = this.uInt8ArrayToBase64(uInt8Array)

            onloadCallback(
                'data:' +
                httpObject.getResponseHeader('content-type') +
                ';base64, ' +
                base64
            )
        })
    }

    /**
     * Uint8Array to Base64
     *
     * converts Uint8Array to base64 string
     *
     * @param {Uint8Array} uInt8Array
     * @return {String} base64 string
     */
    uInt8ArrayToBase64 (uInt8Array) {
        let i = uInt8Array.length;
        let binaryString = new Array(i);
        while (i--) {
            binaryString[i] = String.fromCharCode(uInt8Array[i]);
        }
        let data = binaryString.join('');
        let base64 = btoa(data);
        return base64
    }
}
