import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    nickname: "",
    email: "",
    job: "",
    major: "",
    interest: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/users/me")
      .then((res) => {
        if (!res.ok) throw new Error("로그인 필요");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          nickname: data.nickname || "",
          email: data.email || "",
          job: data.job || "",
          major: data.major || "",
          interest: data.interest || "",
          role: data.role || "",
        });
        setLoading(false);
      })
      .catch(() => {
        alert("⛔ 로그인 후 이용해주세요.");
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      name: formData.name,
      age: formData.age === "" ? null : formData.age,
      gender: formData.gender,
      job: formData.job,
      major: formData.major,
      interest: formData.interest,
    };

    fetch("/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ 수정 완료!");
        } else {
          alert("❌ 수정 실패. 다시 시도해주세요.");
        }
      })
      .catch(() => alert("서버 오류가 발생했습니다."));
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🙋‍♀️ 내 정보</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">이름</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">나이</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">성별</label>
          <input
            type="text"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">닉네임</label>
          <input
            type="text"
            name="nickname"
            className="form-control"
            value={formData.nickname}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="form-label">이메일</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="form-label">직업</label>
          <input
            type="text"
            name="job"
            className="form-control"
            value={formData.job}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">전공</label>
          <input
            type="text"
            name="major"
            className="form-control"
            value={formData.major}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">관심 분야</label>
          <input
            type="text"
            name="interest"
            className="form-control"
            value={formData.interest}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">권한</label>
          <input
            type="text"
            name="role"
            className="form-control"
            value={formData.role}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-success">
          정보 수정
        </button>
      </form>

      <hr className="my-4" />

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/main")}
        >
          ⬅ 메인으로
        </button>

        <form action="/users/logout" method="post">
          <button type="submit" className="btn btn-outline-danger">
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
}