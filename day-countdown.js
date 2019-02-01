/*
 *  Copyright (C) 2018 Scott Harvey <scott@spharvey.me>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

class DayCountdown extends HTMLElement {

// The "HASS Setter" (hass) function is triggered every time something in HA changes
// Therefore, try to keep it limited to code that has to run all the time. Move everything
// else down below, inside the 'setConfig' section.

  set hass(hass) {
    const target = this.config.date;
    function date_diff() {
      var now = new Date();
      var then = new Date(target);
      if (now < then){
		  var timeDiff = Math.abs(then.getTime() - now.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          if (then.getTime() < now.getTime()) {
            diffDays = diffDays * -1;
          }
          return diffDays;
	  }else if (then < now){
		  var timeDiff = Math.abs(now.getTime() - then.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) - 1);
          if (now.getTime() < then.getTime()) {
            diffDays = 5;
          }
          return diffDays;
	  }
		  
    }
    
    const days = date_diff();

// ---- this midsection is what gets displayed -----

    this.content.innerHTML = `
      <div align=center>
      <hr>
      <p style="font-size:20px;">${this.config.phrase}: <strong>${days}</strong></p>
      <a href="${this.config.icon_url}"><img height=${this.config.px} src="data:image/png;base64,${this.config.iconData}"</a>
      <br>
      </div>
      </ha-card>
    `;
  } // end of HASS setter

// ---- display section ends at close brace above ----


// Unlke hass, the setConfig function sets up the card and only runs when the card is first
// set up or when the config changes. 

  setConfig(config) {
    if (!config.date) {
      throw new Error('You need to provide a date or all of this is pointless!');
    } 
    this.config = config;
    
    this.config.px = 0;

    // set up "card" - Lovelace HTML element
    const card = document.createElement('ha-card');
    this.content = document.createElement('div');
    this.content.style.padding = '0 16px 16px';
    card.appendChild(this.content);
    this.appendChild(card);
    
    if (!this.config.title) {
        card.header = "Countdown";
      } else {
        card.header = this.config.title;
      }

    if (!this.config.phrase) {
	  var now = new Date();
      var then = new Date(this.config.date);
	  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      if (now < then){
        this.config.phrase = "Days Remaining";
	  }else if (then < now){
		this.config.phrase = "Days since " + then.getDay() + '/' + then.getMonth() + '/' + then.getFullYear();
	  }
    }

    // determine icon size
    var px;
    switch(this.config.icon_size) {
      case "small":
        px = 32;
        break;
      case "medium":
        px = 64;
        break;
      case "large":
        px = 128;
        break;
      default:
        px = 32;
      }

      // "hide" icon by setting it to 0px high
      if (this.config.hide_icon) {
        this.config.px = 0;
      } else {
      this.config.px = px;
      }

      // Base64-encoded PNG icons 64px high
      function getIconData(iconNum) {
        var iconData;
        iconData = [
                   "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",
                   "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",
                   "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",
                   "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",
                   "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAG7AAABuwE67OPiAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAASNQTFRF////FRUVzMzMzMzMuLi4GhcYzMzM4hsbzMvLKCYm05eXGhcYKicog4KDiomKu7u7xsbGzMfHzMzM0pub4hsb4h0d4h4e4h8f4xsb4x8f4yAg4yEh4yUl4ycn5Bwc5Ckp5C4u5Rwc5S8v5TAw5TEx5TY25jk56VRU6h4e6ldX6llZ6ltb615e619f62Nj7B8f7Gdn7Gho7Gxs7W5u7XR07nZ27nt78IqK8IyM8SEh8Y2N8ZKS8iEh8pWV8pmZ8pqa8yIi85+f86Sk9CIi9Kam9a+v9bCw9bGx9bS09rm59ry8976+98DA98HB98LC98PD+MfH+MrK+c3N+tvb+9zc/Obm/Orq/e/v/fHx/fLy/vT0/vn5/vv7//z8//39//7+////xjQ+JAAAAAt0Uk5TABjR2Nzo+Pj6+/1SEMrrAAABfElEQVRYw+3WZ0/CQBjAcfY6ypIKKEWkgoqCOHAyRVTEBcrQKjzf/1NIq9CiknJ3TTTK/w33hNwv7ZUAOp0iPUJmnUpmhPQT3/y/gME4zISQ3aiSHSHTaDBIgMU3zI2Q06eSEyH3aLD8PcDDMC41wMUwnokAdhoBNnLAJgFecsCrDeCYI84hAVY/cVbNgOAaQUEFECltYVeKKIEc/uXnZsC0AM9TAtksJVCv0wGcIHBUQAYgQwVUAao0QKgL0A1RAEkYlKQAyiJQpgBaItDCBcKFi49qIFUbzoXwdFcQvYZvu4lOewvswevX7b1DFuMMVtuf97fX8Q6Rvxvff7+C+xTY4568vX8yT/AYMzKwS/Q52JOBfSLgSgZuSQBOkIGXJQJgW9raaEgvOwTAuXj6+UAg3x8sLvGBhSeATkpcpToAz4vYwAZAM/6+jDcBNrGBUyiOvopCRTjDBdiHtHJMP7KYQCwxPidis5/33w9UjrCrKAH/MkGa/tX9SeANmq9ui/FZqbIAAAAASUVORK5CYII=",
                   // Don't stop me now
                   "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"
                   ];
       return iconData[iconNum];
      }

      // did someone forget the 'icon_number' parameter? Default to the first.

      var icon_num = 1;
      if (!this.config.icon_number) {
        icon_num = 1;
      }  else {
        icon_num = this.config.icon_number;
      }
      this.config.iconData = getIconData(icon_num - 1);
      

  } // end of setConfig

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 2;
  }
}

customElements.define('day-countdown', DayCountdown);