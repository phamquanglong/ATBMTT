import MenuUI from "./MenuUI";
import { Typography, Button, Upload, message } from "antd";
import { useState, useRef } from "react";
import InputItem from "./InputItem";
import { convertToHtml } from "mammoth/mammoth.browser";

var CryptoJS = require("crypto-js");

const { Paragraph, Title } = Typography;

var DES = () => {
  var [valueA, setValueA] = useState("");
  var [valueB, setValueB] = useState("");
  var [encryptedText, setEncryptedText] = useState("");
  var [decryptedText, setDecryptedText] = useState("");

  var [docxDiv, setDocxDiv] = useState();

  function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    setEncryptedText(encrypted.toString());
  }

  /**
   * @param  {String} ciphertext
   * @param  {String} key
   * @return {String}
   *
   * @author Sun
   * @version 2013-5-15
   */
  function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);

    var decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
      },
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    setDecryptedText(decrypted.toString(CryptoJS.enc.Utf8));
  }

  var validate = (n) => {
    if (valueA === "") alert("Thông tin cần mã hoá không được bỏ trống");
    else if (valueB === "") alert("Khoá không được bỏ trống");
    // else n === 0 ? encrypted() : decrypted(encryptedText);
    else
      n === 0
        ? encryptByDES(valueA, valueB)
        : decryptByDES(encryptedText, valueB);
  };

  var readTxtFile = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setValueA(event.target.result);
    };

    reader.readAsText(file);
  };

  function readDocFile(file) {
    let reader = new FileReader();
    const fileByteArray = [];

    reader.readAsArrayBuffer(file);
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const arrayBuffer = evt.target.result,
          array = new Uint8Array(arrayBuffer);
        for (const a of array) {
          fileByteArray.push(a);
        }

        console.log(fileByteArray);

        convertToHtml({ arrayBuffer: fileByteArray })
          .then(function (result) {
            setDocxDiv(result.value)
            var messages = result.messages; // Any messages, such as warnings during conversion
            console.log(messages);
          })
          .done();
      }
    };

  }

  return (
    <div style={styles.container}>
      <MenuUI selectedKey={"2"} />
      <div style={styles.div}>
        <Title level={2} style={styles.title}>
          Mã hoá DES
        </Title>
        {docxDiv === undefined ? <InputItem
          title="Nhập thông tin cần mã hoá"
          val={valueA}
          setValue={setValueA}
          rowsCount={2}
        /> : <div style={styles.docxDiv} dangerouslySetInnerHTML={{__html: docxDiv}}></div>}
        <InputItem title="Nhập khoá" val={valueB} setValue={setValueB} />
        <div>
          <div style={styles.button}>
            <input
              onChange={(e) => {
                e.target.files[0].name.includes(".txt")
                  ? readTxtFile(e)
                  : readDocFile(e.target.files[0]);
              }}
              type="file"
            />
            <div style={{ flex: 1 }}></div>
            <Button onClick={() => validate(0)} type="primary">
              Mã hoá
            </Button>
          </div>
          {encryptedText.length > 0 && (
            <div>
              <InputItem title="Bản mã" disabled={false} val={encryptedText} />
              <div style={styles.button}>
                <Button onClick={() => validate(1)} type="primary">
                  Giải mã
                </Button>
              </div>
              {decryptedText.length > 0 && (
                <InputItem
                  title="Bản rõ"
                  val={decryptedText}
                  disabled={false}
                  rowsCount={2}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

var styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
  div: {
    // alignItems: "center",
    display: "flex",
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 200,
    paddingRight: 200,
    flexDirection: "column",
  },
  title: {
    color: "#1890ff",
    textAlign: "center",
  },
  button: {
    margin: 10,
    flex: 1,
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
  },
  upload: {
    marginRight: 10,
  },
  input: {
    visibility: "hidden",
  },
  docxDiv: {
    maxWidth: "70%"
  }
};

export default DES;
