import GeneratorFactory from './GeneratorFactory.js'
import ValidatorFactory from './ValidatorFactory.js'
import Parser from './Parser.js'

/**
 * Class Handler is the class to be extended when a client wants 
 * to access this library, so if a developer wants to use his
 * own entrypoint, so his entrypoint should extends Handler
 *
 * TODO: to change the way of thumbnail constructing
 * so not to send the file in the constructor, but
 * send it to the generate function instead.
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class Handler {

    /**
     * @constructs Handler
     * @param {string|File} file file url or object
     */
    constructor (file) {
        this.file = file
        this.errors = []
        this.parser = new Parser(file)
    }

    /**
     * validate
     *
     * validate function is responsible for getting the rules from
     * the client, and passing them to their related validator
     *
     * @param {Object} rules
     * #### example
     *      {size: 'min 10 | max 100'}
     * @return Handler
     */
    validate (rules) {
        for (let rule in rules) {
            let validator = this.getValidator(rule, this.parser)
            validator.validate(rules[rule])
            if(validator.errors) {
                this.errors.push(validator.errors)
            }
        }
        return this
    }

    /**
     * Has Errors
     *
     * check if validation produce some errors
     *
     * @return {Boolean}
     */
    hasErrors () {
        return this.errors > 0
    }

    /**
     * Get Validator
     *
     * @param {String} rule rule name
     * @return {Validator}
     */
    getValidator (rule) {
        return ValidatorFactory.make(rule, this.parser)
    }

    /**
     * Get Generator
     *
     * @return Generator
     */
    getGenerator () {
        let fileContentType = this.getFileContentType()
        let generator = GeneratorFactory.make(fileContentType, this.file)
        return generator
    }

    /**
     * Generate
     *
     * a shortcut for getGenerator().generate...
     * @param {File|String} file
     * @param {Function} callback
     */
    generate (file, callback) {
        let generator = this.getGenerator()
        return generator.generate(callback)
    }

    /**
     * Get File Content-Type
     *
     * @return {String} Content-type
     */
    getFileContentType () {
        return this.parser.getFileContentType()
    }
}
