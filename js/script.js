// 優先度: High / Mid / Low
// 後回し: <<
// 要検討: think

/** High    footerを意識したmarginがない */


/** High    追加時に、フォーカス移動のanimationが動かない */



/** High   full-countの部分が、タスクが消えた時に減らない！
 * 
 */


/** Mid     タスクにメモを入れたい！
 * 
 */

/** Mid    やっぱり祖先タスクごとに色分けしたい
 * 
 */

/** Mid    計測中、の表示を、選択中のタスクの真横に表示したい
 * 
 */

/** High   やっぱり階層移動は必要だ
*/

/** High    ←／→キー = 作業時間±１分 の操作は、直感に反している。
 * ↑→↓←キーには、選択中のタスクを移動させるだけの機能にしよう。
 * Shift + は、そのラッパーという位置づけにしよう・
 * 作業時間の調整は、+/-キーにしよう。または＜／＞キー
*/

/** High <<    リセット、書き出しなどは、ボタンとして実装する（簡単にできないようにしたい。）
*/

/** Mid    shift enter キャンセル時の挙動がおかしい
*/


/** Mid <<    メモを作成したい
*/


/** Low    クリックイベントが登録出来てない。
 * section.task-area全体に登録して、$(this)で振り分けした方が良いかもしれない。
 */



let projectData = [];
let isStopCount = true;


$(document).ready(function () {



  function scrollToSelectedTask() {
    // setTimeout(() => {
    let offsetSelectedTask = $('.selected-task').offset().top;
    let offsetWindow = $(window).scrollTop();
    let bodyHeight = $("body").height();
    let windowHeight = $(window).height();
    let marginTop = 30;
    let marginBottom = 50;
    let distanceTop = (offsetSelectedTask - marginTop) - offsetWindow;
    let distanceBottom = (offsetWindow + windowHeight) - (offsetSelectedTask + marginBottom);

    console.log("db: " + distanceBottom);
    let scrollDegrees;
    if (distanceBottom < 0) {
      scrollDegrees = offsetSelectedTask - marginBottom;
    } else if (distanceTop < 0) {
      scrollDegrees = offsetSelectedTask - marginTop;
    }
    $('html, body').animate({ scrollTop: scrollDegrees }, 80);
    // }, 100);
  }

  // LocalStorageから読み込み
  function readProjectData() {
    let dataString = localStorage.getItem("projectData");
    let projectData = JSON.parse(dataString);
    return projectData;
  }

  // LocalStorageからの読み込み 一番最初の！
  function init() {
    let temp = readProjectData();
    let projectData = temp ? temp : templateProjectData;
    return projectData;
  }


  // task objectのクラスを作成しよう！
  // この関数は、parseTaskTreeにしょう！
  function parseTaskObject(_$task) {
    let taskObject = {};
    taskObject.name = _$task.children("span.task-name").text();
    taskObject.count = _$task.children("span.task-count").text() - 0;
    taskObject.isHide = _$task.hasClass("hide-children");
    taskObject.duration = _$task.data("duration");
    taskObject.isSelected = _$task.hasClass("selected-task");
    // taskObject.count = calcCount(taskObject.duration);
    let result = [taskObject];
    let $children = _$task.children("ul.task-list").children("li.task");
    for (let i = 0; i < $children.length; i++) {
      let child = parseTaskObject($children.eq(i));
      result.push(child);
    }
    return result;
  }

  // 今のtask-areaのHTMLから、データを抽出する
  function parseData() {
    let result = [];
    let $taskList = $("section.task-area>ul.task-list>li.task");
    for (let i = 0; i < $taskList.length; i++) {
      let $task = $taskList.eq(i);
      let temp = parseTaskObject($task);
      result.push(temp);
    }
    return result;
  }


  // 反映
  function generateTaskAreaHTML() {
    let projectData = init();
    let $area = $("section.task-area");
    let $taskList = $area.children("ul.task-list");
    for (let i = 0; i < projectData.length; i++) {
      let $task = makeTaskWithChildren(projectData[i]);
      $taskList.append($task);
    }
    refreshHasChildren();
    refreshHasSelectedChild();
    initParentsCount();
    initFullCount();
    scrollToSelectedTask();
  }

  // タスク配列から、子タスクを含んだ状態でのjQオブジェクトを作成し、appendする
  function makeTaskWithChildren(tasks) {
    let $parent = makeNewTask(tasks[0]);
    if (tasks.length > 1) {
      let $taskList = $parent.children("ul.task-list");
      for (let i = 1; i < tasks.length; i++) {
        let $child = makeTaskWithChildren(tasks[i]);
        $taskList.append($child);
      }
    }
    return $parent;
  }

  // LocalStorageに上書き保存
  function saveProjectData() {
    let projectData = parseData();
    localStorage.setItem("projectData", JSON.stringify(projectData));
  }


  function resetProjectData() {
    localStorage.removeItem("projectData");
  }

  /****************************:
   * ここ！　要修正！
   * 
   * 要素を追加／削除したときに、クリックイベントが登録されてない要素が発生する！
   * generateとかの最後の方とかに、移動させた方がいい。
   * もしくは、section.task-area全体にクリックイベントを入れて、
   * $(this)で処理を振り分けるとか、
   * ね！
   
   $(".task-name").click(function (e) {
     console.log("test");
     let index = $(this).parent("li.task").index("li");
     setSelectedTask(index);
      scrollToSelectedTask();
      e.stopPropagation();
    });
    
    $(".has-children").click(function (e) {
      $(this).toggleClass("hide-children");
      e.stopPropagation();
    });
    
    */

  function toggleStopCount() {
    let $countStatus = $("section.full-count-area>div.count-status");
    if (isStopCount) {
      $countStatus.addClass("stop-count");
    } else {
      $countStatus.removeClass("stop-count");
    }
  }

  // (duration) => {return count;}
  function calcCount(_duration) {
    let count = Math.floor(_duration / 60000);
    return count;
  }

  // 子要素のcountを合計する
  // 子要素がなかった場合、0を返す。
  function sumChildrenCount(_$target) {
    let result = 0;
    let $children = _$target.children("ul.task-list").children("li.task");
    for (let i = 0; i < $children.length; i++) {
      console.log("child ID: " + i);
      result += $children.eq(i).children("span.task-count").text() - 0;
    }
    return result;
  }

  // countを設定
  // 子孫タスクを持つ場合、合計して設定する。
  // 持たない場合、そのまま設定する。
  // タスクに子孫があるか、呼び出し元は考えなくて良い。
  function setCount(_$target = $(".selected-task")) {
    let duration = getDuration(_$target);
    let count = calcCount(duration);
    count += sumChildrenCount(_$target);
    _$target.children(".task-count").text(count);
  }


  function setFullCount(_count) {
    let $fullCount = $("#full_count");
    $fullCount.text(_count);
  }

  function getFullCount() {
    let $fullCount = $("#full_count");
    let result = $fullCount.text() - 0;
    return result;
  }

  // 初期読み込み時、子要素を持つタスクのcountを設定する。
  function initParentsCount() {
    let $parents = $(".has-children");
    console.log($parents.length);
    for (let i = $parents.length - 1; -1 < i; i--) {
      let $parent = $parents.eq(i);
      console.log($parent.children(".task-name").text());
      setCount($parent);
    }
  }


  // countが変更されたら、その親要素全てに反映させる
  function refreshParentsCount() {
    // 先祖タスクのcountを反映
    let $parents = $(".has-selected-child");
    for (let i = $parents.length - 1; -1 < i; i--) {
      let $parent = $parents.eq(i);
      setCount($parent);
    }
  }

  function addFullCount(_minute) {
    let fullCount = getFullCount();
    setFullCount(fullCount + _minute);
  }



  function initFullCount() {
    let $rootTasks = $("section.task-area>ul.task-list>li.task");
    let fullCount = 0;
    for (let i = 0; i < $rootTasks.length; i++) {
      fullCount += $rootTasks.eq(i).children(".task-count").text() - 0;
    }
    setFullCount(fullCount);
  }

  function canDownCount() {
    let duration = $(".selected-task").data("duration") - 0;
    let count = calcCount(duration);
    return count > 0;
  }

  function getIndexOfSelectedTask() {
    let index = $(".selected-task").index("li");
    return index;
  }

  function refreshHasSelectedChild() {
    $(".has-selected-child")
      .removeClass("has-selected-child");
    let index = getIndexOfSelectedTask();
    $("li")
      .eq(index)
      .parents(".has-children")
      .addClass("has-selected-child");
  }

  function refreshHasChildren() {
    $(".has-children")
      .removeClass("has-children");
    $(".task:has('.task')")
      .addClass("has-children");
  }

  function setSelectedTask(_index) {
    $(".selected-task")
      .removeClass("selected-task");
    $("li")
      .eq(_index)
      .addClass("selected-task");
    refreshHasSelectedChild();
  }

  function changeSelectedTask(_direction) {
    let newIndex = getIndexOfSelectedTask() + _direction;
    if ($("li").length == newIndex) {
      newIndex = 0;
    }
    setSelectedTask(newIndex);
    scrollToSelectedTask();
  }

  function moveSelectedTask(_direction) {
    let $selectedTask = $(".selected-task");
    let index = $selectedTask.index();
    let targetIndex = index + _direction;
    let $taskList = $selectedTask.parent();
    let $brotherTasks = $taskList.children("li.task");

    console.log(targetIndex);
    if (targetIndex == -1) {
      // 一番上から、一番下へ
      console.log("一番上から一番下へ");
      $taskList.append($selectedTask);
    } else if (targetIndex == $brotherTasks.length) {
      // 一番下から、一番上へ
      console.log("一番下から一番上へ");
      $taskList.prepend($selectedTask);
    } else if (_direction == +1) {
      // 一つ下と交換
      console.log("一つ下と交換");
      $brotherTasks.eq(targetIndex).after($selectedTask);
    } else if (_direction == -1) {
      // 一つ上と交換
      console.log("一つ上と交換");
      $brotherTasks.eq(targetIndex).before($selectedTask);

    }
    refreshHasChildren();
    refreshHasSelectedChild();
    scrollToSelectedTask();
  }

  function shiftParent() {
    console.log("選択中のタスクを、親要素にシフト");
    // 選択中のタスクの親要素を取得
    let $parent = $(".selected-task")
      .closest(".has-selected-child");
    // $parent.css("color","red");
    // 選択中のタスクと、その子要素を切り取り
    $selectedTask = $(".selected-task");
    // 親要素の、１つ下の要素に貼り付け
    $parent.after($selectedTask);

    refreshHasChildren();
    refreshHasSelectedChild();
    scrollToSelectedTask();
  }

  function shiftChild() {
    console.log("選択中のタスクを、子要素にシフト");
    // 選択中のタスクを選択
    let $selectedTask = $(".selected-task");
    // 一つ上に位置する兄弟タスクがあるかをチェック
    let index = $selectedTask.index();
    if (index == 0) return false;
    // 一つ上の兄弟タスクのul.task-listの最後の要素に
    $brotherTasks = $selectedTask.parent().children("li.task");
    $parentTask = $brotherTasks.eq(index - 1);
    $parentTask.children("ul.task-list").append($selectedTask);
    refreshHasChildren();
    refreshHasSelectedChild();
    scrollToSelectedTask();
  }

  function deleteSelectedTask() {
    let isOK = confirm("\n\n選択中のタスクを削除します。\n※子孫タスクを含む");
    if (isOK) {
      let index = getIndexOfSelectedTask();
      changeSelectedTask(-1);
      $("li.task").eq(index).remove();
      if ($("li.task").length == 0) {
        $("section.task-area>ul.task-list").append(makeNewTask());
        setSelectedTask(0);
      } else {
        refreshHasChildren();
        refreshHasSelectedChild();
      }
      scrollToSelectedTask();
    }
  }

  function doPrompt(_msg = "", _defaultValue = "", _func = console.log) {
    let result = prompt(_msg, _defaultValue);
    if (result !== null) {
      return _func(result);
    } else {
      return false;
    }
  }

  function renameSelectedTask() {
    doPrompt("", "新しい名前", (_res) => {
      $(".selected-task>.task-name").text(_res);
    });
  }

  function makeNewTask(_taskObj) {
    let classHide = _taskObj.isHide ? " hide-children" : "";
    let classSelected = _taskObj.isSelected ? " selected-task" : "";
    let name = _taskObj.name || "ダミー";
    let duration = _taskObj.duration || 0;
    let count = calcCount(duration);
    $newTask = $(
      `<li class='task${classHide}${classSelected}' data-duration=${duration}>\
        <span class='task-name'>${name}</span>\
        <span class='task-count'>${count}</span>分\
        <ul class='task-list'></ul>\
      </li>`
    );
    return $newTask;
  }

  function addTaskAsBrother() {
    doPrompt("新しいタスクを追加します。", "新規 タスク名", (_res) => {
      let index = getIndexOfSelectedTask();
      $(".selected-task").removeClass("selected-task");
      let $newTask = makeNewTask({ name: _res, isSelected: true });
      $("li.task").eq(index).after($newTask);
    });
  }

  function addDuration(_diff = 0, _$target = $(".selected-task")) {
    let duration = getDuration(_$target);
    let newDuration = duration + _diff;
    _$target.data("duration", newDuration);
    return newDuration;
  }

  function getDuration(_$target = $(".selected-task")) {
    let duration = _$target.data("duration");
    console.log(duration);
    return duration;
  }

  let past = Date.now();
  setInterval(() => {
    let now = Date.now();
    if (isStopCount) {
      past = now;
      return;
    }

    let diff = now - past;
    if (diff < 0) return;
    let taskDuration = addDuration(diff);
    setCount();
    refreshParentsCount();
    // addFullCount(countDiff);
    initFullCount();

    // let $selectedTask = $(".selected-task");
    // let count = $selectedTask.children(".task-count").text() - 0;
    // let countDiff = Math.floor(taskDuration / 60000) - count;
    // if (countDiff > 0) {
    // 
    // addCount(countDiff);
    // addFullCount(countDiff);
    // }

    past = now;
    saveProjectData();
  }, 5000);


  window.addEventListener('beforeunload', function (e) {
    saveProjectData();
    console.log("セーブ完了！？");
    console.log(readProjectData());
    console.log(JSON.stringify(readProjectData()));
    // イベントをキャンセルする
    e.preventDefault();
    // Chrome では returnValue を設定する必要がある
    e.returnValue = '';
  });


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
        isStopCount = !isStopCount;
        toggleStopCount();
        e.preventDefault();
        break;
      case "ArrowLeft":
        if (e.shiftKey) {
          shiftParent();
        } else {
          if (canDownCount()) {
            addDuration(-1 * 60000);
            // addCount(-1);
            setCount();
            refreshParentsCount();
            addFullCount(-1);
          }
        }
        saveProjectData();
        break;
      case "ArrowRight":
        if (e.shiftKey) {
          shiftChild();
        } else {
          addDuration(+1 * 60000);
          setCount();
          refreshParentsCount();
          // addCount(+1);
          addFullCount(+1);

        }
        saveProjectData();
        break;
      case "ArrowUp":
        if (e.shiftKey) {
          moveSelectedTask(-1);
        } else {
          changeSelectedTask(-1);
        }
        saveProjectData();
        e.preventDefault();
        break;
      case "ArrowDown":
        if (e.shiftKey) {
          moveSelectedTask(+1);
        } else {
          changeSelectedTask(+1);
        }
        saveProjectData();
        e.preventDefault();
        break;
      case "Delete":  // タスク削除
        if (e.shiftKey) {
          if (!confirm("全て削除して、リセットしますか？")) break;
          $("section.task-area>ul.task-list>li.task").remove();
          resetProjectData();
          generateTaskAreaHTML();
        } else {
          deleteSelectedTask();
        }
        saveProjectData();
        break;
      case "F2":  // タスク名前変更
        renameSelectedTask();
        saveProjectData();
        break;
      case "Enter":  // タスク追加
        addTaskAsBrother();
        if (e.shiftKey) {
          shiftChild();
        }
        saveProjectData();
        break;
      case "KeyH":
        $(".selected-task").toggleClass("hide-children");
        saveProjectData();
        break;
      case "Escape":  // テスト実行
        break;
    }
  });
  generateTaskAreaHTML();
});

