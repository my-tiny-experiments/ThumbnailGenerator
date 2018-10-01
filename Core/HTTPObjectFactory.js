/**
 * Class HTTPObjectFactory
 *
 * This class is a factory for the httpobject
 * I used this instead of fetch url because
 * this has more browsers support than.
 *
 * TODO: check for more browser support
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class HTTPObjectFactory {

    /**
     * Make
     *
     * the factory method that creates the actual HTTPObject
     * it will try to run all factories, if the object is
     * created, it will return it else it will skip it
     *
     * @return {HTTPObject}
     */
    static make () {
        let factories = [
            () => {return new XMLHttpRequest()},
            () => {return new ActiveXObject('Msxml3.XMLHTTP')},
            () => {return new ActiveXObject('Msxml2.XMLHTTP.6.0')},
            () => {return new ActiveXObject('Msxml2.XMLHTTP.3.0')},
            () => {return new ActiveXObject('Msxml2.XMLHTTP')},
            () => {return new ActiveXObject('Microsoft.XMLHTTP')}
        ]

        for (let factory of factories) {
            try {
                return factory()
            } catch (exception) {
                continue
            }
        }
        //TODO: throw exception if no factory work
    }
}
