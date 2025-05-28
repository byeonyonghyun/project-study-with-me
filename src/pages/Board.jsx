import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../set.css';
import './Board.css';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const loadPosts = () => {
    fetch(`/posts?keyword=${encodeURIComponent(keyword)}&page=${currentPage}&size=5`)
      .then(response => {
        if (!response.ok) throw new Error('서버 오류 발생');
        return response.json();
      })
      .then(data => {
        setPosts(data.content || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch(err => {
        alert('게시글 목록을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      });
  };

  const handleSearch = e => {
    e.preventDefault();
    setCurrentPage(0);
    loadPosts();
  };

  return (
    <>
      <Header />
      <div id='post_wrap'>
        {/* 🔍 검색 */}
        <form onSubmit={handleSearch} className='post_search'>
          <input
            type="text"
            className="post_search_bar"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <button type="submit" className='search_btn'>검색</button>
        </form>

        {/* ✅ 게시글 테이블 */}
        <table className='Post_nav'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>분야</th>
              <th>진행 방식</th>
              <th>모집 인원</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>{post.category}</td>
                  <td>{post.progressType}</td>
                  <td>{post.recruitNum}</td>
                  <td>{post.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ⏩ 페이징 */}
        <nav>
          <ul>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/write" className="link-button">✏ 글쓰기</Link>
        <Link to="/main" className="link-button">메인으로</Link>
      </div>
    </>
  );
}