import {Button, Col, Input, Popconfirm, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {doDeleteRequest, doGetRequest, doPostRequest} from "../helper/RequestHelper";
import {myToastError, myToastSuccess} from "../helper/ToastHelper";
import {DeleteOutlined, SaveOutlined} from "@ant-design/icons";
import Select from 'react-select';
import {isExternal} from "../helper/helpFunctions";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [functions, setFunctions] = useState([]);

  function loadUser() {
    doGetRequest("persExtra").then(
      res => {
        setUsers(
          res.data.map(row => ({
            key: row.persNo,
            firstname: row.firstname,
            lastname: row.lastname,
            username: row.username,
            functionNo: row.functionNo,
            functionName: row.functionName,
            cityNo: row.cityNo,
            cityName: row.cityName
          }))
        );
      }
    );
  }

  function loadCities() {
    doGetRequest("cities").then(
      res => {
        setCities(
          res.data.map(row => ({
            key: row.cityNo,
            cityName: row.name
          }))
        );
      }
    );
  }

  function loadFunction() {
    doGetRequest("function").then(
      res => {
        setFunctions(
          res.data.map(row => ({
            key: row.functionNo,
            functionName: row.functionName
          }))
        );
      }
    );
  }

  function handleUpdateUser(e) {
    doPostRequest("updateUser", e).then((ret) => {
      if (ret.status === 200) {
        myToastSuccess('Speichern erfolgreich');
      } else {
        myToastError('Fehler beim speichern aufgetreten');
      }
    });
  }

  function handleDeleteUser(e) {
    const params = {data: {userNo: e.key}};
    doDeleteRequest("deleteUser", params).then((res) => {
      if (res.status === 200) {
        myToastSuccess('Löschen erfolgreich');
      } else {
        myToastError('Fehler beim Löschen aufgetreten');
      }
      loadUser();
    });
  }

  const optionsFunctions = functions.map(fun => ({
    value: fun.key, label: fun.functionName
  }));
  const optionsCities = cities.map(city => ({
    value: city.key, label: city.cityName
  }));

  const columnsAGW = [
    {
      title: 'Rolle',
      dataIndex: '',
      key: 'role',
      render: (e) => <Select menuPlacement={'auto'} value={{value: e.functionNo, label: e.functionName}} options={optionsFunctions} onChange={(tx) => {
        setUsers(
          users.map((item) => {
            return item.key === e.key ? {...e, functionNo: tx.value, functionName: tx.label} : item;
          })
        );
      }} />
    },
    {
      title: 'Feuerwehr',
      dataIndex: '',
      key: 'ff',
      render: (e) => <Select menuPlacement={'auto'} isDisabled={!isExternal(e.functionNo)} value={{value: e.cityNo, label: e.cityName}} options={optionsCities} onChange={(tx) => {
        setUsers(
          users.map((item) => {
            return item.key === e.key ? {...e, cityNo: tx.value, cityName: tx.label} : item;
          })
        );
      }} />
    },
    {
      title: 'Vorname',
      dataIndex: '',
      key: 'firstname',
      render: (e) => <Input value={e.firstname} onChange={(tx) => {
        setUsers(
          users.map((item) => {
            return item.key === e.key ? {...e, firstname: tx.target.value} : item;
          })
        );
      }} />
    },
    {
      title: 'Nachname',
      dataIndex: '',
      key: 'lastname',
      render: (e) => <Input value={e.lastname} onChange={(tx) => {
        setUsers(
          users.map((item) => {
            return item.key === e.key ? {...e, lastname: tx.target.value} : item;
          })
        );
      }} />
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => <SaveOutlined onClick={() => handleUpdateUser(e)} />
    },
    {
      title: '',
      dataIndex: '',
      key: 'd',
      render: (e) => <Popconfirm
        title="Benutzer Löschen"
        description="sicher?"
        onConfirm={() => handleDeleteUser(e)}
        okText="Löschen"
        cancelText="Abbrechen"
      ><DeleteOutlined /></Popconfirm>
    },
  ];

  useEffect(() => {
    loadUser();
    loadCities();
    loadFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row>
        <Col span={24}>
          <p>Benutzerverwaltung</p>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button onClick={() => console.log()} className="ffInputFull marginButton">Zurück</Button>
        </Col>
        <Col span={12}>
          <Button onClick={() => console.log()} className="ffInputFull marginButton" type="primary">Neuer AGW</Button>
        </Col>
      </Row>
      <Table className="userManagementTable" pagination={false} scroll={{x: 400}} dataSource={users} columns={columnsAGW} />
    </div>
  );
}

export default UserManagement;
