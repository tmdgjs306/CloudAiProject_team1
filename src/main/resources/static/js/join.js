/*const token = $("meta[name='_csrf']").attr("content");
      const header = $("meta[name='_csrf_header']").attr("content");
      const name = $("#userName").val();*/
// csrf 토큰 설정


/* ------------------------------------- 아이디 중복체크 ----------------------------------------- */

let idCheck = 0; // 아이디 중복체크 결과 -> 중복이면 0, 아니면 1
let emailCheck = 0; // 이메일 중복체크 결과 -> 중복이면 0, 아니면 1
let passwordCheck = 0; // 비밀번호 일치체크 결과 -> 다르면 0, 일치하면 1

$(function () {
    $("#availableId").hide();
    $("#inAvailableId").hide();
    $("#isDuplicatedId").on("click",function (e) {
        console.log("아이디 중복체크");
        e.preventDefault(); // form 안에 버튼이라 submit 되는거 방지

        const url = "/auth/idCheck";
        const inputId = $("#userId").val(); // 아이디 입력란에 입력되는 값

        if(inputId === null || inputId === "") {
            $(".messageId").text("아이디는 필수 입력사항입니다.").addClass("invalid").removeClass("valid");
            $(".userId").focus();
            return false;
        }
        $.ajax({
            url: url,
            data: {
                duplicatedId : inputId // 입력된 값을 dupId 변수에 담기
            },
            success: function (data) {
                console.log(data);
                if (data === 1) {
                    $(".availableId").hide();
                    $(".inAvailableId").show();
                    $(".userId").focus();
                    idCheck = 0;
                    return false;
                    // 아이디가 중복되었을 때, 처리
                } else {
                    $(".inAvailableId").hide();
                    $(".availableId").show();
                    $(".userId").attr("readonly",true);
                    $("#isDuplicatedId").addClass("disabled");
                    $(".password").focus();
                    idCheck = 1;
                    // 아이디가 중복되지 않았을 때, 처리
                }
            }
        });
    });
});

/* --------------------------------------- 비밀번호 일치 ------------------------------------------ */
$(function () {
    $("#availablePwd").hide();
    $("#inAvailablePwd").hide();
    $(".passwordCheck").keyup(function () {

        const regPw = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$";
        const firstPw = $(".password").val();
        const pwdCheck = $(".passwordCheck").val();

        if(firstPw !== "" || pwdCheck !== "") {
            if(firstPw === pwdCheck) {
                $(".availablePwd").show();
                $(".inAvailablePwd").hide();
                passwordCheck = 1;
                $("#password").attr("readonly",true);
            } else {
                $(".inAvailablePwd").show();
                $(".availablePwd").hide();
                passwordCheck = 0;
                return false;
            }
        }
    });
});

/* ------------------------------------- 이메일 중복체크 ------------------------------------------ */
$(function () {
    $("#availableEmail").hide();
    $("#inAvailableEmail").hide();
    $("#isDuplicatedEmail").on("click",function (e) {
        console.log("이메일 중복체크");
        e.preventDefault();

        const url = "/auth/emailCheck";
        const inputEmail = $("#email").val(); // 이메일 입력란에 입력되는 값

        if(inputEmail === null || inputEmail === "") {
            $(".messageEmail").text("이메일은 필수 입력사항입니다.").addClass("invalid").removeClass("valid");
            $(".email").focus();
            return false;
        }
        $.ajax({
            url: url,
            data: {
                duplicatedEmail : inputEmail // 입력된 값을 dupEmail 변수에 담기
            },
            success: function (data) {
                console.log(data);
                if(data === 1) {
                    $("#availableEmail").hide();
                    $("#inAvailableEmail").show();
                    $(".email").focus();
                    emailCheck = 0;
                    // 이메일이 중복되었을 때, 처리
                }else {
                    $("#inAvailableEmail").hide();
                    $("#availableEmail").show();
                    $(".email").attr("readonly",true);
                    $("#isDuplicatedEmail").addClass("disabled");
                    emailCheck = 1;
                    // 이메일이 중복되지 않았을 때, 처리
                }
            }
        });
    });
});
/* ----------------------------------------- 주소 API --------------------------------------------- */
let isIDCheck=false;
function postcode() {
    new daum.Postcode({
        oncomplete : function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            const roadAddr = data.roadAddress; // 도로명 주소 변수
            const extraRoadAddr = ""; // 참고 항목 변수

            document.querySelector("#postcode").value = data.zonecode;
            document.querySelector("#address").value = roadAddr;
        },
    }).open();
}

$("#btnPostcode").on("click", function() {
    postcode();
    return false;
});
/* -------------------------------------------- 최종 가입 --------------------------------------------- */
$("#btnJoin").on("click",function (e) {
    console.log("가입 완료!");
    if(idCheck !== 1) {
        // 아이디 중복체크를 안하고 가입하기 버튼 누를시, 경고띄우기
        alert("아이디 중복체크는 필수입니다.");
        $("#btnIdCheck").focus();
    }
    else if(emailCheck !== 1) {
        // 이메일 중복체크를 안하고 가입하기 버튼 누를시, 경고띄우기
        alert("이메일 중복체크는 필수입니다.");
        $("#btnEmailCheck").focus();
    } else {
        alert("회원가입을 환영합니다.");
    }
});