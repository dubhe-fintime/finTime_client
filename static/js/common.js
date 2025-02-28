//암호화
function generateSHA256(input) {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

//페이지 이동
function goTopage(target){
  $(".content").removeClass("shift")
  $(".lnb").removeClass("active")
  window.location.href = "/" + $(target).attr("id").replace("Btn","")

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



//인풋 입력시
function ChangeInput(id) {
  if ($(`#${id}`).val().length > 0) {
    $(`#${id}`).next($(".delete-btn")).show();
  } else {
    $(`#${id}`).next($(".delete-btn")).hide();
  }
}

// 인풋 포커스시
function FocusInput(id) {
  if ($(`#${id}`).prop('tagName') == 'TEXTAREA') {
    $(`#${id}`).css("border-color", "var(--blue900)");
  }
  $(".input-wrap").css("border-color", "var(--grey250)");
  $(`#${id}`).parent().css("border-color", "var(--blue900)");
}

// 인풋 포커스 해제시
function BlurInput(id) {
  const timer = setTimeout(() => {
    if (!$(".input").is(":focus")) {
      $(`#${id}`).parent().css("border-color", "var(--grey200)");
    } else {
      $(`#${id}`).css("border-color", "var(--grey200)");
    }
    clearTimeout(timer);
  }, 10);
}

// 인풋 value 삭제버튼
function DeleteInput(id) {
  $(`#${id}`).focus();
  $(`#${id}`).val("");
  $(`#${id}`).next($(".delete-btn")).hide();
}


//셀렉트박스 옵션 클릭시 (name 부여)
function ClickSelectOption(id, option, name, name2 = undefined) {
  if (id.includes('step')) {
    $(`#${id}`).attr('data', option);
  }
  $(`#${id}`).text(option);
  $(`#${id}`).attr('name', name);
  $(`#${id}`).attr('data-id', name2);
  $(`#${id}`).removeClass("on");
  $(`#${id}`).next().hide();
}

//셀렉트박스 라벨 클릭시
function ClickSelectLabel(id, id2) {
  if ($(`#${id}`).next().is(":visible")) {
    $(`#${id}`).removeClass("on");
    $(`#${id}`).next().hide();
  } else {
    $(".label").removeClass("on");
    $(`.options[data-id='${id}']`).not($(".options").hide());
    $(`#${id}`).addClass("on");
    $(`#${id}`).next().show();
    //신규 카드 추가 -> 선택 항목 설정
    $(`#${id2}`).text('유형 선택');
  }
}


// 체크박스 클릭 (단일 체크만)
function ChangeCheckBox(id) {
  $(`input`).prop('checked', false)
  $(".checked").removeClass('checked');

  if (id === "allCheck") {
    if ($(`#${id}`).next().hasClass("checked")) {
      $(".checkbox-label").removeClass("checked");
    } else {
      $(".checkbox-label").addClass("checked");
    }
  } else {
    $(`#${id}`).next().toggleClass("checked");
    $(`input#${id}:input`).prop("checked", true)
  }
}

// 체크박스 (다중 체크시)
function ChangeCheckBox2(id) {
  if (id === "allCheck") {
    if ($(`#${id}`).next().hasClass("checked")) {
      $(".checkbox-label").removeClass("checked");
    } else {
      $(".checkbox-label").addClass("checked");
    }
  } else {
    if ($(`label[for="${id}"]`).hasClass('checked')) {
      $(`label[for="${id}"]`).removeClass('checked')
      $(`input#${id}:input`).prop("checked", false)
      $(`input#${id}:input`).attr("flag", "Y")
    }
    else {
      $(`#${id}`).next().toggleClass("checked");
      $(`input#${id}:input`).prop("checked", true)
      $(`input#${id}:input`).attr("flag", "N")
    }
  }
  console.log($(`#${id}`).prop("checked"))
}
