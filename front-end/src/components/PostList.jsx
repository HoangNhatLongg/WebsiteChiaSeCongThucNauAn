import { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import "./PostList.css";

export default function PostList({ posts }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);

  const handleMediaClick = (media) => {
    setCurrentMedia(media);
    setShowLightbox(true);
  };

  return (
    <div className="post-list mt-4">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {/* Header */}
          <div className="post-header">
            <img src={post.avatar} alt="avatar" className="post-avatar" />
            <div className="post-info">
              <h4>{post.name}</h4>
              <span>{post.time}</span>
            </div>
          </div>

          {/* Nội dung bài viết */}
          <div className="post-content">
            <p>{post.text}</p>

            {/* Hiển thị ảnh hoặc video */}
            {post.media && post.media.length > 0 && (
              <div className="post-media-grid">
                {post.media.slice(0, 3).map((m, index) => (
                  <div
                    key={index}
                    className="post-media-wrapper"
                    onClick={() => handleMediaClick(m)}
                  >
                    {m.type === "image" ? (
                      <img src={m.src} alt="post" className="post-media-item" />
                    ) : (
                      <video
                        src={m.src}
                        className="post-media-item"
                        muted
                        autoPlay
                        loop
                      />
                    )}

                    {index === 2 && post.media.length > 3 && (
                      <div className="image-overlay">
                        +{post.media.length - 3}
                      </div>
                    )}
                  </div>
                ))}
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
        <div className="lightbox" onClick={() => setShowLightbox(false)}>
          {currentMedia.type === "video" ? (
            <video src={currentMedia.src} controls autoPlay />
          ) : (
            <img src={currentMedia.src} alt="large" />
          )}
        </div>
      )}
    </div>
  );
}
