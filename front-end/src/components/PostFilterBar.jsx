import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import './PostFilterBar.css'

export default function PostFilterBar({onFilterChange, onSearch}){
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [searchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useState("");

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        onFilterChange(cat);
    }

    const handleSearchClick = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    } 

    return (
        <div className="Background">
            <div className="filter-bar d-flex align-items-center justify-content container">
                <div className="categories d-flex gap-2 mb-2 mb-ms-0">
                    {/*["Dòng dưới là một mảng danh mục"] .map() là cách react lặp qua mảng để render ra nhiều phần tử button, cat là tên đại diện, mỗi cat sẽ là một nút bấm. */}
                    {["Tất cả", "Món ăn mới", "Món ăn sáng", "Đồ uống", "Tráng miệng"].map(
                        (cat) => (
                            <button 
                                key={cat}
                                className={`btn btn-dark btn-sm ${
                                selectedCategory === cat ? "active" : ""
                                }`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </button>
                        )
                    )}
                </div>

                <form className="search-bar position-relative" onSubmit={handleSearch}>{/*onSubmit khi nhấn enter trong ô tìm kiếm, form sẽ gọi hàm handleSearch để xử lý tìm kiếm */}
                    <input type="text"
                        className={`form-control search-input ${
                            searchVisible ? "Show" : "hide"
                        }`}//hiển thị hoặc ẩn ô tùy biến
                        placeholder="Tìm kiếm món ăn..."
                        value={query}//Biến lưu nội dụng người nhập
                        onChange={(e) => setQuery(e.target.value)} //Mỗi khi nhập chữ, cập nhật lại state query
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleSearchClick}
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
        </div>
    )
}