window.onload = function(){
  // 문서 내에서 .section 클래스를 가진 구문을 검색한다.
  const elm = document.querySelectorAll('.section');
  const elmCount = elm.length;
  elm.forEach(function(item, index){
    // 마우스 휠 이벤트 가져오기
    item.addEventListener('mousewheel', function(event){
      event.preventDefault();

      // 현재 섹션 위치를 저장 할 변수 선언
      let delta = 0;

      if (!event) event = window.event;
      if (event.wheelDelta) {
          delta = event.wheelDelta / 120;
          if (window.opera) delta = -delta;
      } 
      else if (event.detail)
          delta = -event.detail / 3;

      let moveTop = window.scrollY;
      let elmSelector = elm[index];

      // 휠을 내리면 다음 섹션으로 이동
      if (delta < 0){
        if (elmSelector !== elmCount-1){
          try{
            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
          }catch(e){}
        }
      }
      // 만약 휠을 위로 올렸다면, 이전 세션으로 이동
      else{
        if (elmSelector !== 0){
          try{
            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
          }catch(e){}
        }
      }
      
      // 이동시 움직임은 부드럽게 설정
      const body = document.querySelector('html');
      window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
    });
  });
}