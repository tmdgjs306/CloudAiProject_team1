/* ============================= 프로필 이미지 =================================== */

const userProfile = document.getElementById('userProfile');
const selectProfile = document.getElementById('selectProfile');

userProfile.addEventListener("click",function () {
    if (hostId !== loggedId) {
        alert("프로필을 수정할 수 없습니다.");
        return false;
    }
    $("#selectProfile").trigger('click');
    console.log("클릭됨!");
});

// 프로필 이미지를 바꾸는 코드
selectProfile.addEventListener("change",function (e) {
            const file = e.target.files[0];
            if(!file.type.match("image.*")) {
                alert("이미지 파일만 가능합니다.");
                return false;
            }
            const profileImageForm = $("#profileImageForm")[0];
            const formData = new FormData(profileImageForm);
            $.ajax({
                url: `/api/user/${loggedId}/profileImageUrl`,
                data: formData,
                contentType : false, // x-www-form-urlEncoded 되는거 막기
                processData: false, // query string parsing 되는거 막기
                method: "PUT",
                success: function (response) {
                    console.log("파일 변환 성공 ===", response);
                    const fileReader = new FileReader();
                    console.log("fileReader ===", fileReader);
                    fileReader.onload = function () {
                        console.log("파일 변경");
                        $("#userProfileImage").attr("src", "/upload/" + response.userInfo.profileImageUrl);
                    }
                    fileReader.readAsDataURL(file); // onload 이벤트 발생
                }
            })
        })


/* ============================= 팔로우 =================================== */

$("body").on("click", ".btnFollow", function () {
    const follow = $(this).data("follow");
    const _this = $(this);
    const id = $(this).data("idx");
    // console.log("follow ==", follow);
    if (follow === "follow") {
        $.ajax({
            url: "/api/follow/" + id,
            method: "POST",
            success: function (response) {
                console.log(response);
                _this.data("follow", "unFollow");
                _this.text("팔로잉");
            }
        })
        console.log("팔로우!!");
    } else {
        $.ajax({
            url: "/api/follow/" + id,
            method: "DELETE",
            success: function (response) {
                console.log(response);
                _this.data("follow", "follow");
                _this.text("팔로우");
            }
        });
        console.log("언팔로우!!");
    }
});
const followerModal = new bootstrap.Modal("#followerModal");
$(".followerCount").on("click",function(){
    followerModal.show();
    $.ajax({
        url:`/api/user/${hostId}/follow`,
        success:function(response){
            console.log(response);
            let tempHtml = "";
            if(response.followerList.length === 0) {
                tempHtml="<p>팔로우하는 사람이 없습니다.</p>"
            } else {
                $.each(response.followerList,function(idx,item){
                    const profileImageUrl = item.profileImageUrl;
                    const nickname = item.nickname;
                    const equalState = item.equalState;
                    const followState= item.followState;
                    let btn = "";
                       /* if(equalState !== "1" && followState !== "1") {
                            btn = `<button class="btn btn-dark" id="btnFollow" data-follow="unFollow" data-idx="${item.id}">삭제</button>`;
                        }*/
                    tempHtml+=`<li>
                            <span><img src="/upload/${profileImageUrl}" class="thumb" alt=""></span>
                            <span class="nickname">${nickname}</span>
                            ${btn}
                        </li>`
                });
            }
            $(".followerList").html(tempHtml);
        }
    })
});

