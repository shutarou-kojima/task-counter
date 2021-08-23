function dummy() { }

class Counter {
  constructor(duration, postHook) {
    this.duration = Number.isInteger(duration) ? duration : 0;
    this.count;
    this.counterID;
    this.past;
    this.delay = 1000;
    this.postHook = postHook || dummy;
  }

  /** duration 経過ミリ秒を表す。表示には使わない、内部データ。 */
  calcDuration() {
    this.duration = this.count * 60_000;
    return this.duration;
  }

  addDuration(degrees) {
    this.duration += degrees;
    this.calcCount();
    return this.duration;
  }

  /** count 経過分を表す。表示に用いるデータ。 */
  calcCount() {
    this.count = Math.floor(this.duration / 60_000);
    return this.count;
  }

  addCount(degrees) {
    this.count += degrees;
    this.calcDuration();
    return this.count;
  }

  /** カウント処理部分。setIntervalに渡す。
   * 前回実行時のとの時間差をミリ秒で取得し、durationに追加する。
   */
  updateDuration() {
    let now = Date.now();
    let diff = now - this.past;

    this.addDuration(diff);
    this.past = now;

    // postHook 処理後に、Viewの更新やLocalStorageへ保存する場合などに用いる。
    this.postHook(this.duration, this.count);
  }

  /** カウンターのON／OFF。 */
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
class Task extends Counter {
  constructor(data){
    super(data.duration, data.postHook);
    this.name = data.name || "ダミータスク";
    this.creationDate = new Date();
    this.memo = data.memo || "";
  }

  rename(newName){
    this.name = newName;
    return this.name;
  }

  editMemo(text){
    this.memo = text;
    return this.memo;
  }

}