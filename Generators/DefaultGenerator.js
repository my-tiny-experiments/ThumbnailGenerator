import AbstractGenerator from './../Core/AbstractGenerator.js'

/**
 * Class DefaultGenerator
 *
 * is the default generator to be used if the file we are
 * trying to get its thumbnail has no generator. what
 * this class does is just return a default image
 * it could be a file icon or not found icon..
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class DefaultGenerator extends AbstractGenerator {
    constructor (file) {
        super(file);
    }

    generate (onDone) {
        this.parse(this.file, (result) => {
            onDone('/assets/images/defaults/file.svg');
        });
    }
}
