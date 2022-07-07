Welcome to the magic button!

This button will use automated A/B testing to optimize your button.

Quick Start:

1. Place the following script in the header of the page you wish to load the magic button on:
<script src="https://eitanwaxman.github.io/magic-button/magic-button.js" defer> </script>

2. Initialize a button:
    
    const button = new MagicButton();

    const magicButtonInit = async () => {
        let id = await button.init();
        console.log(id);
    };

    //after initialization you can remove the above code. Make note of the id that returns, this will be used when you load your button.

3. Load your button:

    const button = new MagicButton();

    button.load(id)

    document.body.append(button) //append the button to the element of your choice

4. Test Away!

Without customization the button will run default tests - height, width, font-size, border-radius
With customization you can add tests for background-color and text

Advanced - customization:

There are several aspects of the MAgic Button that can be customized.
Customization happens at the initialization stage. 
A fully customized initialization looks like this:


 let id = await button.init(
     textOptions,
     colorOptions,
     startStyles,
     lockedStyles,
     sampleSize
   );

textOptions: Array of Strings - these are the text values you want your button to test.
example:
["Click Here", "Learn More", "Buy Now"]

colorOptions: Array of valid CSS color Strings (keyword/ rgba value/ hex) - these are the colors you want your button to test.

example:
["blue", "green", "rgba(150,150,150)", "#a52a2a"]

startStyles: Object of CSS values and properties - this defines the style your button will start testing with.
example:
 {
  height: "70px",
  width: "200px",
  "background-color": "lightblue",
  "border-radius": "10px",
  "font-size": "2em",
  cursor: "pointer",
  }
  note that the values must be in string format, as well as keys that are kabab-cased.

lockedStyles: Object of CSS values and properties - this locks certain css properties so that they will not be altered in the course of the testing.

sampleSize: Number - the number of times a button should be loaded before a test is considered complete and the A/B test is run.
The larger the sample size, the more accurate the test. This should be adjusted based on your traffic size.



