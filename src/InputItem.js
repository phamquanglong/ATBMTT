import { Button, Table, Typography, Input } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input
var InputItem = (props) => {
  var {
    title,
    val,
    setValue,
    disabled,
    colorName,
    fontSizeName,
    fontWeightName,
    rowsCount,
    docxDiv
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
      {docxDiv !== undefined ? <div style={styles.docxDiv} dangerouslySetInnerHTML={{__html: docxDiv}}></div>
      : (rowsCount === undefined ? <Input
        value={val}
        onChange={(text) => setValue(text.target.value)}
        contentEditable={disabled}
        style={{color: colorName, fontWeight: fontWeightName, fontSize: fontSizeName}}
      /> : <TextArea rows={rowsCount} value={val}
      onChange={(text) => setValue(text.target.value)}
      contentEditable={disabled}/>)}
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
  docxDiv: {
    display: "flex",
    flex: 1,
    paddingTop: 10,
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    border: '1px solid rgb(217, 217, 217)',
    // backgroundColor: 'green'
  }
};

export default InputItem;
