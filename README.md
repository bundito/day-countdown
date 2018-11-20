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


![countdown](/countdown.png)


`date` can be provided in either American or European format, with the month spelled out (or abbreviated). All of these are equivalent:

    - Jul 16 2019
    - 16 Jul 2019
    - July 16, 2019
    - 16 july 2019

**Note:** All-numeric dates (i.e. 04/25/19) are not supported at the moment. Javascript has a complicated relationship with dates. I'm working on it.

### title 
Adding the `title` parameter allows you to, well, change the title of the card.

  - type: "custom:day-countdown"
    date: "July 16 2019"
    title: Anniversary
    
![title](/title.png)
    
### icon
If you want a cute calendar icon, add in the `icon_size` parameter. You can choose the size, `small`, `medium`, or `large`.

#### small
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: small
    
![small](/small.png)
    
#### medium
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: medium
    
![medium](/medium.png)
    
#### large
    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: large
      
![large](/large.png)
    
### icon_url
And finally, if you wish, you can add a link to the calendar icon. The link has no special formatting and is not checked for validity. That's up to you.

    - type: "custom:day-countdown"
      date: "July 16 2019"
      title: Anniversary
      icon_size: large
      icon_url: https://en.wikipedia.org/wiki/July_16

## Notes & Attribution
This card is more of a learning exercise for me, but it's fully functional and I intend to use it. As with all free software, you're welcome to revise or remix it in any way you wish. I may add more features later on, but for now, what you see is what you get. Enjoy.

The calendar icon was made by Freepik from www.flaticon.com 
