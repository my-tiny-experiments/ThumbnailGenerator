import DefaultGenerator from './../Generators/DefaultGenerator.js'
import ImgGenerator from './../Generators/ImgGenerator.js'
import PdfGenerator from './../Generators/PdfGenerator.js'
import TxtGenerator from './../Generators/TxtGenerator.js'

/**
 * Class GeneratorsManager
 *
 * this singlton class is responsible of managing all generators
 * I use singlton because I want single management point for
 * all generators, so developer can extends the builtin
 * generators, by just calling generator(name, class)
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class GeneratorsManager {
    
    /**
     * @constructs GeneratorsManager
     */
    constructor () {
        this.generators = {}
        this.init()
    }

    /**
     * Init
     *
     * add the default built in generators
     */
    init () {
        this.addGenerator ('application/pdf', PdfGenerator)
        this.addGenerator ('defaultGenerator', DefaultGenerator)
        this.addGenerator ('text/plain | text/csv', TxtGenerator)
        this.addGenerator ('image/jpeg | image/gif | image/png | image/jpg', ImgGenerator)
    }

    /**
     * @member {GeneratorManager}
     * @static
     */
    static get instance () {
        return this.theInstance
    }

    /**
     * @member {GeneratorManager}
     * @static
     */
    static set instance (theInstance) {
        this.theInstance = theInstance
    }

    /**
     * Get Instance
     *
     * @return {GeneratorsManager}
     */
    static getInstance () {
        if (! this.theInstance) {
            this.theInstance = new GeneratorsManager()
        }

        return this.theInstance
    }

    /**
     * Generator
     *
     * Get or set generator; this function has two usages first
     * is to get a generator and the second is to set one.
     *
     * PS: this function is a shortcut, its confusing
     * to have one function that does multple tasks
     * but its just a shourtcut, and dev can use
     * setGenerator and getGenerator instead
     *
     * @param {String} name
     * @param {Class=} generator
     * @return Generator
     */
    static generator (name, generator) {
        if(generator) {
            return this.getInstance().addGenerator(name, generator)
        } else {
            return this.getInstance().getGenerator(name)
        }
    }

    /**
     * Add Generator
     *
     * add new generator by name
     *
     * @param {String} name generator unique name
     * @param {Class} generator
     * @return {GeneratorsManager} for chaining support
     */
    addGenerator (name, generator) {
        let names = name.split('|').map(item => item.trim())

        if (names.length > 0) {
            names.forEach(item => {
                this.generators[item] = generator
            })
        }

        return this
    }

    /**
     * Get Generator
     *
     * get generator by name
     *
     * TODO: throw an exception if generator not found
     *
     * @param {String} name
     * @return {Generator}
     */
    getGenerator (name) {
        if (this.generators[name]) {
            return this.generators[name]
        } else {
            return DefaultGenerator
        }
    }
}
