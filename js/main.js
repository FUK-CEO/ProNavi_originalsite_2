

document.querySelectorAll(".mask a").forEach(link => {
  console.log("リンクが押せるか:", link, link.offsetParent !== null);
});

const mask = document.querySelector('.mask');
if (mask.classList.contains('open')) {
  console.log("マスクは表示されています。");
} else {
  console.log("マスクは非表示です。");
}



// 穴埋め形式です。空いている箇所を埋めて実装してください

$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".toggle_btn").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
  $(".mask a").on("click", function () {
    $("header").toggleClass("open");
  });





  // スムーススクロール
  // ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function () {
    // aタグのhref属性の値が#で始まる要素をクリックした時に実行する
    // 'a[href^=#]'：「aタグのhref属性で値が#で始まる要素だったとき」

    // リンクを取得 クリックされたaタグのhref属性の中身をhrefという変数に代入する （#menuなど）をhrefという変数に代入する
    let href = $(this).attr("href");
    // this: クリックされたaタグ $('a[href^=#]')
    // .attr()は、要素の属性の値を取得する

    // ジャンプ先のid名をセット href == "#" 】 変数hrefの値が"#"【 || 】 または【href == ""】  であれば（【？】）
    // 【 $('html'); 】 へのリンク（≒ページトップ）,そうでなければ（【:】）【 $(href); 】 変数hrefの中身が到着地点になる
    let target = $(href == "#" || href == "" ? "html" : href);

    // トップからジャンプ先の要素までの距離を取得 （id=menuなどがページの一番上から何pxかを取得）
    let position = target.offset().top;
    // offset()は表示位置を取得する offset().topでページの一番上から何pxかを取得

    // animateでスムーススクロールを行う ページトップからpositionだけスクロールする
    // 600はスクロール速度で単位はミリ秒 swingはイージングのひとつ
    $("html, body").animate({ scrollTop: position - 150 }, 600, "swing");
    return false;
  });
  // {scrollTop:position}で、ページトップからposition分だけスクロールするという指定をしているいる。
  // linear：常に同じ速さで動く swing：始めはゆっくり動いて、途中はちょっと速め、最後はゆっくりと動く
  // 出発地点をクリックすると、URLの末尾にIDタグ(例.https://coffee.com#menu)が付与されてしまう。
  // これを防ぐために、最後に１文return falseを追加します。



  // 以下カーソルとトレイルエフェクト


  // $(document).ready(function () {
  //   const cursor = $(".cursor");
  //   const cursorTrail = $(".cursor-trail");

  //   // カーソルの追従
  //   $(document).mousemove(function (e) {
  //     const mouseX = e.pageX;
  //     const mouseY = e.pageY;

  //     // カーソルの位置を更新
  //     cursor.css({
  //       left: mouseX - cursor.width() / 2,
  //       top: mouseY - cursor.height() / 2
  //     });

  //     // トレイルエフェクトを生成して追加
  //     const trail = $("<div class='cursor-trail'></div>");
  //     $("body").append(trail);

  //     // トレイルの位置を更新
  //     trail.css({
  //       left: mouseX - trail.width() / 2,
  //       top: mouseY - trail.height() / 2
  //     });

  //     // トレイルエフェクトが終わったら削除
  //     setTimeout(function () {
  //       trail.remove();
  //     }, 800); // トレイルのアニメーション時間に合わせる
  //   });
  // });

  // 以下ローディングぺージ
  // DOMContentLoaded イベントで処理開始
  $(document).ready(function () {
    // 必要な要素を取得
    const loadingPage = $("#loading-page");
    const loadingBar = $(".loading-bar");
    const loadingText = $(".loading-text");
    const mainContent = $("#main-content");

    // progress変数を定義して初期化
    let progress = 0;  // 初期値は 0%

    // ローディングページを表示
    loadingPage.show();
    mainContent.hide();

    // ローディング進行状況を更新
    const interval = setInterval(function () {
      progress += 1;  // 進行状況を1%増加

      // ローディングバーを更新
      loadingBar.css("width", progress + "%");

      // ローディングテキストを更新
      loadingText.text(progress + "%");

      // 進行状況が100%に達したら
      if (progress >= 100) {
        clearInterval(interval); // intervalを停止

        // ローディングが終了したらフェードアウト
        loadingPage.fadeOut(1200, function () {
          mainContent.fadeIn(1200); // メインコンテンツをフェードイン
        });
      }
    }, 30);  // 30ミリ秒ごとに進行状況を更新

  });

  // 以下日英切り替えボタン(クリックで表示内容が切り替わるボタン、だね抽象で表すと)

  document.getElementById('btn-jp').addEventListener('click', function () {
    switchLanguage('jp');
  });

  document.getElementById('btn-en').addEventListener('click', function () {
    switchLanguage('en');
  });

  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-jp]');
    elements.forEach(element => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });
  }

  // 以下News ListのカルーセルSlick

  $(document).ready(function () {

    // progress変数を定義して初期化
    let progress = 0;  // 初期値は 0%

    $('.news_list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      nextArrow: '<button type="button" class="slick-next">Next</button>',
      prevArrow: '<button type="button" class="slick-prev">Prev</button>',
      responsive: [
        {
          breakpoint: 750, // 画面幅600px以下の場合
          settings: {
            slidesToShow: 1, // 表示するスライド数を1に設定
            slidesToScroll: 1, // スクロールするスライド数を1に設定
          }
        }
      ]
    });
  });

  console.log(progress);  // 進行状況を確認


});



// 以下メインの回転式イチオシメニュー

// $(document).ready(function () {
//   const items = $('.menu-item');
//   let currentIndex = 0;

//   function updateMenu() {
//     items.removeClass('active left right');

//     items.each(function (index) {
//       if (index === currentIndex) {
//         $(this).addClass('active');
//       } else if (index === (currentIndex + 1) % items.length) {
//         $(this).addClass('right');
//       } else if (index === (currentIndex - 1 + items.length) % items.length) {
//         $(this).addClass('left');
//       }
//     });
//   }

//   updateMenu();

//   setInterval(function () {
//     currentIndex = (currentIndex + 1) % items.length;
//     updateMenu();
//   }, 3000); // Adjust speed of rotation here
// });



$(document).ready(function () {
  const items = $('.menu-item');
  let currentIndex = 0;
  let intervalId; // setIntervalのIDを格納する変数
  let isHovering = false; // hover状態を判別するフラグ

  // 表裏反転を更新する関数
  function updateMenu() {
    items.removeClass('active left right');

    items.each(function (index) {
      if (index === currentIndex) {
        $(this).addClass('active');
      } else if (index === (currentIndex + 1) % items.length) {
        $(this).addClass('right');
      } else if (index === (currentIndex - 1 + items.length) % items.length) {
        $(this).addClass('left');
      }
    });
  }

  // setIntervalでメニューを自動的に切り替える処理
  $(document).ready(function () {
    const items = $('.menu-item');
    let currentIndex = 0;
    let intervalId; // setIntervalのIDを格納する変数
    let isHovering = false; // hover状態を判別するフラグ

    // 表裏反転を更新する関数
    function updateMenu() {
      items.removeClass('active left right');

      items.each(function (index) {
        if (index === currentIndex) {
          $(this).addClass('active');
        } else if (index === (currentIndex + 1) % items.length) {
          $(this).addClass('right');
        } else if (index === (currentIndex - 1 + items.length) % items.length) {
          $(this).addClass('left');
        }
      });
    }

    // setIntervalでメニューを自動的に切り替える処理
    function startRotation() {
      intervalId = setInterval(function () {
        if (!isHovering) { // hoverしていないときのみ更新
          currentIndex = (currentIndex + 1) % items.length;
          updateMenu();
          console.log("setIntervalでメニューを切り替えました。");
        } else {
          console.log("hover中なのでsetIntervalは動作しません。");
        }
      }, 3000); // 3秒ごとに切り替え
    }

    // setIntervalの停止
    function stopRotation() {
      clearInterval(intervalId); // setIntervalの停止
      console.log("setIntervalが停止しました。");
    }

    // hover中の反転状態を強制的に維持する
    items.hover(
      function () {
        // hover開始時に自動切り替えを停止
        isHovering = true;
        console.log("hover開始：isHovering = " + isHovering); // hover開始時のisHoveringの値を出力
        stopRotation();
      },
      function () {
        // hover解除後に自動切り替えを再開
        isHovering = false;
        console.log("hover終了：isHovering = " + isHovering); // hover終了時のisHoveringの値を出力
        startRotation();
      }
    );

    // 初期状態でrotationを開始
    startRotation();
  });



});



// // レスポンシブ対応（750px以下の場合）
// function adjustForSmallScreen() {
//   if ($(window).width() <= 750) {
//     // 750px以下のとき、左右のアイテムは非表示にし、真ん中のアイテムだけにする
//     items.each(function (index) {
//       $(this).removeClass('active left right'); // すべてのクラスをリセット
//       if (index === currentIndex) {
//         $(this).addClass('active'); // 真ん中のアイテムだけを表示
//       }
//     });

//     // さらに、時間差で切り替える
//     setInterval(function () {
//       if (!isHovering) { // hoverしていないときのみ更新
//         currentIndex = (currentIndex + 1) % items.length;
//         items.each(function (index) {
//           $(this).removeClass('active left right'); // すべてのクラスをリセット
//           if (index === currentIndex) {
//             $(this).addClass('active'); // 真ん中のアイテムだけを表示
//           }
//         });
//       }
//     }, 3000); // 3秒ごとに切り替え
//   } else {
//     // 750px以上の場合は通常の表示に戻す
//     updateMenu();
//   }
// }

// // 初期表示での調整
// adjustForSmallScreen();

// // ウィンドウリサイズ時にも対応
// $(window).resize(function () {
//   adjustForSmallScreen();
// });
