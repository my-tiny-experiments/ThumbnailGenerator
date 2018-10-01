

# Thumbnail Generator
this library is for generating thumbnail from different sources.
Iit is not an actual generator as much as it is a generator manager or wrapper.

> note that this should be an npm package, so the installation isntructions would be npm install hassanalisalem/ThumbnailGenerator
> but I will not add it to npm now, I need to add tests and rearrange folder structure.
> Knowing that all instructions here I supposed it is an npm package as in import Generatorm from 'ThumbnailGenerator'
> but instead you should put the full path to the ThumbnailGenerator library.

First the Handle class
Handle class is the main entry point for all generation operations

 1. send the file to the handler
 2. handler will send the file to the parser to parse it
 3. parser will get the file content from an HttpRequest if it is a URL or it will get it from fileReader if it is file
 4. parser will return the content to the handler
 5. if you are validating the file handler will send the rules to the Validator factory and get the needed validators for these rules,
 6. validator factory get the relevant validator from the validators manager
 7. validator factory then create a new instance of that validator and send it back to the handler
 8. handler will validate the file and append errors to itself
 9. then handler sends the file mime type to the generator factory
 10. generator factory will get the needed generator from the generator manager
 11. then generator factory will create an instance of that generator and send back to the handler
 12. handler will use that generator to generate a thumbnail

> note that all generators should implement generate method,
> because there is no interface for Javascript, so this should be maintained manually

**this way we will never touch our code if we want to generat thumbnails for new file types later on, and this makes the library very extendable and maintanable without touching its source**


![enter image description here](https://s3-eu-west-1.amazonaws.com/staging-wamda/diagram.png)


# usage

    import Generator from 'ThumbnailGenerator'
    let generator = new Generator(file)
    // to validate:
    generator.validate({size: 'min 100 | max 1000'})
    if(generator.hasErrors()) {
	    // do whatever you want with errors array..
	    console.error(generator.errors)
	}
    generator.getThumbnail(base64Image => console.log(base64Image))
    
    // or you can use promise. TODO: let all generators return promises
    let promise = generator.getThumbnailPromiseExample(b64 => console.log(b64))
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

Then you should inform the GeneratorsManager about your new Generator, before calling getThumbnail() function

    import GeneratorsManager from 'ThumbnailGenerator'
    GeneratorsManager.generator('application/vnd.ms-powerpoint', PowerPointGenerator)

Or you can pass multiple mime to the same generator using '|'

    import GeneratorsManager from 'ThumbnailGenerator'
        GeneratorsManager.generator('application/vnd.ms-powerpoint | application/vnd.openxmlformats-officedocument.presentationml.presentation', PowerPointGenerator)


# Create new Validator
you can create custom validators by creating a class that extends AbstractValidator then implements the rules as functions

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

now to register the newly created validator you should do

    import ValidatorsManager from 'ThumbnailGenerator'
    ValidatorsManager.validator('size',  FileSizeValidator)


# Use validation
before getThumbnail() function call you can do

    generate.rules({'size': 'min 1000'})
this will run all relevant validations then it will push them to an errors array in the Handler instance.
so you can check `if(generate.hasErrors())`  before actually generating the thumbnail

