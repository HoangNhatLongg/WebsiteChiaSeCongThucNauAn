import { useState } from "react";
import PostFilterBar from "../../components/PostFilterBar";
import PostList from "../../components/PostList";

export default function Home() {
  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");

  // 👉 Dữ liệu bài viết mẫu (theo format mới)
  const mockPosts = [
    {
      id: 1,
      name: "Bảo",
      avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
      time: "Hôm qua lúc 16:47",
      text: "Manifest: 3 tháng cuối năm công việc thuận lợi, tinh thần thoải mái, sức khoẻ dồi dào 💪",
      images: ["/images/Pho.jpg"],
      category: "Món ăn mới",
    },
    {
      id: 2,
      name: "Trang",
      avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
      time: "2 giờ trước",
      text: "Cuối tuần mình làm món bún chả, thơm lừng cả nhà 😋",
      images: ["/images/Pho.jpg", "/images/Anh1.jpg", "/images/Anh1.jpg", "/images/Anh1.jpg", "/images/Anh1.jpg"],
      videos: ["/videos/ThitKhoTieu.mp4"],
      category: "Món ăn trưa",
    },
    {
      id: 3,
      name: "Long",
      avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
      time: "3 ngày trước",
      text: "Cùng xem lại video hướng dẫn làm bánh flan siêu mịn nè 🎥",
      videos: ["/videos/ThitKho.mp4"],
      category: "Đồ ngọt",
    },
    {
      id: 4,
      name: "Linh",
      avatar: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
      time: "5 phút trước",
      text: "Hôm nay không nấu gì hết, nghỉ xả hơi 😄",
      category: "Tản mạn",
    },
  ];

  // 👉 Lọc bài viết theo danh mục + tìm kiếm
  const filteredPosts = mockPosts.filter((p) => {
    const matchCategory = filter === "Tất cả" || p.category === filter;
    const matchSearch =
      p.text.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="container py-4">
      <PostFilterBar onFilterChange={setFilter} onSearch={setSearch} />
      <PostList posts={filteredPosts} />
    </div>
  );
}
