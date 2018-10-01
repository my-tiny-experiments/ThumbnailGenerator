import AbstractValidator from './../Core/AbstractValidator.js'

/**
 * Class FileSizeValidator
 * 
 * a validator class responsible for validating file size rules.
 * every rule function should either return true for success
 * the validation or return the error string if unsuccess. 
 * TODO: to create an error dictionary and stop sending
 * errors as string
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class FileSizeValidator extends AbstractValidator {
    constructor (parser) {
        super()
        this.parser = parser
    }

    min (size) {
        let fileSize = this.parser.getFileSize()
        if(fileSize < size) {
            return `file size should be more than ${size}`
        }
        return true
    }

    max (size) {
        let fileSize = this.parser.getFileSize()
        if (fileSize > size) {
            return `file size should not excede ${size}`
        }
    }
}
