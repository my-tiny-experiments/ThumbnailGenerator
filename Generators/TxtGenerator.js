import AbstractGenerator from './../Core/AbstractGenerator.js'

/**
 * Class TxtGenerator
 *
 * get thumbnail from any text file
 *
 * @author Hassan Salem <h.salem7788@gmail.com>
 */
export default class TxtGenerator extends AbstractGenerator {
    constructor (file) {
        super(file)
    }

    generate (onDone) {
        this.parse(this.file, result => {
            let text = atob(result.split(',')[1]);
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            this.wrapText(context, text, 0, 10, 220, 22);
            onDone(context.canvas.toDataURL());
        });
    }

    wrapText (context, text, x, y, maxWidth, lineHeight) {
        let words = text.split(' ');
        let line = '';

        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }
}
