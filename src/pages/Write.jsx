import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Write() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    category: 'STUDY',
    recruitNum: '',
    progressType: 'ONLINE',
    region: '',
    days: [],
    timeSlot: '',
    deadline: '',
    tags: '',
    content: ''
  });

  // 체크박스 처리
  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => {
      const days = checked
        ? [...prev.days, value]
        : prev.days.filter(day => day !== value);
      return { ...prev, days };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      ...form,
      recruitNum: parseInt(form.recruitNum, 10),
      days: form.days.length ? form.days.join(',') : null,
      region: form.region || null,
      timeSlot: form.timeSlot || null,
      deadline: form.deadline || null,
      tags: form.tags || null
    };

    fetch('/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(res => {
        if (res.ok) {
          alert('게시글 작성 완료!');
          navigate('/board');
        } else {
          alert('작성 실패. 로그인 여부를 확인하세요.');
        }
      })
      .catch(() => {
        alert('서버 오류가 발생했습니다.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">모집 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">제목</label>
          <input
            name="title"
            className="form-control"
            required
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">모집 분야</label>
          <select
            name="category"
            className="form-select"
            required
            value={form.category}
            onChange={handleChange}
          >
            <option value="STUDY">스터디</option>
            <option value="PROJECT">IT 프로젝트</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">모집 인원</label>
          <input
            type="number"
            name="recruitNum"
            className="form-control"
            required
            value={form.recruitNum}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">진행 방식</label>
          <select
            name="progressType"
            className="form-select"
            required
            value={form.progressType}
            onChange={handleChange}
          >
            <option value="ONLINE">온라인</option>
            <option value="OFFLINE">오프라인</option>
            <option value="MIXED">혼합</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">지역 (오프라인일 경우)</label>
          <input
            name="region"
            className="form-control"
            value={form.region}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">진행 요일</label>
          <div>
            {['월','화','수','목','금','토','일'].map(day => (
              <label key={day} className="me-2">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  checked={form.days.includes(day)}
                  onChange={handleDayChange}
                /> {day}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">시간대</label>
          <select
            name="timeSlot"
            className="form-select"
            value={form.timeSlot}
            onChange={handleChange}
          >
            <option value="">선택안함</option>
            {Array.from({ length: 14 }, (_, i) => 9 + i).map(hour => (
              <option key={hour} value={`${hour}시`}>{hour}시</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">모집 마감일</label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">관심 태그 (콤마로 구분)</label>
          <input
            name="tags"
            className="form-control"
            placeholder="예: Java,백엔드,자격증"
            value={form.tags}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">상세 정보</label>
          <textarea
            name="content"
            rows="6"
            className="form-control"
            required
            value={form.content}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">작성 완료</button>
      </form>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/main')}
      >
        ⬅ 메인으로
      </button>
    </div>
  );
}