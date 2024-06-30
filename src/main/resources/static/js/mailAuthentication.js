$("#btnSendAuthNum").on("click",function (e) {
    e.preventDefault();
    console.log("눌러짐");
    const inputEmail = $("#email").val(); // 이메일 입력란에 입력되는 값
    if(inputEmail === null || inputEmail === "") {
        alert("본인인증을 위해 이메일을 입력해주세요.");
        return false;
    }
    $.ajax({
        url: "/auth/confirmEmailAuthNum",
        data: {
            userEmail : inputEmail // 입력된 값을 userEmail 변수에 담기
        },
        success: function (data) {
            console.log(data);
            // 입력한 메일이 db에 없으면
            if(data === 0) {
                alert("등록되지 않은 이메일입니다.");
                return false;
                // 입력한 메일이 db에 있으면
            } else {
                $(".confirmAuthNum").removeClass("visually-hidden");
                $("#btnAuthConfirm").on("click",function() {
                    const inputNum = $("#authNum").val();
                    const email = $("#email").val();
                    $.ajax({
                        url: "/auth/confirmAuthNum",
                        data: {
                            authNum : inputNum ,// 입력된 값을 authNum 변수에 담기
                            userEmail : email
                        },
                        success: function (data) {
                            console.log(data);
                            if(data === 0) {
                                $("#messageAuthNum").text("잘못된 인증번호 입니다. 확인 후 재입력 해주세요.")
                                    .addClass("invalid").removeClass("valid");
                                $("#authNum").focus();
                            } else {
                                let url = "/auth/confirmUserId?email=" + email;
                                location.replace(url);
                            }
                        }
                    });
                });
            }
        }
    })
});