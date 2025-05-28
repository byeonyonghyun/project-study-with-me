import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [applyDisabled, setApplyDisabled] = useState(false);

  useEffect(() => {
    if (!id) {
      alert("잘못된 접근입니다.");
      navigate("/board");
      return;
    }

    // 게시글 정보 가져오기
    fetch(`/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("게시글이 존재하지 않습니다.");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        alert(err.message);
        navigate("/board");
      });

    // 현재 로그인한 사용자 정보 가져오기
    fetch("/users/me")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [id, navigate]);

  if (!post) return <div>로딩중...</div>;

  const isAuthor = user && user.id === post.author?.id;

  const handleApply = () => {
    if (window.confirm("이 모집글에 지원하시겠습니까?")) {
      fetch(`/notifications/apply/${id}`, { method: "POST" })
        .then((res) => {
          if (res.ok) {
            alert("✅ 지원 완료! 작성자에게 알림이 전송되었습니다.");
            setApplyDisabled(true);
          } else {
            alert("❌ 지원 실패 (이미 지원했거나 오류)");
          }
        })
        .catch(() => alert("서버 오류가 발생했습니다."));
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      fetch(`/posts/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            alert("✅ 삭제 완료");
            navigate("/board");
          } else {
            alert("❌ 삭제 실패");
          }
        })
        .catch(() => alert("서버 오류가 발생했습니다."));
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // 수정 페이지 경로 예시, 필요에 맞게 수정하세요
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📄 모집 글 상세</h2>

      <div>
        <h3>{post.title}</h3>
        <p>
          <strong>분야:</strong> {post.category}
        </p>
        <p>
          <strong>진행 방식:</strong> {post.progressType}{" "}
          {post.region ? `(${post.region})` : ""}
        </p>
        <p>
          <strong>모집 인원:</strong> {post.recruitNum}
        </p>
        <p>
          <strong>진행 요일:</strong> {post.days || "미정"}
        </p>
        <p>
          <strong>시간대:</strong> {post.timeSlot || "미정"}
        </p>
        <p>
          <strong>마감일:</strong> {post.deadline || "없음"}
        </p>
        <p>
          <strong>태그:</strong> {post.tags || "없음"}
        </p>
        <p>
          <strong>상태:</strong> {post.status}
        </p>
        <hr />
        <p
          dangerouslySetInnerHTML={{
            __html: post.content.replaceAll("\n", "<br />"),
          }}
        />
        <p className="text-end text-muted">작성일: {post.createdAt}</p>
      </div>

      <div className="mt-4">
        {!isAuthor && (
          <button
            className="btn btn-success mt-3"
            onClick={handleApply}
            disabled={applyDisabled}
          >
            🙋 지원하기
          </button>
        )}
        {isAuthor && (
          <>
            <button className="btn btn-warning" onClick={handleEdit}>
              ✏️ 수정하기
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑 삭제하기
            </button>
          </>
        )}
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/board")}
        >
          ⬅ 게시판으로
        </button>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => navigate("/main")}
        >
          🏠 메인으로
        </button>
      </div>
    </div>
  );
}