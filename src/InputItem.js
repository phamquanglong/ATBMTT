import { Button, Table, Typography, Input } from "antd";

const { Title, Paragraph } = Typography;
var InputItem = (props) => {
  var {
    title,
    val,
    setValue,
    disabled,
    colorName,
    fontSizeName,
    fontWeightName,
  } = props;

  return (
    <div style={styles.div}>
      <Paragraph
        style={{
          color: colorName,
          fontSize: fontSizeName,
          fontWeight: fontWeightName,
          minWidth: 250,
          textAlign: "flex-start",
          margin: 0,
        }}
      >
        {title}
      </Paragraph>
      <Input
        value={val}
        onChange={(text) => setValue(text.target.value)}
        contentEditable={disabled}
        style={{color: colorName, fontWeight: fontWeightName, fontSize: fontSizeName}}
      />
    </div>
  );
};

var styles = {
  div: {
    flex: 1,
    margin: 10,
    display: "flex",
    alignItems: "center",
  },
};

export default InputItem;
