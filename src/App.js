/* eslint-disable no-unused-expressions */
import { Button, Table, Typography } from "antd";
import { useState } from "react";
import InputItem from "./InputItem";
import MenuUI from "./MenuUI";

const { Title, Paragraph } = Typography;

var App = (props) => {
  var [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "xi",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "pi",
      dataIndex: "pi",
      key: "pi",
    },
  ];

  var [txtSelected, setTxtSelected] = useState([]);
  var [valueA, setValueA] = useState("");
  var [valueB, setValueB] = useState("");
  var [valueC, setValueC] = useState("");
  var [valueD, setValueD] = useState("");
  var [key, setKey] = useState("");

  var ShareKey = () => {
    var k = Number(valueA);
    var m = Number(valueB);
    var p = Number(valueD);
    var t = Number(valueC);
    console.log(k, m, p, t);
    var v = [];
    var a = [];
    var z = [];
    var d = [];

    for (var i = 1; i <= m; i++) {
      v.push(i);
    }
    for (var j = 1; j < t; j++) {
      a.push(Math.round(Math.random() * p));
    }
    console.log(a);
    for (var i = 1; i <= m; i++) {
      var l = 0;
      for (var j = t - 1; j > 0; j--) {
        var h = 1;
        for (var id = 1; id <= j; id++) {
          h *= v[i - 1];
        }
        l = l + ((a[j - 1] * h) % p);
      }

      var y = (k + l) % p;
      z.push(i);
      d.push({
        key: d.length + 1,
        pi: y,
      });
    }
    setDataSource(d);
  };

  var validate = () => {
    if (valueA === "") alert("Khoá cần chia sẻ không được bỏ trống");
    else if (valueB === "") alert("Số thành viên giữ khoá không được bỏ trống");
    else if (valueC === "")
      alert("Số thành viên tối thiểu để mở khoá không được bỏ trống");
    else if (valueD === "") alert("Số p không được bỏ trống");
    else if (!checkPrime(valueD)) alert("Số p phải là số nguyên tố");
    else if (Number(valueA) >= Number(valueD)) alert("Số p phải lớn hơn khoá chia sẻ");
    else if (isNaN(Number(valueA)) || isNaN(Number(valueB)) || isNaN(Number(valueC)) || isNaN(Number(valueD)))
      alert("Dữ liệu nhập vào phải là số")
    else ShareKey();
  };

  var mul = (a, b) => {
    var b0 = b;
    var t, q;
    var x0 = 0;
    var x1 = 1;
    if (b == 1) return 1;
    while (a < 0) a += b;
    while (a > 1) {
      q = parseInt(a / b);
      t = b;
      b = a % b;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += b0;
    return x1;
  };

  var checkPrime = (n) => {
    var flag = true;

    if (n < 2) {
      flag = false;
    } else {
      for (var i = 2; i < n - 1; i++) {
        if (n % i == 0) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  var restoreKey = () => {
    var t = txtSelected.length;
    var x = [],
      g = [];
    var u = valueD;
    var p = Number(u);

    x = txtSelected.map((item) => item.key);
    g = txtSelected.map((item) => item.pi);

    console.log("x,g", x, g);

    var k = 0;
    for (var l = 1; l <= t; l++) {
      var m = 1;
      for (var j = 1; j <= t; j++) {
        if (j != l) {
          var b = Number(x[j - 1] - x[l - 1]);
          var n = Number((((x[j - 1] % p) * mul(b, p)) % p) % p);
          m = Number(((m % p) * (n % p)) % p);
        }
      }
      k = Number(Math.round((k + ((g[l - 1] * m) % p)) % p));
      setKey(k);
    }
  };

  return (
    <div style={styles.container}>
      <MenuUI selectedKey={"1"} />
      <div style={{ flex: 1 }}>
        <Title
          style={{ color: "#1890ff", textAlign: "center", margin: 50 }}
          level={2}
        >
          Chương trình chia sẻ khoá bí mật dựa vào sơ đồ ngưỡng Shamir
        </Title>

        <div style={styles.divContainer}>
          <div style={styles.div}>
            <Title level={5}>Chia khoá</Title>
            <InputItem
              title="Khoá cần chia sẻ"
              val={valueA}
              setValue={setValueA}
            />
            <InputItem
              title="Số thành viên giữ khoá"
              val={valueB}
              setValue={setValueB}
            />
            <InputItem
              title="Số thành viên tối thiểu để mở khoá"
              val={valueC}
              setValue={setValueC}
            />
            <InputItem title="Giá trị p" val={valueD} setValue={setValueD} />
            <div style={styles.buttonContainer}>
              <Button onClick={() => validate()}>Chia sẻ khoá</Button>
              <Button
                onClick={() => {
                  setValueA("");
                  setValueB("");
                  setValueC("");
                  setValueD("");
                  setDataSource([]);
                  setKey("");
                }}
              >
                Nhập lại
              </Button>
            </div>
            <Table
              style={{ margin: 10 }}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
          <div style={styles.div}>
            <Title level={5}>Ghép khoá</Title>
            <Table
              style={{ margin: 10 }}
              rowSelection={{
                type: "checkbox",
                onSelectAll: (selected, selectedRows, changeRows) => {
                  if (txtSelected.length == 0) setTxtSelected(dataSource);
                  else if (txtSelected.length == dataSource.length)
                    setTxtSelected([]);
                  else setTxtSelected(dataSource);
                  console.log(txtSelected);
                },
                onSelect: (record, rowIndex) => {
                  if (
                    !txtSelected.map((item) => item.key).includes(record.key)
                  ) {
                    setTxtSelected([
                      ...txtSelected,
                      {
                        key: record.key,
                        pi: record.pi,
                      },
                    ]);
                  } else {
                    setTxtSelected(
                      txtSelected.filter((item) => item.key !== record.key)
                    );
                  }
                  console.log(txtSelected);
                },
              }}
              dataSource={dataSource}
              columns={columns}
            />
            <div style={styles.button}>
              <Button
                type="primary"
                onClick={() => {
                  if (txtSelected.length < valueC)
                    alert(
                      `Phải có ít nhất ${valueC} thành viên để có thể mở khoá`
                    );
                  else restoreKey();
                }}
              >
                Khôi phục khoá
              </Button>
            </div>
            {key !== "" && (
              <div style={styles.container}>
                <InputItem
                  title="Khoá bí mật là"
                  val={key}
                  disabled={false}
                  colorName="#1890ff"
                  fontSizeName={25}
                  fontWeightName="bold"
                />
              </div>
            )}
          </div>
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
    flex: 1,
    borderColor: "red",
    border: "1px solid #eee",
    margin: 10,
    padding: 10,
  },
  divContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    margin: 30,
    display: "flex",
    justifyContent: "space-evenly",
  },
  button: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
};

export default App;
