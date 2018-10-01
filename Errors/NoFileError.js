export default class NoFileError extends Error {

    constructor (...args) {
        super(...args)
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, NoFileError)
        }
    }
}
