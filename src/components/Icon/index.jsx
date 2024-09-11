const Icon = ({ type }) => {
  return (
    <img
      src={process.env.PUBLIC_URL + `/icons/${type}.png`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  );
};

export default Icon;
