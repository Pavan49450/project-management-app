import CustomImage from "../../ui/Image/Image";
import style from "./SignUpOrLoginContainer.module.css";

const SignUpOrLoginContainer = ({
  screenData,
  children,
  classForMainContent,
  classForScreen,
  smallFrame,
  classForFrame,
}) => {
  return (
    <div className={`${style.container} ${classForScreen}`}>
      <div
        className={`${style.frame} ${classForFrame}`}
        // style={{ width: smallFrame ? "50vw" : "100%" }}
      >
        <div className={style.content}>
          {/* <h1>{screenData.title}</h1> */}
          <p className={style.description}>{screenData.description}</p>
        </div>
        <CustomImage
          src={require(`../../assets/screenContainers/${screenData.image}`)}
          alt=""
          classForDiv={style.screenImage}
          className={style.image}
        />
      </div>
      <div
        className={`${style.mainContent} ${classForMainContent}`}
        // style={{ width: smallFrame ? "100%" : "50vw" }}
      >
        {children}
      </div>
    </div>
  );
};

export default SignUpOrLoginContainer;
