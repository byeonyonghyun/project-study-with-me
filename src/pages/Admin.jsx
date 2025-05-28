import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch('/admin/users');
      if (!res.ok) {
        alert('⛔ 관리자만 접근 가능합니다!');
        return;
      }
      const data = await res.json();
      setUsers(data);
      setVisible(true);
    } catch (err) {
      console.error(err);
      alert('서버 에러가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>📋 전체 유저 목록 (관리자 전용)</h2>
      <button onClick={fetchUsers}>유저 불러오기</button>
      <br /><br />

      {visible && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>직업</th>
              <th>권한</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>{user.job}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => navigate('/login')}>로그인 페이지로</button>
    </div>
  );
}