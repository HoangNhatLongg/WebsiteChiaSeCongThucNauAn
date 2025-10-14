import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FaThumbsUp, FaComment, FaShare, FaEllipsisH, FaFlag } from "react-icons/fa";

import "./PostList.css";

export default function PostList({ posts }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const videoRefs = useRef({});
  const navigate = useNavigate();


  const handleMediaClick = (media, id) => {
    if (media.type === "video" && videoRefs.current[id]) {
      const current = videoRefs.current[id].currentTime;
      setVideoTime(current); // lưu thời gian hiện tại
      videoRefs.current[id].pause();
    }
    setCurrentMedia({...media, id});
    setShowLightbox(true);
  };

  const handleOptionsClick = (postId) => {
    if (activeMenu === postId) {
      setActiveMenu(null);
      setShowReportMenu(false);
    } else {
      setActiveMenu(postId);
      setShowReportMenu(false);
    }
  };

    // Khi click Báo cáo bài viết
  const handleReportClick = () => {
    setShowReportMenu(true);
  };

    // Đóng tất cả menu
  const handleCloseMenus = () => {
    setActiveMenu(null);
    setShowReportMenu(false);
  };

  return (
    <div className="post-list mt-4">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {/* Header */}
          <div className="post-header">
            <img src={post.avatar} alt="avatar" className="post-avatar" />
            <div className="post-info">
              <h4
                className="post-name"
                onClick={() => navigate(`/profile/${post.userId}`)}
              >
                {post.name}
              </h4>
              <span>{post.time}</span>
            </div>

            <div className="post-options position-relative">
              <button
                className="dots-btn"
                onClick={() => handleOptionsClick(post.id)}
              >
                <FaEllipsisH />
              </button>

              {/* Menu ẩn/hiện khi click 3 chấm */}
              {activeMenu === post.id && (
                <div className="post-menu">
                  <button onClick={handleReportClick}>
                    <FaFlag /> Báo cáo bài viết
                  </button>
                  <button onClick={() => alert("Ẩn bài viết")}>
                    Ẩn bài viết
                  </button>
                </div>
              )}

              {/* Menu Báo cáo chi tiết */}
              {showReportMenu && activeMenu === post.id && (
                <div className="report-popup">
                  <h5>Báo cáo bài viết</h5>
                  <ul>
                    <li>Nội dung phản cảm</li>
                    <li>Tin giả hoặc sai sự thật</li>
                    <li>Bạo lực / 18+</li>
                    <li>Spam / Quảng cáo</li>
                    <li>Khác...</li>
                  </ul>
                  <button
                    className="close-report-btn"
                    onClick={handleCloseMenus}
                  >
                    Đóng
                  </button>
                </div>
              )}
            </div>
          </div>
          

          {/* Nội dung bài viết */}
          <div className="post-content">
            <p>{post.text}</p>

            {/* Hiển thị ảnh hoặc video */}
            {post.images && post.images.length > 0 && (
              <div className="post-media-grid">
                {post.images.slice(0, 3).map((img, index) => (
                  <div
                    key={index}
                    className="post-media-wrapper"
                    onClick={() => handleMediaClick({ type: "image", src: img })}

                  >
                    <img src={img} alt="post" className="post-media-item" />
                    {index === 2 && post.images.length > 3 && (
                      <div className="image-overlay">
                        +{post.images.length - 3}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {post.videos && post.videos.length > 0 && (
              <div className="post-media-grid">
                {post.videos.slice(0, 3).map((vid, index) => {
                  const videoKey = `${post.id}-${index}`; // ✅ Tạo key duy nhất cho từng video

                  return (
                    <div
                      key={index}
                      className="post-media-wrapper"
                      onClick={() => handleMediaClick({ type: "video", src: vid, id: videoKey }, videoKey)} // ✅ Truyền id đúng
                    >
                      <video
                        ref={(el) => (videoRefs.current[videoKey] = el)} // ✅ Gán ref đúng key
                        src={vid}
                        className="post-media-item-video"
                        muted
                        loop
                        onPlay={() => {
                          // Dừng các video khác đang phát
                          Object.keys(videoRefs.current).forEach((key) => {
                            if (key !== videoKey && !videoRefs.current[key].paused) {
                              videoRefs.current[key].pause();
                            }
                          });
                        }}
                      />
                      {index === 2 && post.videos.length > 3 && (
                        <div className="image-overlay">
                          +{post.videos.length - 3}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="post-footer">
            <div className="post-actions">
              <button>
                <FaThumbsUp /> Thích
              </button>
              <button>
                <FaComment /> Bình luận
              </button>
              <button>
                <FaShare /> Chia sẻ
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Lightbox (hiển thị ảnh/video phóng to) */}
      {showLightbox && currentMedia && (
        <div
          className="lightbox"
          onClick={(e) => {
            if (e.target.classList.contains("lightbox")) {
              const videoEl = document.querySelector(".lightbox video");
              const currentTime = videoEl ? videoEl.currentTime : 0;

              setShowLightbox(false);

              // 🔁 Khi đóng lightbox, phát lại video nhỏ ở đúng thời điểm
              if (currentMedia.type === "video" && videoRefs.current[currentMedia.id]) {
                const smallVid = videoRefs.current[currentMedia.id];
                smallVid.currentTime = currentTime;
                smallVid.play();
              }
            }
          }}
        >
          {/* 🆕 Nút điều hướng nếu có nhiều media */}
          {posts.some(p => (p.images?.length > 1 || p.videos?.length > 1)) && (
            <>
              <div
                className="lightbox-nav left"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: xử lý chuyển sang media trước
                }}
              >
                ‹
              </div>
              <div
                className="lightbox-nav right"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: xử lý chuyển sang media kế tiếp
                }}
              >
                ›
              </div>
            </>
          )}

          {currentMedia.type === "video" ? (
            <video
              src={currentMedia.src}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              onLoadedMetadata={(e) => {
                e.target.currentTime = videoTime; // tua tiếp từ vị trí dở
              }}
            />
          ) : (
            <img
              src={currentMedia.src}
              alt="large"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

    </div>
  );
}
