class Counter {
  constructor(duration, preHook, postHook) {
    this.duration = Number.isInteger(duration) ? duration : 0;
    this.count;
    this.counterID;
    this.past;
    this.delay = 1000;
    this.preHook = preHook;
    this.postHook = postHook;
  }

  getCount() {
    this.count = Math.floor(this.duration / 60_000);
    return this.count;
  }

  updateDuration() {
    let now = Date.now();
    let diff = now - this.past;

    // preHook 処理前に、条件付けでキャンセルする場合などに用いる。
    this.preHook(now, diff);

    this.duration += diff;
    this.past = now;

    // postHook 処理後に、Viewの更新やLocalStorageへ保存する場合などに用いる。
    this.postHook(this.duration, this.getCount());
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
