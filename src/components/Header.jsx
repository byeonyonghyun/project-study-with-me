import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../set.css";
import "../main.css";

export default function Header() {
  const [user, setUser] = useState(null); // 로그인 상태 저장
  const headerRef = useRef(null);
  let lastScrollY = 0;
  const stickyThreshold = 200;

  // ✅ 스크롤 이벤트 + 로그인 여부 체크
  useEffect(() => {
    lastScrollY = window.scrollY;

    // 로그인 상태 확인
    fetch('/users/me')
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      if (!header) return;

      if (currentScrollY > stickyThreshold) {
        header.classList.add("header--fixed");

        if (currentScrollY > lastScrollY) {
          header.classList.remove("header--hidden");
        } else {
          header.classList.add("header--hidden");
        }
      } else {
        header.classList.remove("header--fixed", "header--hidden");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" ref={headerRef}>
      <div className="logo">
        <Link to="/">Study With Me💻</Link>
      </div>
      <div id="menu">
        <ul id="menu_list">
          <li>
            <a href="#">스터디</a>
            <ul className="nav_list" id="study_nav">
              <li>
                <Link to="/board">모집 게시판</Link>
              </li>
              <li>
                <Link to="/write">스터디 작성</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">프로젝트</a>
            <ul className="nav_list" id="project_nav">
              <li>
                <Link to="/board">모집 게시판</Link>
              </li>
              <li>
                <Link to="/write">프로젝트 작성</Link>
              </li>
            </ul>
          </li>
          <li><a href="#">커뮤니티</a></li>
          <li><a href="#">공모전</a></li>
        </ul>
      </div>

      {/* ✅ 로그인 여부에 따른 링크 표시 */}
      <div id="login_link">
        {user ? (
          <Link to="/Mypage" className="btn btn-primary">마이페이지</Link>
        ) : (
          <Link to="/login" className="btn btn-outline-secondary">로그인</Link>
        )}
      </div>
    </header>
  );
}