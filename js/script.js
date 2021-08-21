class Counter {
  constructor(duration) {
    this.duration = Number.isInteger(duration) ? duration : 0;
    this.count;
    this.counterID;
    this.past;
    this.delay = 1000;
  }

  getCount() {
    this.count = Math.floor(this.duration / 60_000);
    return this.count;
  }

  updateDuration() {
    let now = Date.now();
    let diff = now - this.past;
    this.duration += diff;
    this.past = now;
  }

  start() {
    this.past = Date.now();
    this.counterID = setInterval(
      this.updateDuration.bind(this),
      this.delay
    );
  }

  stop() {
    clearInterval(this.counterID);
  }
}
