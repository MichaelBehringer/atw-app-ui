import React, {useState, useEffect} from "react";
import {EditOutlined} from '@ant-design/icons';
import axios from "axios";
import {Button, Input, InputNumber, Modal, Table} from 'antd';

import Select from 'react-select';
import 'dayjs/locale/de';
import {toast} from "react-toastify";



function Search() {
  const [users, setUsers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [txtPasswort, setTxtPasswort] = useState();

  function showModal(e) {
    setIsModalOpen(true);
    setSelectedData(e)
    setTxtPasswort()
  };
  function handleOk() {
    if(txtPasswort!=='86650') {
      toast.error('Passwort falsch!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      const params = { city: selectedData?.city, flaschenFuellen: selectedData?.flaschenFuellen, flaschenTUEV: selectedData?.flaschenTUEV, maskenPruefen: selectedData?.maskenPruefen, maskenReinigen: selectedData?.maskenReinigen, laPruefen: selectedData?.laPruefen, laReinigen: selectedData?.laReinigen, geraetePruefen: selectedData?.gereatPruefen, geraeteReinigen: selectedData?.gereatReinigen, arbeitszeit: selectedData?.timeWork, bemerkung: selectedData?.bemerkung, dataNo: selectedData.key };
      axios.post("http://ffpi:8080/updateEntry", params).then((res) => {
        handleSearch(selectedUser);
      });
      setIsModalOpen(false);
    }
  };
  function handleDelete() {
    if(txtPasswort!=='86650') {
      toast.error('Passwort falsch!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      const params = {data: {dataNo: selectedData.key}};
      axios.delete("http://ffpi:8080/deleteEntry", params).then((res) => {
        handleSearch(selectedUser);
      });
      setIsModalOpen(false);
    }
  };
  function handleCancel() {
    setIsModalOpen(false);
  };

  function handleSearch(e) {
    const params = {persNo: e.value};
    axios.post("http://ffpi:8080/search", params).then((res) => {
      setSelectedUser(e);
      setDataSource(res.data);
    });
  }

  useEffect(() => {
    axios.get("http://ffpi:8080/pers").then(
      res => {
        setUsers(
          res.data.map(row => ({
            persNo: row.persNo,
            firstname: row.firstname,
            lastname: row.lastname
          }))
        );
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const columns = [
    {
      title: 'Feuerwehr',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Datum',
      dataIndex: 'dateWork',
      key: 'dateWork',
    },
    {
      title: 'Zeit',
      dataIndex: 'timeWork',
      key: 'timeWork',
    },
    {
      title: 'Flaschen füllen',
      dataIndex: 'flaschenFuellen',
      key: 'flaschenFuellen',
    },
    {
      title: 'Flaschen TÜV',
      dataIndex: 'flaschenTUEV',
      key: 'flaschenTUEV',
    },
    {
      title: 'Masken prüfen',
      dataIndex: 'maskenPruefen',
      key: 'maskenPruefen',
    },
    {
      title: 'Masken reinigen',
      dataIndex: 'maskenReinigen',
      key: 'maskenReinigen',
    },
    {
      title: 'LA prüfen',
      dataIndex: 'laPruefen',
      key: 'laPruefen',
    },
    {
      title: 'LA reinigen',
      dataIndex: 'laReinigen',
      key: 'laReinigen',
    },
    {
      title: 'Gerät prüfen',
      dataIndex: 'gereatPruefen',
      key: 'gereatPruefen',
    },
    {
      title: 'Gerät reinigen',
      dataIndex: 'gereatReinigen',
      key: 'gereatReinigen',
    },
    {
      title: 'Bemerkung',
      dataIndex: 'bemerkung',
      key: 'bemerkung',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) => <EditOutlined onClick={()=>showModal(e)}/>
    },
  ];


  const optionsUsers = users.map(user => ({
    value: user.persNo, label: user.firstname + " " + user.lastname
  }));

  return (
    <div>
      <Modal title="Eintrag bearbeiten" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
        <Button
        key="Delete"
        type="primary"
        onClick={handleDelete}
        danger
      >
        Löschen
      </Button>,
          <Button key="cancle" onClick={handleCancel}>
            Abbrechen
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Speichern
          </Button>
        ]}
      
      >
      <Input disabled value={selectedData?.city} className="ffInputFull"/>
      <Input disabled value={selectedUser?.label} className="ffInputFull"/>
      <InputNumber addonBefore="Flaschen füllen" value={selectedData?.flaschenFuellen} onChange={(e) => setSelectedData({...selectedData, flaschenFuellen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Flaschen füllen"} />

      <InputNumber addonBefore="Flaschen TÜV" value={selectedData?.flaschenTUEV} onChange={(e) => setSelectedData({...selectedData, flaschenTUEV: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Flaschen TÜV"} />
      
      <InputNumber addonBefore="Masken prüfen" value={selectedData?.maskenPruefen} onChange={(e) => setSelectedData({...selectedData, maskenPruefen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Masken prüfen"} />
      
      <InputNumber addonBefore="Masken reinigen" value={selectedData?.maskenReinigen} onChange={(e) => setSelectedData({...selectedData, maskenReinigen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Masken reinigen"} />
      
      <InputNumber addonBefore="LA prüfen" value={selectedData?.laPruefen} onChange={(e) => setSelectedData({...selectedData, laPruefen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"LA prüfen"} />
      
      <InputNumber addonBefore="LA reinigen" value={selectedData?.laReinigen} onChange={(e) => setSelectedData({...selectedData, laReinigen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"LA reinigen"} />
      
      <InputNumber addonBefore="Geräte prüfen" value={selectedData?.gereatPruefen} onChange={(e) => setSelectedData({...selectedData, gereatPruefen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Geräte prüfen"} />
      
      <InputNumber addonBefore="Geräte reinigen" value={selectedData?.gereatReinigen} onChange={(e) => setSelectedData({...selectedData, gereatReinigen: e})} precision={0} min={0} max={10} className="ffInputFull" placeholder={"Geräte reinigen"} />
      <Input addonBefore="Bemerkung" value={selectedData?.bemerkung} onChange={(e) => setSelectedData({...selectedData, bemerkung: e.target.value})} className="ffInputFull"/>
      
      <InputNumber addonBefore="Arbeitszeit (h)" value={selectedData?.timeWork} onChange={(e) => setSelectedData({...selectedData, timeWork: e})} decimalSeparator={","} min={0} max={10} className="ffInputFull" placeholder={"Arbeitszeit (h)"} />
      <Input disabled value={selectedData?.dateWork} className="ffInputFull"/>
      <Input placeholder="Passwort" value={txtPasswort} onChange={(e) => setTxtPasswort(e.target.value)} className="ffInputFull"/>
      
      </Modal>
      <Select className="ffInputFull" placeholder={"Atemschutzgerätewart"} options={optionsUsers} onChange={(e) => handleSearch(e)} />
      <Table scroll={{x: 400}} dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default Search;
