# Team 30 Marking comments

## Overall Comments

Great job so far! Mainly a few minor nitpicks, but nothing too major.

I liked the fairly consistent visual style, although it could use a little more polish. There are a few weird UI issues I have though.
First off, no need to create an alert after a login. Users aren't used to seeing the `alert` textbox and it's jarring and scary. 

Most of the other issues are in the tank view. The 'See you goals' button should be more prominent rather than off to the right. Maybe you should have the goals show up by default, so when the user closes it, they know where the button goes. This is a very minor issue though. Hovering over a decor item at just the right spot causes it to flash as it moves up and down in flow. This could potentially cause seizures for people with epilepsy, and could have been better implemented as an out-of-flow tooltip. As well, controlled zooming of the tank could work really well, otherwise it is hard to see all the decorations once they have accumulated.

The profile view is a little weird as well. I expected it to be a view rather than a modal since all the other buttons to the left were full views. As well, the editing UI doesn't seem fully fleshed out. Can someone edit their age with their country? That needs some work.

Code wise, there are a few organizational issues. Your components folder could do with some cleaning up. Grouping files together by component is a good strategy. More importantly, you should reconsider your use of three different, separate styling solutions. You are only using Sass for a single file, while combining CSS-in-JS and regular CSS is bad enough already. See if you can unify your styling solution to use only CSS-in-JS for example.

## Instructions

* Very clear, I was able to get set up and running really quick
* Could be very slightly improved, missing required node version.

## Code organization

* `components` folder could be cleaned up instead of having everything under one directory
* Be consistent with your function syntax. Arrow functions and traditional `function` expressions **have diferent semantics**. 
  * Stick to one type, a new codebase should not look like a legacy codebase in transition.
* Be consistent with your styling solution. 
  * I count three different styling solutions in your project right now.
  * Is taking a dependency on Sass really worth it for a single navbar component?

## Example Data
* Overall representative of use
* Profile input "24yyyyy, 🇨🇦" is weird. (-0.5 marks)

## Layout and clarity
* Consistent visual language is good, could use a little more polish.
* Squidward's house might constitute copyright infringement 
  * (no marks off for this :p)
* 'See your goals' button is not visually prominent enough in 'Tank' view. 
  * This makes the 'Tank' view a little unclear in purpose (-1 mark)
  
## Usability and UX
* A few violations of the [Principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).
  
* `alert()` textbox after login is surprising.
* Hovering over a decor item in the tank is a health hazard for people with epilepsis. 
  * Moving the decor item in flow with the pop up will cause flashing.
  * Better to have implemented this as a tooltip.
* Zooming in and out the tank is cool but..
  * zoom is uncontrolled so if I move to another view I'm too zoomed out
  * Would be nice if that view only zoomed the tank
  * If I don't zoom and out, I can't see all the decorations if I have many goals.
* Profile view was a modal, I expected a view because all the other buttons lead to views.
  * If the profile has to be view, move the button elsewhere so it is clear that the interaction is different. 
* Overall very good though!
  
## Benefit
* Consistent with proposal, I can easily see the benefits as outlined therein.
