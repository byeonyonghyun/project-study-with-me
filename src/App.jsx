import React from "react";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Footer from "./components/Footer";



// 예시 게시글 데이터 (기존 스크립트에서 가져옴)
const posts = [
  {
    title: "📚 토익 스터디 모집 (중급반)",
    region: "서울 강남구",
    category: "스터디",
    imageUrl:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
    deadline: "2025-05-20T18:00:00",
  },
  {
    title: "자바 웹 개발 프로젝트 팀원 구해요!",
    region: "서울 관악구",
    category: "프로젝트",
    imageUrl: "https://cdn.okky.kr/static/og/articles/1260509",
    deadline: "2025-05-25T23:59:00",
  },
  {
    title: "📝 1일 1문제 알고리즘 스터디",
    region: "온라인",
    category: "스터디",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    deadline: "2025-05-22T09:00:00",
  },
  {
    title: "React 프론트엔드 사이드 프로젝트",
    region: "부산 해운대구",
    category: "프로젝트",
    imageUrl:
      "https://images.unsplas h.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    deadline: "2025-05-28T18:00:00",
  },
  {
    title: "공시생 모임 (소통 + 동기부여)",
    region: "대전 유성구",
    category: "스터디",
    imageUrl:
      "https://eventusstorage.blob.core.windows.net/evs/Image/kokkirimentalcare/56637/ProjectInfo/Cover/9677998b50dc4a6d888438b04d3616f0.png",
    deadline: "2025-05-30T20:00:00",
  },
];

export default function App() {
  return (
    <>
      <Header />
      <div id="content_wrap">
        <div className="content">
          {/* 인기 모집글 */}
          <PostList posts={posts} title="🔥 인기 모집글" />
        </div>
        <div className="content">
          {/* 실시간 모집글 - 데이터 예시로 동일 배열 사용, 필요하면 분리하세요 */}
          <PostList posts={posts} title="⏰ 실시간 모집글" />
        </div>
      </div>
      <Footer />
    </>
  );
}