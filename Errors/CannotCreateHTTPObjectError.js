export default class CannotCreateHTTPObjectError extends Error {

    constructor (...args) {
        super(...args)
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, CannotCreateHTTPObjectError)
        }
    }
}
