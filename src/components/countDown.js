import { Component } from "@wearearchangel/handcrafted";

const getRelativeTimeFormat = (diffInMilliseconds) => {
  const seconds = Math.abs(diffInMilliseconds) / 1000;

  let time;
  if (seconds < 60) {
    time = { value: Math.round(seconds), unit: "second" };
  } else if (seconds < 3600) {
    time = { value: Math.round(seconds / 60), unit: "minute" };
  } else if (seconds < 86400) {
    time = { value: Math.round(seconds / 3600), unit: "hour" };
  } else if (seconds < 604800) {
    time = { value: Math.round(seconds / 86400), unit: "day" };
  } else if (seconds < 2629800) {
    time = { value: Math.round(seconds / 604800), unit: "week" };
  } else if (seconds < 31557600) {
    time = { value: Math.round(seconds / 2629800), unit: "month" };
  } else {
    time = { value: Math.round(seconds / 31557600), unit: "year" };
  }

  time.value = diffInMilliseconds < 0 ? -time.value : time.value;
  return time;
};

const getRelativeTime = (dateTime) => {
  const timeDifference = new Date(dateTime) - new Date();
  const timeRelative = getRelativeTimeFormat(timeDifference);
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "short"
  });
  const rtfTime = rtf.format(timeRelative.value, timeRelative.unit);
  return timeDifference > 0
    ? `Deal ends ${rtfTime}`
    : "Deal has ended";
};

class CountDown extends Component {
  constructor (props) {
    super(props);

    this.state.timeRemaining = "00:00:00";
    this.state.setTimeRemaining = (time) => {
      this.state.timeRemaining = getRelativeTime(time);
      this.render();
    };
  }

  template () {
    const { timeRemaining } = this.state;

    return `
        <div class="timer">
            <div id="countdown">
                ${timeRemaining}
            </div>
        </div>
    `;
  }

  controller () {
    const { setTimeRemaining } = this.state;

    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0); // Set end time to 24:00 hours
      setTimeRemaining(endTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }
}

export default CountDown;
