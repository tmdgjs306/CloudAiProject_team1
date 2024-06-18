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
                tempHtml += `
                       <li data-image="${item.id}">
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
                           <!-- 좋아요!! -->
                                <div class="like-box p-3">
                                     <span class="icon" data-state = ${likesState? "like" : "hate"}>
                                        ${likesState?`<i class = "bi bi-heart-fill text-danger fs-3"></i>`:`<i class="bi bi-heart fs-3"></i>`}
                                     </span>
                                     <span class="num">${item.likesTotal}</span>
                                </div>
                           </div>
                       </li>
                            `
            });
            $(".feedList").append(tempHtml);
        }

    });
}

$("body").on("click",".icon",function(){
    console.log("icon click");
    const selectedImage =  $(this).closest("li").data("image");
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

$(".btn-more").on("click", function () {
    loadPage++;
    if(loadPage>=totalPages) {
        $(this).hide();
    }
    loadFeed();
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