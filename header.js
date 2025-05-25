const header = document.getElementById('header');
let lastScrollY = window.scrollY;
const stickyThreshold = 200; // 이 값 이상 스크롤되면 헤더 고정

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // 특정 높이 이상일 때만 헤더 고정
  if (currentScrollY > stickyThreshold) {
    header.classList.add('header--fixed');

    // 스크롤 방향 판단
    if (currentScrollY > lastScrollY) {
      // 아래로 스크롤 → 보이게
      header.classList.remove('header--hidden');
    } else {
      // 위로 스크롤 → 숨김
      header.classList.add('header--hidden');
    }
  } else {
    // 기준 미만이면 초기 상태로
    header.classList.remove('header--fixed', 'header--hidden');
  }

  lastScrollY = currentScrollY;
});
