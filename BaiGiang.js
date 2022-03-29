$(document).ready(function () {
    /* Firebase */
    var firebaseConfig = {
        apiKey: "AIzaSyDdGSORVRFfLI8nWu9LLNP09DdHcsiuyTE",
        authDomain: "esp32-by-hwng.firebaseapp.com",
        databaseURL: "https://esp32-by-hwng-default-rtdb.firebaseio.com",
        projectId: "esp32-by-hwng",
        storageBucket: "esp32-by-hwng.appspot.com",
        messagingSenderId: "532413931449",
        appId: "1:532413931449:web:695a58ebf7782e3555a068",
        measurementId: "G-9YCYMD0GTS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    /* Firebase end */

    /* updata */
    

    /* new */
    /* Subject more */
    $('.subject-modify-1').click(function () { moreContentSubject(1); });
    $('.subject-modify-2').click(function () { moreContentSubject(2); });
    /* new end */

    $('.heart').click(ToggleHeart);
    /* Choose tab */
    $('.tab1').click(ChooseTab1);
    $('.tab2').click(ChooseTab2);
    $('.tab3').click(ChooseTab3);
    $('.tab4').click(ChooseTab4);
    /* focus comment box */
    $(".comment-box").focus(focusCommentBox);
    /* focus out comment box */
    $(".comment-box").focusout(focusOutCommentBox);
    $('.cancel-comment-button').click(cancelComment);
    /* choose lesson */
    $('.lesson_1').click(function () { chooseLesson(1); });
    $('.lesson_2').click(function () { chooseLesson(2); });
    $('.lesson_3').click(function () { chooseLesson(3); });
    /* Do comment */
    $(".submit-comment-button").click(function (e) {
        e.preventDefault();  //ngan can submit
        var new_comment = {
            index: 5,
            name: "New user", date: "1 Oct, 2021",
            content: $(".comment-box").val(),
            img: "https://i.pinimg.com/originals/b7/4a/cd/b74acd489a754d949d24a279bc1a44e6.jpg"
        };
        info_comments.push(new_comment);
        /* update firebase here */

        /* end update firebase here */

        /* Update comment */
        $('.comment-show').text('Ẩn bình luận');
        renderOldComments();

       

    });
    /* show comments */
    $('.comment-show').click(toggleComments);
});

var val_heart = false;
var val_show_comments = false;
var toggle_subject_content_more = [false,false];

/* Object */
var list_videos = [
    {
        id: 1,
        src: 'https://drive.google.com/file/d/1hhPLfMFK1WUMqQSg2jvRb4iUExBCENry/preview',
        title: 'Bài 1: Tính moment của lực đối với một điểm',
        info: '2.000 lượt xem - 30 thg 9, 2021',
        detail: 'video 1',
    },

    {
        id: 2,
        src: 'https://drive.google.com/file/d/18PcURO3TmmNCkVPTgAxKxyG9rJfwKoDF/preview',
        title: 'Bài 2: Các dạng liên kết - Phản lực liên kết',
        info: '10.000 lượt xem - 30 thg 9, 2021',
        detail: 'video 2',
    },

    {
        id: 3,
        subject: "Cơ học kĩ thuật 1",
        src: 'https://drive.google.com/file/d/1Kn5FApuOlUJ0R5qBUOHxLq0PsVvJKegc/preview',
        title: 'Bài 3: Tìm phản lực liên kết của vật rắn cân bằng',
        info: '8.000 lượt xem - 30 thg 9, 2021',
        detail: 'video 3',
    },
];
var info_comments = [
    {
        id: 1, name: "Hung", date: "1 Oct, 2021", content: "day la Hung nhe.",
        img: "https://i.pinimg.com/originals/b7/4a/cd/b74acd489a754d949d24a279bc1a44e6.jpg"
    },

    {
        id: 2, name: "Quan", date: "2 Oct, 2021", content: "day la Quan nhe.",
        img: "https://i.pinimg.com/originals/e2/68/fa/e268fa61e18b5e4e4c8f90d5c6629c64.jpg"
    },

    {
        id: 3, name: "Trung", date: "3 Oct, 2021", content: "day la Trung nhe.",
        img: "https://i.pinimg.com/originals/1a/a4/e9/1aa4e994176b81fef62be9575a9d22fa.jpg"
    },

    {
        id: 4, name: "Hai", date: "4 Oct, 2021", content: 'day la Hai nhe.',
        img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aac39ffc-42e8-49fe-a1a1-9706baf7af0d/dc5dtrv-8457dd18-0573-485e-8e27-38469d4070c9.png/v1/fill/w_1024,h_1024,q_80,strp/iron_man_character_icon_by_thelivingethan_dc5dtrv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2FhYzM5ZmZjLTQyZTgtNDlmZS1hMWExLTk3MDZiYWY3YWYwZFwvZGM1ZHRydi04NDU3ZGQxOC0wNTczLTQ4NWUtOGUyNy0zODQ2OWQ0MDcwYzkucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.u_M3lmuAMFlKQifTJzCYaAReaw40hHuc5Jlg3Y4ea_E"
    },
];

var test_comment = [{
    index: 5,
    name: "New user", date: date_now,
    content: $(".comment-box").val(),
    img: "https://i.pinimg.com/originals/b7/4a/cd/b74acd489a754d949d24a279bc1a44e6.jpg"
}];
/* Element */

function ToggleHeart() {
    if (val_heart) {
        val_heart = false;
        $('.heart').removeClass("red-heart");
    } else {
        val_heart = true;
        $('.heart').addClass("red-heart");
    }
}
/* Choose tab */
function ChooseTab1() {
    $('.tab2').removeClass("tab-choosing");
    $('.tab3').removeClass("tab-choosing");
    $('.tab4').removeClass("tab-choosing");
    $('.reference-video').removeClass("show-tab");
    $('.comment-video').removeClass("show-tab");
    $('.notes-video').removeClass("show-tab");
    $('.tab1').addClass("tab-choosing");
    $('.detail-video').addClass("show-tab");
}
function ChooseTab2() {
    $('.tab1').removeClass("tab-choosing");
    $('.tab3').removeClass("tab-choosing");
    $('.tab4').removeClass("tab-choosing");
    $('.detail-video').removeClass("show-tab");
    $('.comment-video').removeClass("show-tab");
    $('.notes-video').removeClass("show-tab");
    $('.tab2').addClass("tab-choosing");
    $('.reference-video').addClass("show-tab");
}
function ChooseTab3() {
    $('.tab1').removeClass("tab-choosing");
    $('.tab2').removeClass("tab-choosing");
    $('.tab4').removeClass("tab-choosing");
    $('.detail-video').removeClass("show-tab");
    $('.reference-video').removeClass("show-tab");
    $('.notes-video').removeClass("show-tab");
    $('.tab3').addClass("tab-choosing");
    $('.comment-video').addClass("show-tab");
}
function ChooseTab4() {
    $('.tab1').removeClass("tab-choosing");
    $('.tab2').removeClass("tab-choosing");
    $('.tab3').removeClass("tab-choosing");
    $('.detail-video').removeClass("show-tab");
    $('.reference-video').removeClass("show-tab");
    $('.comment-video').removeClass("show-tab");
    $('.tab4').addClass("tab-choosing");
    $('.notes-video').addClass("show-tab");
}
/* focus comment box */
function focusCommentBox() {
    $('.comment-box').attr('placeholder', '');
    $('.comment-box').addClass('comment-box-focus');
    $('.btn').addClass('btn-show');
}
/* focus out comment box */
function focusOutCommentBox() {
    $('.comment-box').attr('placeholder', 'Bình luận ở đây...');
    $('.comment-box').removeClass('comment-box-focus');
}
function cancelComment() {
    $('.comment-box').attr('placeholder', 'Bình luận ở đây...');
    $('.comment-box').removeClass('comment-box-focus');
    $('.btn').removeClass('btn-show');
    //alert($(".comment-box").val());  //hien thi binh luan
    $(".comment-box").val('');
}
function chooseLesson(index) {
    $('.this-video').attr('src', list_videos[index - 1].src);
    $(".info-detail").text(list_videos[index - 1].info);
    $(".content-video h3").text(list_videos[index - 1].title);
    ChooseTab1();
    $(".detail-video").text(list_videos[index - 1].detail);
}
/* Toggle show comment */
function toggleComments() {
    if (val_show_comments) {
        val_show_comments = false;
        $('.comment-show').text('Hiển thị bình luận');
        /* Remove comment */
        removeComment();
    } else {
        val_show_comments = true;
        $('.comment-show').text('Ẩn bình luận');
        renderOldComments();
    }
}
/* hide comment */
function removeComment() {
    var i = 0;
    for (i = (info_comments.length - 1); i >= 0; i--) {
        $("#comment-block").remove();
    }  
}
/* Render comment */
function renderComment(info_comment) {
    var html_comment = "<div id='comment-block'><img src='" + info_comment.img + "' alt='avatar'><div class='comment-body'><span class='comment-name'>" + info_comment.name + "</span><span class='comment-date'>" + info_comment.date + "</span><p class='comment-content'>" + info_comment.content + "</p></div></div>";
    $('.comment-point').append(html_comment);
}
function renderNewComment(info_comment) {
    var html_comment = "<div id='comment-block'><img src='" + info_comment.img + "' alt='avatar'><div class='comment-body'><span class='comment-name'>" + info_comment.name + "</span><span class='comment-date'>" + info_comment.date + "</span><p class='comment-content'>" + info_comment.content + "</p></div></div>";
    $('.comment-point').prepend(html_comment);
}
/* Function call when first click comment tab to render all old comments */
function renderOldComments() {
    var i = 0;
    removeComment();
    for (i = (info_comments.length - 1); i >= 0; i--) {
        renderComment(info_comments[i]);
    }
}

/* new */
function moreContentSubject(id){
    if(id===1){
        if(toggle_subject_content_more[id-1]===false){
            toggle_subject_content_more[id-1]=true;
            $('.subject-more-1').addClass("subject-box-content-more-active");
            $('.subject-modify-1').text("ẩn bớt");
        }else{
            toggle_subject_content_more[id-1]=false;
            $('.subject-more-1').removeClass("subject-box-content-more-active");
            $('.subject-modify-1').text("xem thêm");
        }
        
    }else if(id===2){
        if(toggle_subject_content_more[id-1]===false){
            toggle_subject_content_more[id-1]=true;
            $('.subject-more-2').addClass("subject-box-content-more-active");
            $('.subject-modify-2').text("ẩn bớt");
        }else{
            toggle_subject_content_more[id-1]=false;
            $('.subject-more-2').removeClass("subject-box-content-more-active");
            $('.subject-modify-2').text("xem thêm");
        }
    }
}
/* new end */


/* Firebase tutorial */
//----------------Insert prosess------------------------
//Khai bao thu muc PMS7003 va cac thuoc tinh cua no
/*
firebase.database().ref('PMS7003').set({
  PM1: 123,
  PM2_5: 235,
  PM10: 100
});    */
/*
//----------------Get data------------------------------
firebase.database().ref('PMS7003/Current/').once('value').then(function(snapshot){
  document.getElementById('pm1').innerText = snapshot.val().PM1;
  document.getElementById('pm2_5').innerText = snapshot.val().PM2_5;
  document.getElementById('pm10').innerText = snapshot.val().PM10;
});   */

//----------------Update data---------------------------
/*
firebase.database().ref('PMS7003').update({
  PM1: 10.1,
  PM2_5: 25.5,
  PM10: 100.11
});      */

/*
//-----------------Delate data--------------------------
firebase.database().ref('PMS7003/PM1').remove();
*/

