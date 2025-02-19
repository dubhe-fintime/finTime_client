//암호화
function generateSHA256(input) {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

//ESC시 Modal창 닫기
function escCloseModal() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        CloseModal();
      }
    });
  }

// 모달창 닫기 //지우는 곳 
function CloseModal(id = undefined) {
    if (id) {
      $(`#${id}`).remove()
      $("body").css("overflow", "auto");
      $(".dimmed:last").remove();
    } else {
      $("body").css("overflow", "auto");
      $(".dimmed").remove();
    }
  
  }
  

// 모달창 열기
function OpenModal(
  title = "", //모달 타이틀
  id = "", // 고유 Id
  isConfirm = true, // 컨펌버튼 표시여부
  isCancle = true, // 취소버튼 표시여부
  confirmFn, // 컨펌 버튼에 전달할 함수
  confirmText = "확인", // 컨펌 버튼 텍스트
  cancleText = "취소", // 취소 버튼 텍스트
  closeBtn = false, // 우측상단 닫기버튼 표시여부
  size = "md", //모달 사이즈 "md" / "lg"
  response_data = null
) {
  let contents = response_data;

  $("body").css("overflow", "hidden")
    .append(`<div class="dimmed"><div class='modal ${size}' id='${id}'>
      <div class="top">
          <h2 class="title">${title}</h2>
          ${
            closeBtn
              ? `<button class="close-btn" onclick="CloseModal('${id}')">닫기</button>`
              : ""
          }
      </div>
      <div class="contents">${contents}</div>
      ${
        isConfirm || isCancle
          ? `<div class="btn-wrap">
          ${
            isCancle
              ? `<button class="btn secondary md"  onclick="CloseModal()">${cancleText}</button>`
              : ""
          }
          ${
            isConfirm
              ? `<button class="btn primary  md" onclick='${
                  confirmFn
                    ? confirmFn
                    : title === "발동 카드 정의 / 시나리오 구성"
                    ? 'location.href = "/scenario/create.html"'
                    : "CloseModal()"
                }'>${confirmText}</button>`
              : ""
          }</div>`
          : ""
      }
      </div></div>`);
}
