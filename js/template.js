// task treeの初期値

const templateProjectData = [
  [
    {
      "name": "このアプリについて",
      "count": 0,
      "isHide": false,
      "duration": 28,
      "isSelected": false
    },
    [
      {
        "name": "このアプリは、作業時間を細かく計測したいが為に作ったアプリです。",
        "count": 0,
        "isHide": false,
        "duration": 6,
        "isSelected": false
      }
    ],
    [
      {
        "name": "赤枠が選択中のタスクです。",
        "count": 0,
        "isHide": false,
        "duration": 5,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクは、１分経過毎に　　ここが増加します→",
          "count": 0,
          "isHide": false,
          "duration": 10,
          "isSelected": false
        }
      ]
    ],
  ],
  [
    {
      "name": "操作方法について",
      "count": 0,
      "isHide": true,
      "duration": 8,
      "isSelected": false
    },
    [
      {
        "name": "[↑] ／ [↓]",
        "count": 0,
        "isHide": false,
        "duration": 7,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクを変更します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ],
      [
        {
          "name": "この赤枠が移動します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": true
        }
      ]
    ],
    [
      {
        "name": "[←] ／ [→]",
        "count": 0,
        "isHide": true,
        "duration": 6,
        "isSelected": false
      },
      [
        {
          "name": "計測時間を＋１分／－１分修正します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ],
      [
        {
          "name": "「休憩してたのに、カウントが進んでた！」って時用の機能です。",
          "count": 0,
          "isHide": false,
          "duration": 5,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Space]",
        "count": 0,
        "isHide": true,
        "duration": 3,
        "isSelected": false
      },
      [
        {
          "name": "計測のスタート／ストップを切り替えます。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Enter]",
        "count": 0,
        "isHide": true,
        "duration": 2,
        "isSelected": false
      },
      [
        {
          "name": "新しいタスクを追加します。",
          "count": 0,
          "isHide": false,
          "duration": 2,
          "isSelected": false
        }
      ],
      [
        {
          "name": "選択中のタスクの１つ下に追加されます。",
          "count": 0,
          "isHide": false,
          "duration": 2,
          "isSelected": false
        }
      ],
      [
        {
          "name": "同じ階層の、兄弟タスクとして追加されます。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ],
      [
        {
          "name": "選択中のタスクは、追加されたタスクに移動します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[H]",
        "count": 1,
        "isHide": false,
        "duration": 9,
        "isSelected": false
      },
      [
        {
          "name": "子孫タスクの表示／非表示を切り替えます。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[F2]",
        "count": 0,
        "isHide": true,
        "duration": 2,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクの名前を変更します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Delete]",
        "count": 0,
        "isHide": true,
        "duration": 6,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクを削除します。",
          "count": 0,
          "isHide": false,
          "duration": 5,
          "isSelected": false
        }
      ],
      [
        {
          "name": "子孫タスクも巻き込んで、全部消えます！",
          "count": 0,
          "isHide": false,
          "duration": 2,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Shift] + [↑] ／ [↓]",
        "count": 0,
        "isHide": true,
        "duration": 12,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクの位置を上下移動させます。",
          "count": 0,
          "isHide": false,
          "duration": 9,
          "isSelected": false
        }
      ],
      [
        {
          "name": "その際、子孫タスクも一緒に移動します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Shift] + [→]",
        "count": 0,
        "isHide": true,
        "duration": 12,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクを子要素にします。",
          "count": 0,
          "isHide": false,
          "duration": 9,
          "isSelected": false
        }
      ],
      [
        {
          "name": "その際、子孫タスクも一緒に移動します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Shift] + [←]",
        "count": 0,
        "isHide": true,
        "duration": 12,
        "isSelected": false
      },
      [
        {
          "name": "選択中のタスクを、親要素に移動させます。",
          "count": 0,
          "isHide": false,
          "duration": 9,
          "isSelected": false
        }
      ],
      [
        {
          "name": "その際、子孫タスクも一緒に移動します。",
          "count": 0,
          "isHide": false,
          "duration": 3,
          "isSelected": false
        }
      ]
    ],
    [
      {
        "name": "[Shift] + [Enter]",
        "count": 0,
        "isHide": true,
        "duration": 11,
        "isSelected": false
      },
      [
        {
          "name": "新しい子タスクを追加します。",
          "count": 0,
          "isHide": false,
          "duration": 1,
          "isSelected": false
        }
      ]
    ]
  ]
];