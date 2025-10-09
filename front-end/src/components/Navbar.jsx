import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light    bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CookBook
        </a>

        {/* Nút toggle khi màn hình nhỏ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Danh mục menu */}
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="nav navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Giới thiệu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/recipes">
                Công thức
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Liên hệ
              </a>
            </li>
            <li className="nav-item-btn">
              <a href="/login" className="btn btn-dark no-style">
                Đăng nhập
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
