import ValidatorsManager from './ValidatorsManager.js'

/**
 * Class ValidatorFactory is the class responsible of
 * instantiating objects based on validator name
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class ValidatorFactory {

    /**
     * Instantiate an instance of Generators based on its name
     *
     * @return {Object} a generator object
     */
    static make (validatorName, ...args) {

        let Validator = ValidatorsManager.validator(validatorName)

        return new Validator(...args)
    }
}
