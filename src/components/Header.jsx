import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../set.css"
import "../main.css"


export default function Header() {
  const headerRef = useRef(null);
  let lastScrollY = 0;
  const stickyThreshold = 200;

  useEffect(() => {
    lastScrollY = window.scrollY; // 초기값 설정

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      if (!header) return;

      if (currentScrollY > stickyThreshold) {
        header.classList.add("header--fixed");

        if (currentScrollY > lastScrollY) {
          // 아래로 스크롤 → 보이게
          header.classList.remove("header--hidden");
        } else {
          // 위로 스크롤 → 숨김
          header.classList.add("header--hidden");
        }
      } else {
        header.classList.remove("header--fixed", "header--hidden");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="header" ref={headerRef}>
      {/* ...기존 헤더 JSX 구조 넣기 */}
      <div className="logo">
        <a href="#">Study With Me💻</a>
      </div>
      <div id="menu">
        <ul id="menu_list">
          <li>
            <a href="#">스터디</a>
            <ul className="nav_list" id="study_nav">
              <li>
                <a href="./board.html">모집 게시판</a>
              </li>
              <li>
                <a href="./write.html">스터디 작성</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">프로젝트</a>
            <ul className="nav_list" id="project_nav">
              <li>
                <a href="./board.html">모집 게시판</a>
              </li>
              <li>
                <a href="./write.html">프로젝트 작성</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">커뮤니티</a>
          </li>
          <li>
            <a href="#">공모전</a>
          </li>
        </ul>
      </div>
      <div id="login_link">
        <Link to="/login">로그인</Link> {/* 이 부분이 핵심 */}
      </div>
    </header>
  );
}