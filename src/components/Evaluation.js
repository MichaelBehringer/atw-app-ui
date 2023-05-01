import React, {useState, useEffect} from "react";
import {Col, Row, Input, Button, Divider, Modal, Table, Popconfirm} from 'antd';
import axios from "axios";
import {DeleteOutlined, SaveOutlined} from "@ant-design/icons";
import {myToastError, myToastSuccess} from "./MyToast";

function Evaluation() {
  const [txtFlaschenFuellen, setTxtFlaschenFuellen] = useState();
  const [isLocked, setIsLocked] = useState(true);
  const [isModalAGWOpen, setIsModalAGWOpen] = useState(false);
  const [isModalFFOpen, setIsModalFFOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  function showAGWModal() {
    setIsModalAGWOpen(true);
  };
  function showFFModal() {
    setIsModalFFOpen(true);
  };

  function handleUpdateUser(e) {
    axios.post("http://ffpi:8080/updateUser", e).then((ret) => {
      if (ret.status === 200) {
        myToastSuccess('Speichern erfolgreich')
      } else {
        myToastError('Fehler beim speichern aufgetreten')
      }
    });
  }

  function handleUpdateFF(e) {
    axios.post("http://ffpi:8080/updateCity", e).then((ret) => {
      if (ret.status === 200) {
        myToastSuccess('Speichern erfolgreich')
      } else {
        myToastError('Fehler beim speichern aufgetreten')
      }
    });
  }

  function handleDeleteUser(e) {
    const params = {data: {userNo: e.key}};
      axios.delete("http://ffpi:8080/deleteUser", params).then((res) => {
        if (res.status === 200) {
          myToastSuccess('Löschen erfolgreich')
        } else {
          myToastError('Fehler beim Löschen aufgetreten')
        }
        loadUser()
      });
  }

  function handleDeleteFF(e) {
    const params = {data: {cityNo: e.key}};
      axios.delete("http://ffpi:8080/deleteCity", params).then((res) => {
        if (res.status === 200) {
          myToastSuccess('Löschen erfolgreich')
        } else {
          myToastError('Fehler beim Löschen aufgetreten')
        }
        loadCities()
      });
  }

  function handleModalAGWCancel() {
    setIsModalAGWOpen(false);
  };
  function handleModalFFCancel() {
    setIsModalFFOpen(false);
  };

  function handlePW() {
    if(txtFlaschenFuellen==='86650') {
      setIsLocked(false)
    } else {
      myToastError('Passwort falsch!')
    }
  };

  function loadUser() {
    axios.get("http://ffpi:8080/pers").then(
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
    axios.get("http://ffpi:8080/cities").then(
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
      render: (e) => <Input value={e.firstname} onChange={(tx)=>{setUsers (
        users.map((item) => {
            return item.key === e.key? {key: e.key, firstname: tx.target.value, lastname: e.lastname}: item;
        })
    )}}/>
    },
    {
      title: 'Nachname',
      dataIndex: '',
      key: 'lastname',
      render: (e) => <Input value={e.lastname} onChange={(tx)=>{setUsers (
        users.map((item) => {
            return item.key === e.key? {key: e.key, firstname: e.firstname, lastname: tx.target.value}: item;
        })
    )}}/>
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => <SaveOutlined onClick={()=>handleUpdateUser(e)}/>
    },
    {
      title: '',
      dataIndex: '',
      key: 'd',
      render: (e) =>   <Popconfirm
      title="Benutzer Löschen"
      description="sicher?"
      onConfirm={()=>handleDeleteUser(e)}
      okText="Löschen"
      cancelText="Abbrechen"
    ><DeleteOutlined/></Popconfirm>
    },
  ];

  const columnsFF = [
    {
      title: 'Feuerwehr',
      dataIndex: '',
      key: 'cityName',
      render: (e) => <Input value={e.cityName} onChange={(tx)=>{setCities (
        cities.map((item) => {
            return item.key === e.key? {key: e.key, cityName: tx.target.value}: item;
        })
    )}}/>
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => <SaveOutlined onClick={()=>handleUpdateFF(e)}/>
    },
    {
      title: '',
      dataIndex: '',
      key: 'd',
      render: (e) =>   <Popconfirm
      title="Feuerwehr Löschen"
      description="sicher?"
      onConfirm={()=>handleDeleteFF(e)}
      okText="Löschen"
      cancelText="Abbrechen"
    ><DeleteOutlined/></Popconfirm>
    },
  ];

  useEffect(() => {
    loadUser()
    loadCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLocked ?
    <div>
      <Row>
        <Col span={12}>
        <Input value={txtFlaschenFuellen} onChange={(e) => setTxtFlaschenFuellen(e.target.value)} className="ffInputFull" placeholder={"Passwort"} />
        </Col>
        <Col span={12}>
          <Button onClick={() => handlePW()} className="ffInputFull" type="primary">Öffnen</Button>
        </Col>
      </Row>
    </div>
    :
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
          <Button onClick={() => showAGWModal()} className="ffInputFull marginButton" type="primary">AGW Verwalten</Button>
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
        <Button onClick={() => handlePW()} className="ffInputFull marginButton" type="primary">Jahresauswertung AGW</Button>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Button onClick={() => handlePW()} className="ffInputFull marginButton" type="primary">Jahresauswertung Feuerwehren</Button>
      </Col>
    </Row>
    </div>
  );
}

export default Evaluation;
