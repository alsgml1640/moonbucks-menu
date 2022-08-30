/**
## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

- [x] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
  - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
  - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
- [x] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
  - [x] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.
- [x] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
  - [x] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
- 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

 */

const $ = (selector) => document.querySelector(selector);

function App() {
  const newItemMenu = (name) => {
    return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
  };

  const addNewMenu = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴 이름을 입력하지 않았습니다!");
      return;
    }

    $("#espresso-menu-list").insertAdjacentHTML(
      "afterbegin",
      newItemMenu($("#espresso-menu-name").value)
    );
    $("#espresso-menu-name").value = "";
  };

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addNewMenu();
    $(".menu-count").innerHTML = `총 ${
      document.querySelectorAll("#espresso-menu-list li").length
    }개`;
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNewMenu();
    $(".menu-count").innerHTML = `총 ${
      document.querySelectorAll("#espresso-menu-list li").length
    }개`;
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.parentElement.children[0].innerHTML;

      const updatedName = prompt("변경할 메뉴 이름???", menuName);
      if (updatedName) {
        e.target.parentElement.children[0].innerHTML = updatedName;
      } else {
        alert("빈칸입니다");
      }
    }

    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("삭제하시겠습니까?")) {
        $("#espresso-menu-list").removeChild(e.target.parentElement);
      }
    }
  });
}

App();
