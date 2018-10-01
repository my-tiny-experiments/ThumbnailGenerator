

# Thumbnail Generator

![diagram](https://s3-eu-west-1.amazonaws.com/staging-wamda/diagram.png)
this library is for generating thumbnail from different sources.
it is not an actual generator as much as it is a generator manager or wrapper.


# usage

    import Generate from 'ThumbnailGenerator'
    let generate = new Generate(file)
    let promise = generate.getThumbnail()
    promise.then(base64Image => console.log(base64Image))

# Creating New Generator

    import AbstractGenerator from 'ThumbnailGenerator'
    export default class PowerPointGenerator extends AbstractGenerator {
	    generate (onDone) {
		    this.parse(this.file, result => {
				// do the logic of power point generator
			}
		}
    }

then you should inform the GeneratorsManager about your new Generator, before calling getThumbnail() function

    import GeneratorsManager from 'ThumbnailGenerator'
    GeneratorsManager.generator('application/vnd.ms-powerpoint', PowerPointGenerator)

or you can pass multiple mime to the same generator using '|'

    import GeneratorsManager from 'ThumbnailGenerator'
        GeneratorsManager.generator('application/vnd.ms-powerpoint | application/vnd.openxmlformats-officedocument.presentationml.presentation', PowerPointGenerator)


# Create new Validator
you can create custome validators by creating a class that extends AbstractValidator then implements the rules as functions

    import AbstractValidator from 'ThumbnailGenerator'
    export default class FileSizeValidator extends AbstractValidator {
	    constructor(parser) {
		    super()
		    this.parser = parser
		}
		
    	min (size) {
    		if(this.parser.getFileSize() < size) {
	    		return 'error...'
    		}
    		return true
    	}
    }

now to do some validations on files before generating thumbnails you can do

    import ValidatorsManager from 'ThumbnailGenerator'
    ValidatorsManager.validator('size',  FileSizeValidator)


# Use validation
before getThumbnail() function call you can do

    generate.rules({'size': 'min 1000'})
this will run all relevant validations then it will push them to an errors array in the Handler instance.
so you can check `if(generate.errors)` 

