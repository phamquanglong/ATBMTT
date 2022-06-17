import MenuUI from "./MenuUI";
import { Typography, Button, Upload, message } from "antd";
import { useState } from "react";
import InputItem from "./InputItem";
import { UploadOutlined } from "@ant-design/icons";

var CryptoJS = require("crypto-js");

const { Paragraph, Title } = Typography;

var DES = () => {
  var [valueA, setValueA] = useState("");
  var [valueB, setValueB] = useState("");
  var [encryptedText, setEncryptedText] = useState("");
  var [decryptedText, setDecryptedText] = useState("");

  var encrypted = () => {
    function encryptDesCbcPkcs7Padding(message, key) {
      var keyWords = CryptoJS.enc.Utf8.parse(key);
      var ivWords = CryptoJS.lib.WordArray.create([0, 0]);
      var encrypted = CryptoJS.DES.encrypt(JSON.stringify({message}), keyWords, { iv: ivWords }).toString();

      return encrypted;
    }

    var plainText = valueA;
    console.log("Bản rõ: ", plainText);
    var base64Coded = window.btoa(plainText);
    console.log("Base64 coded text: ", base64Coded);

    var encrypted = encryptDesCbcPkcs7Padding(base64Coded, valueB);
    console.log("Encrypted: ", encrypted);
    var finalEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    setEncryptedText(finalEncrypted);
    console.log(finalEncrypted)
  };

  var decrypted = (finalEncrypted) => {
    function decryptDesCbcPkcs7Padding(message, key) {
      var keyWords = CryptoJS.enc.Utf8.parse(key);
      var ivWords = CryptoJS.lib.WordArray.create([0, 0]);

      var decrypted = CryptoJS.DES.decrypt(message.toString(), keyWords, {
        iv: ivWords,
      }).toString(CryptoJS.enc.Utf8)

      return decrypted.toString(CryptoJS.enc.Utf8);
    }

    var base64Decoded = CryptoJS.enc.Base64.parse(finalEncrypted);
    console.log("Base64 decoded", base64Decoded);

    var decrypted = decryptDesCbcPkcs7Padding(base64Decoded, valueB);
    console.log("Decrypted: ", decrypted);

    var finalDecrypted = CryptoJS.enc.Base64.parse(
      decrypted.toString(CryptoJS.enc.Utf8)
    ).toString(CryptoJS.enc.Utf8);
    setDecryptedText(finalDecrypted);
  };

  var validate = (n) => {
    if (valueA === "") alert("Thông tin cần mã hoá không được bỏ trống");
    else if (valueB === "") alert("Khoá không được bỏ trống");
    else n === 0 ? encrypted() : decrypted(encryptedText);
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true); // You can use any AJAX library you like

    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div style={styles.container}>
      <MenuUI selectedKey={"2"} />
      <div style={styles.div}>
        <Title level={2} style={styles.title}>
          Mã hoá DES
        </Title>
        <InputItem
          title="Nhập thông tin cần mã hoá"
          val={valueA}
          setValue={setValueA}
        />
        <InputItem title="Nhập khoá" val={valueB} setValue={setValueB} />
        <div>
          <div style={styles.button}>
            <Upload {...props}>
              <Button
                icon={<UploadOutlined />}
                onClick={() => {
                  fetch("data.txt")
                    .then(function (response) {
                      return response.text();
                    })
                    .then(function (data) {
                      console.log(data);
                    });
                }}
              >
                Select File
              </Button>
            </Upload>
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
  },
};

export default DES;
