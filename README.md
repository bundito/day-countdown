# Day Countdown card

A simple Lovelace card for displaying a countdown until a certain date. Other than that, it doesn't do much. It's got a few options you can experiment with, however.

## Usage

Copy the `day-countdown.js` file into your `<config>/www` directory.

In your `ui-lovelace.yaml` file, add the following at the beginning of the file:

    - url: /local/day-countdown.js
        type: js
        
Using the card is simple. The only required parameter is `date`.

    - type: "custom:day-countdown"
      date: "02 February 2019"
      
This will generate the most basic card:



`date` can be provided in either American or European format, with the month spelled out (or abbreviated). All of these are equivalent:
- Apr 25 2019
- 25 Apr 2019
- April 25, 2019
- 25 April 2019
**Note:** All-numeric dates (i.e. 04/25/19) are not supported at the moment. Javascript has a complicated relationship with dates. I'm working on it.

## 
