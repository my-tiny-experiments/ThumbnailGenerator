import FileSizeValidator from './../Validators/FileSizeValidator.js'

/**
 * Class ValidatorManager
 *
 * this singlton class is responsible of managing all validators
 * I use singlton because I want single management point for
 * all validators, so developer can extends the builtin
 * validators, by just calling validator(name, class)
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class ValidatorsManager {
    
    /**
     * @constructs ValidatorsManager
     */
    constructor () {
        this.validators = {}
        this.init()
    }

    /**
     * Init
     *
     * add the default built in validators
     */
    init () {
        this.addValidator ('size', FileSizeValidator)
    }

    /**
     * @member {Validator}
     * @static
     */
    static get instance () {
        return this.theInstance
    }

    /**
     * @member {ValidatorManager}
     * @static
     */
    static set instance (theInstance) {
        this.theInstance = theInstance
    }

    /**
     * Get Instance
     *
     * @return {ValidatorsManager}
     */
    static getInstance () {
        if (! this.theInstance) {
            this.theInstance = new ValidatorsManager()
        }

        return this.theInstance
    }

    /**
     * Validator
     *
     * this method is as shortcut of creating or getting a validator
     * I used it instead of writing getInstance.getValidator every
     * time I want to get a validator.
     *
     * @param {String} name
     * @param {Validator=} validator
     * @return {Validator}
     */
    static validator (name, validator) {
        if (! validator) {
            return this.getInstance().getValidator(name)
        } else {
            return this.getInstance().addValidator(name, validator)
        }
    }

    /**
     * Add Validator
     *
     * @param {String} name
     * @param {Validator} validator
     * @return {ValidatorsManager} for chaining
     */
    addValidator (name, validator) {
        this.validators[name] = validator
        return this
    }

    /**
     * Get Validator
     *
     * @param {String} name
     * return {Validator}
     */
    getValidator (name) {
        return this.validators[name]
    }
}
