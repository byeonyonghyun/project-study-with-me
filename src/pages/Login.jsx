import { Link } from 'react-router-dom';
import "../set.css";
import "./login.css";

export default function Login() {
  return (
    <section id="login_wrap">
      <div id="login_box">
        <a href="/main.html" className="logo">Study With Me💻</a>
        <form id="login_box_inner" action="/users/login" method="post">
          <input type="email" name="email" placeholder="이메일" required />
          <input type="password" name="password" placeholder="비밀번호" required />
          <input type="submit" value="로그인" id="login_btn" />
        </form>
        <div id="login_footer">
          <a href="#">아이디(닉네임)찾기</a>
          <a href="#">비밀번호 찾기</a>
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </section>
  );
}