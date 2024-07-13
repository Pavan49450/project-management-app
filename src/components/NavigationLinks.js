const { useNavigate } = require("react-router-dom");
const { default: CustomImage } = require("../ui/Image/Image");

const NavigationLinks = ({ navigationData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center">
      {navigationData.map((item, index) => (
        <div className="flex gap-2 items-center">
          <span
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => {
              navigate(item.to);
            }}
          >
            {item.label}
          </span>
          {item.iconSrc && (
            <CustomImage
              src={require(`../assets/icons/${item.iconSrc}`)}
              className="w-3"
              alt={item.alt}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigationLinks;

// Usage in App.js
