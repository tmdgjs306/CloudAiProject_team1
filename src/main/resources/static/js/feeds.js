let loadPage = 0;
let totalPages = 0;

loadFeed();
function loadFeed() {
    $.ajax({
        url: `/api/feedList?page=${loadPage}`,
        success: function (response) {
            console.log(response);
            let tempHtml = "";
            totalPages = response.feedList.totalPages - 1;
            $.each(response.feedList.content, function (idx, item) {
                const likesState = item.likesState;
                let comments = "";
                $.each(item.comments, function (idx02,item02) {
                    comments+=`
                            <li class="d-flex mb-1" data-idx="${item02.id}">
                            <span class="profileImage"><img src="/upload/${item02.user.profileImageUrl}" alt=""></span>
                                <span class="writer mx-1">${item02.user.nickname}</span>
                                <span class="content mx-2">${item02.content}</span>
                                ${item02.user.id === loggedId?`<button class="btn btn-close btn-sm"></button>`:``}
                            </li>`
                });
                tempHtml += `
                       <li data-feed="${item.id}">
                          <!-- 상단 글쓴 사람 정보-->
                           <div class="feedListBox mt-5">
                                <div class="myPageHeader">
                                    <img src="/upload/${item.user.profileImageUrl}" alt="">
                                    <span>${item.user.nickname}</span>
                                </div>
                           <!-- 이미지 불러오는 곳 -->
                                <div class="contentImage">
                                     <img src="/upload/${item.imageUrl}" alt="">
                                </div>
                           <!-- 좋아요, 댓글 icon -->
                                <div class="likeBox p-3">
                                     <span class="icon" data-state = ${likesState? "like" : "hate"}>
                                        ${likesState?`<i class = "bi bi-heart-fill text-danger fs-3"></i>`:`<i class="bi bi-heart fs-3"></i>`}
                                     </span>
                                </div>
                                <div class="likesTotal">
                                    <span class="likeNum">
                                    <a href="/api/likeList">
                                    <span class="likeText">
                                    좋아요 <span>${item.likesTotal}</span>개
                                    </span>
                                    </a>
                                    </span>
                                </div>
                           <!-- 댓글 -->
                                <div class="commentListBox p-3">
                                    <ul class="commentList">
                                        ${comments}
                                    </ul>
                                </div>
                                <div class="mb-3 commentsBox p-3">
                                    <textarea class="form-control" id="commentArea" placeholder="댓글 달기..." autocomplete="off" rows="1"></textarea>
                                    <div class="btnComment btn btn-dark mx-2" tabindex="0">게시</div>
                                </div>
                           </div>
                       </li>
                            `
            });
            $(".followerFeedList").append(tempHtml);
        }
    });
}

$("body").on("click",".icon",function(){
    console.log("icon click");
    const selectedImage =  $(this).closest("li").data("feed");
    const heart = $(this).find("i");
    const _this = $(this);
    const _num = $(this).next();
    let num = parseInt(_num.text());
    if($(this).data("state") === "like") {
        $.ajax({
            method:"DELETE",
            url:`/api/feedList/${selectedImage}/likes`,
            success:function(response){
                console.log(response);
                _this.data("state","hate");
                heart.removeClass("bi-heart-fill");
                heart.removeClass("text-danger");
                heart.addClass("bi-heart");
                num--;
                _num.text(num);
            }
        });
    } else {
        $.ajax({
            method:"POST",
            url:`/api/feedList/${selectedImage}/likes`,
            success:function(response){
                console.log(response);
                _this.data("state","like");
                heart.addClass("bi-heart-fill");
                heart.addClass("text-danger");
                heart.removeClass("bi-heart");
                num++;
                _num.text(num);
            }
        });
    }
})
$("body").on("click",".commentList li .btn-close",function(){
    //console.log("삭제");
    const _parent = $(this).parent();
    const idx = _parent.data("idx");
    $.ajax({
        url:`/api/comment/${idx}`,
        method:"DELETE",
        success:function(response){
            if(response.delete === "ok") {
                _parent.remove();
            }
        }
    })
});
$("body").on("click",".commentBox .btnComment",function(){
    //console.log("코멘트 눌렀음...");
    const commentList = $(this).parent().prev().find(".commentList");

    const feedId = $(this).closest("li").data("feed");
    const comment =  $(this).prev().val();
    const commentBox = $(this).prev();

    const sendData = {
        content : comment,
        feedId : feedId
    }
    // imageId,memberId, content

    $.ajax({
        url:"/api/comment",
        method:"POST",
        data:sendData,
        success:function(response){
            console.log(response);
            if(response.insert === "ok") {
                const insertItem = `
                            <li class="d-flex mb-1" data-idx="${response.comments.id}">
                                <span class="profileImage"><img src="/upload/${response.comments.user.profileImageUrl}"></span>
                                <span class="writer mx-1">${response.comments.user.nickname}</span>
                                <span class="content mx-2">${response.comments.content}</span>
                                <button class="btn btn-close btn-sm"></button>
                            </li>`;
                commentList.prepend(insertItem);
                commentBox.val("");
            }
        }
    });
});
$(window).on("scroll",function(){
    // console.log("$(window).height()===",$(window).height());
    // console.log("$(document).height()===",$(document).height());
    // console.log("$(window).scrollTop()===",$(window).scrollTop());
    const wh = $(window).height();
    const dh = $(document).height();
    const st = $(window).scrollTop();
    if(wh+st >= dh - 100) {
        loadPage++;
        loadFeed();
        if(loadPage>=totalPages) {
            $(window).off("scroll");
            $(".btn-more").hide();
        }
    }
});