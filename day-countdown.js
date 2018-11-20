class DayCountdown extends HTMLElement {
  

  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      
      if (!this.config.title) {
        card.header = "Countdown";
      } else {
        card.header = this.config.title;
      }

      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const target = this.config.date;
      
    function date_diff() {
      var now = new Date();
      var then = new Date(target);
      var timeDiff = Math.abs(then.getTime() - now.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
    }

    var link = this.config.icon_url
    if (link.slice(0,8) != "https://" && link.slice(0,7) != "http://") {
      link = "https://" + link;
    }

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
        px = 0;
      }
    
    if (!this.config.show_icon) {
      px = 0;
    }
    
    const days = date_diff();

    this.content.innerHTML = `
      <div align=center>
      <hr>
      <p style="font-size:20px;">Days Remaining: <strong>${days}</strong></p>
      <a href="${link}"><img height=${px} src="data:image/png;base64,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"></a>
      <br>
      </div>
    `;
  }

  setConfig(config) {
    if (!config.date) {
      throw new Error('You need to provide a date!');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 2;
  }
}

customElements.define('day-countdown', DayCountdown);