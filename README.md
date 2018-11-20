# Day Countdown card

A simple Lovelace card for displaying a countdown until a certain date. Other than that, it doesn't do much. It's got a few options you can experiment with, however.

## Usage

Copy the `day-countdown.js` file into your `<config>/www` directory.

In your `ui-lovelace.yaml` file, add the following at the beginning of the file:

    - url: /local/day-countdown.js
      type: js
        
        
### date:

Using the card is simple. The only required parameter is `date`.

    - type: "custom:day-countdown"
      date: "July 16 2019"
      
This will generate the most basic card:



`date` can be provided in either American or European format, with the month spelled out (or abbreviated). All of these are equivalent:
- Apr 25 2019
- 25 Apr 2019
- April 25, 2019
- 25 April 2019

**Note:** All-numeric dates (i.e. 04/25/19) are not supported at the moment. Javascript has a complicated relationship with dates. I'm working on it.

### title 
Adding the `title` parameter allows you to, well, change the title of the card.

 - type: "custom:day-countdown"
   date: "July 16 2019"
   title: Anniversary
    
### icon
If you want a cute calendar icon, add in the `icon_size` parameter. You can choose the size, `small`, `medium`, or `large`.

#### small
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: small
    
    
#### medium
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: medium
    
    
#### large
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: large
    
### icon_url
And finally, if you wish, you can add a link to the calendar icon. The link has no special formatting and is not checked for validity. That's up to you.

    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: large
      icon_url: https://en.wikipedia.org/wiki/July_16
