import Parser from './../Core/Parser.js'

/**
 * Class AbstractGenerator is the class to extend when the
 * client wants to create a new thumbnail generator. 
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class AbstractGenerator {

    /**
     * @constructs AbstractGenerator
     *
     * @param {String | File} file
     */
    constructor (file) {
        this.file = file
    }

    /**
     * Set Parser
     *
     * Sets a new parser for the generator
     *
     * @param {Parser} parser
     */
    setParser (parser) {
        this.parser = parser
    }

    /**
     * Get Parser
     *
     * @return {Parser} parser
     */
    getParser () {
        return this.parser
    }

    /**
     * Parse
     *
     * Do the actual parsing of a file
     * 
     * @param {String | File} file
     * @param {function} callback
     */
    parse (file, callback) {
        let parser = new Parser(file)
        parser.parse(callback)
    }

    /**
     * Generate
     *
     * To remind the developer to implement generate function inside
     * his generator, because javascript has no built in interfaces
     */
    generate () {
        // throw error that generate shoudl be implemented
        console.error('implement generate')
    }
}
