
import './Slider.css';
import slider1 from '../assets/Image/Slider.jpg';

export default function Slider() {
  return (
    <div className="slider-container">
      <img src={slider1} alt="Slider" className="slider-img" />
      <div className="slider-text">
        <div className="text1">Chào mừng đến với Website Nấu Ăn</div>
        <div className="text2"> Khám phá công thức ngon và dễ làm tại nhà!</div>
      </div>
    </div>
  );
}
