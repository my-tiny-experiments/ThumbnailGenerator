export default class CannotFindGeneratorError extends Error {

    constructor (...args) {
        super(...args)
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, CannotFindGeneratorError)
        }
    }
}
