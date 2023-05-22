import React, {useState, useEffect} from "react";
import {Col, Row, Input, Button, Divider, Modal, Table, Popconfirm} from 'antd';
import {DeleteOutlined, SaveOutlined} from "@ant-design/icons";
import {myToastError, myToastSuccess} from "../helper/ToastHelper";
import {doDeleteRequest, doGetRequest, doPostRequest} from "../helper/RequestHelper";
import {useNavigate} from "react-router-dom";

function Evaluation() {
  const [isModalAGWOpen, setIsModalAGWOpen] = useState(false);
  const [isModalFFOpen, setIsModalFFOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  function showAGWModal() {
    setIsModalAGWOpen(true);
  };
  function showFFModal() {
    setIsModalFFOpen(true);
  };

  function handleUpdateUser(e) {
    doPostRequest("updateUser", e).then((ret) => {
      if (ret.status === 200) {
        myToastSuccess('Speichern erfolgreich');
      } else {
        myToastError('Fehler beim speichern aufgetreten');
      }
    });
  }

  function handleUpdateFF(e) {
    doPostRequest("updateCity", e).then((ret) => {
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

  function handleDeleteFF(e) {
    const params = {data: {cityNo: e.key}};
    doDeleteRequest("deleteCity", params).then((res) => {
      if (res.status === 200) {
        myToastSuccess('Löschen erfolgreich');
      } else {
        myToastError('Fehler beim Löschen aufgetreten');
      }
      loadCities();
    });
  }

  function handleModalAGWCancel() {
    setIsModalAGWOpen(false);
  };
  function handleModalFFCancel() {
    setIsModalFFOpen(false);
  };

  function loadUser() {
    doGetRequest("pers").then(
      res => {
        setUsers(
          res.data.map(row => ({
            key: row.persNo,
            firstname: row.firstname,
            lastname: row.lastname
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

  const columnsAGW = [
    {
      title: 'Vorname',
      dataIndex: '',
      key: 'firstname',
      render: (e) => <Input value={e.firstname} onChange={(tx) => {
        setUsers(
          users.map((item) => {
            return item.key === e.key ? {key: e.key, firstname: tx.target.value, lastname: e.lastname} : item;
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
            return item.key === e.key ? {key: e.key, firstname: e.firstname, lastname: tx.target.value} : item;
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

  const columnsFF = [
    {
      title: 'Feuerwehr',
      dataIndex: '',
      key: 'cityName',
      render: (e) => <Input value={e.cityName} onChange={(tx) => {
        setCities(
          cities.map((item) => {
            return item.key === e.key ? {key: e.key, cityName: tx.target.value} : item;
          })
        );
      }} />
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => <SaveOutlined onClick={() => handleUpdateFF(e)} />
    },
    {
      title: '',
      dataIndex: '',
      key: 'd',
      render: (e) => <Popconfirm
        title="Feuerwehr Löschen"
        description="sicher?"
        onConfirm={() => handleDeleteFF(e)}
        okText="Löschen"
        cancelText="Abbrechen"
      ><DeleteOutlined /></Popconfirm>
    },
  ];

  useEffect(() => {
    loadUser();
    loadCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal title="AGW Verwalten" open={isModalAGWOpen} onCancel={handleModalAGWCancel} footer={[
        <Button key="cancle" onClick={handleModalAGWCancel}>
          Zurück
        </Button>
      ]}
      >
        <Table scroll={{x: 400}} dataSource={users} columns={columnsAGW} />
      </Modal>
      <Modal title="Feuerwehren Verwalten" open={isModalFFOpen} onCancel={handleModalFFCancel} footer={[
        <Button key="cancle" onClick={handleModalFFCancel}>
          Zurück
        </Button>
      ]}
      >
        <Table scroll={{x: 400}} dataSource={cities} columns={columnsFF} />
      </Modal>
      <Divider orientation="left">Verwalten</Divider>
      <Row>
        <Col span={24}>
          <Button onClick={() => navigate('/userManagement')} className="ffInputFull marginButton" type="primary">AGW Verwalten</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button onClick={() => showFFModal()} className="ffInputFull marginButton" type="primary">Feuerwehren Verwalten</Button>
        </Col>
      </Row>
      <Divider orientation="left">Auswertungen</Divider>
      <Row>
        <Col span={24}>
          <Button onClick={() => console.log('aaa')} className="ffInputFull marginButton" type="primary">Jahresauswertung AGW</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button onClick={() => console.log('bbb')} className="ffInputFull marginButton" type="primary">Jahresauswertung Feuerwehren</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Evaluation;
