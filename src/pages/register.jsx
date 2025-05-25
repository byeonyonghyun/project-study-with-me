import { Link } from 'react-router-dom';
import './register.css';
import '../set.css';

export default function Register() {
  return (
    <div id="register_wrap">
      <h1 className='title'>회원가입</h1>
      <form action="/users/register" method="post" id="sign_up_inner">
        <input type="text" name="name" className="user_form" placeholder="이름" required />
        <input type="text" name="age" className="user_form" placeholder="나이" required />
        <select name="gender" id="user_gender" required>
          <option value="" disabled selected>성별</option>
          <option value="FEMALE">여자</option>
          <option value="MALE">남자</option>
        </select>
        <input type="text" name="nickname" className="user_form" placeholder="닉네임" required />
        <input type="password" name="password" className="user_form" placeholder="비밀번호" required />
        <input type="email" name="email" className="user_form" placeholder="이메일" required />
        <input type="text" name="job" className="user_form" placeholder="직업" required />
        <input type="text" name="major" className="user_form" placeholder="전공 (선택)" />
        <input type="text" name="interest" className="user_form" placeholder="관심분야" required />
        <input type="submit" value="회원가입" />
      </form>
      
      <Link to="/login" className="back_home">
        <i className="fa-solid fa-chevron-left"></i> 로그인 페이지로 이동
      </Link>
    </div>
  );
}