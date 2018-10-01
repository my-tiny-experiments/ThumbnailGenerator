import SettingsErrors from './../Errors/SettingsErrors.js'
import GeneratorsManager from './GeneratorsManager.js'

/**
 * Class GeneratorFactory is the class responsible of
 * instantiating objects based on generators name
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class GeneratorFactory {

    /**
     * Instantiate an instance of Generators based on its name
     *
     * @return {Object} a generator object
     */
    static make (generatorName, ...args) {
        if (! generatorName) {
            //TOFIX
            //throw new SettingsErrors.missingGeneratorName()
        }

        let Generator = GeneratorsManager.generator(generatorName)

        return new Generator(...args)
    }
}
