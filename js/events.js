// イベントまとめ

$(document).ready(function () {
  // 画面生成。
  // localStorageから読み込んだデータを元に、
  // 前回と同じ画面を再構成する。
  console.log("画面生成");

  // クリックイベント
  $("section.task-area").click(function (e) {
    let $this = $(this);
    if ($this.hasClass("task")) {
      // li.taskのエリアをクリックしたら、
      // クリックしたタスクに選択を変更する。
      console.log("タスク選択");
    } else if ($this.hasClass("accordion")) {
      // アコーディオンボタンをクリックしたら
      // 子孫タスクの表示/非表示を変える。
      console.log("子タスク 表示/非表示");
    }
  });


  // キーイベント
  document.body.addEventListener("keydown", e => {

    console.log(
      "key: "
      + (e.altKey ? "Alt + " : "")
      + (e.ctrlKey ? "Ctrl + " : "")
      + (e.shiftKey ? "Shift + " : "")
      + e.code
    );

    switch (e.code) {
      case "Space":
        // カウントの停止／再開
        console.log("カウント 停止/再開");

        e.preventDefault();
        break;

      case "Comma":
        if (e.shiftKey) {
          // カウント修正 -１分
          console.log("カウント修正 -１分");
        }
        break;

      case "Period":
        if (e.shiftKey) {
          // カウント修正 +１分
          console.log("カウント修正 +１分");

        }

        break;

      case "ArrowLeft":
        if (e.shiftKey) {
          // 親移動。
          // タスクの階層を、一段上げる。
          console.log("親移動");
        } else {
          // 親選択。
          // 選択中のタスクの親に、選択を移す。
          console.log("親選択");
        }
        e.preventDefault();
        break;

      case "ArrowRight":
        if (e.shiftKey) {
          // 子移動。
          // タスクの階層を、一段下げる。
          console.log("子移動");
        } else {
          // 子選択。
          // 選択中のタスクの子に、選択を移す。
          console.log("子選択");
        }
        e.preventDefault();
        break;

      case "ArrowUp":
        if (e.shiftKey) {
          // 階層移動 上
          // 兄タスクと、並び順を交換する。
          console.log("階層移動 上");
        } else {
          // 階層選択 上
          // 兄タスクに、選択を移す。
          console.log("階層選択 上");
        }
        e.preventDefault();
        break;

      case "ArrowDown":
        if (e.shiftKey) {
          // 階層移動 下
          // 弟タスクと、並び順を交換する。
          console.log("階層移動 下");
        } else {
          // 階層選択 下
          // 弟タスクに、選択を移す。
          console.log("階層選択 下");
        }
        e.preventDefault();
        break;

      case "Delete":
        if (e.shiftKey) {
          // 初期化
          console.log("初期化");
        } else {
          // タスク削除
          console.log("タスク削除");
        }
        break;

      case "F2":
        // タスク名前変更
        console.log("タスク名前変更");
        break;

      case "Enter":
        if (e.shiftKey) {
          // 子タスク追加
          console.log("子タスク追加");
        } else {
          // 弟タスク追加
          console.log("弟タスク追加");
        }
        break;

      case "KeyH":
        // 子タスク表示/非表示
        console.log("子タスク 表示/非表示");
        break;
    }
  });
});