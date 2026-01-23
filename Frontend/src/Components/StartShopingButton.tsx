import "../css/Start-Shopping-Button.css";

interface Props {
  title: string
}

const StartShopingButton = ({title} : Props) => {
  return (
    <button type="button" className="btn">
      <strong>{title}</strong>
      <div id="container-stars">
        <div id="stars"></div>
      </div>
      <div id="glow">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </button>
  );
};

export default StartShopingButton;
