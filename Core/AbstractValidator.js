/**
 * Class AbstractValidator
 *
 * this class should be the parent class for every validator we will make
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class AbstractValidator {

    /**
     * Validate
     *
     * this method go through all validation rules inside
     * the rules string, and parse their arguments then
     * call the needed function on its parent instance
     *
     * @param {String} rulesString
     * #### example
     *      "min 10 | max 100"
     */
    validate (rulesString) {
        let rules = this.splitTrim(rulesString, '|')
        this.errors = []
        for (let rule of rules) {
            let functionName = this.getFunctionName(rule)
            let functionArgs = this.getFunctionArguments(rule)
            let theFunction = this[functionName]
            if (theFunction) {
                let result = theFunction.call(this, ...functionArgs)
                if (result !== true) {
                    this.errors.push(result)
                }
            } else {
                // TODO: to throw an exception
                console.warn (functionName + ' is not defined')
            }
        }

    }

    splitTrim (text, delimiter) {
        return text.split(delimiter).map(item => item.trim())
    }

    getFunctionName (rule) {
        return rule.substring(0, rule.indexOf(' ')).replace(':', '')
    }

    getFunctionArguments (rule) {
        return rule.substring(rule.indexOf(' '))
            .trim()
            .split(',')
            .map(item => item.trim())
    }
}
