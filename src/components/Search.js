import React, {useState, useEffect} from "react";
import {DeleteOutlined} from '@ant-design/icons';
import axios from "axios";
import {Input, Popconfirm, Table} from 'antd';

import Select from 'react-select';
import 'dayjs/locale/de';



function Search() {
  const [users, setUsers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  function handleDeleteInput(txtInput, e) {
    if(txtInput==='86650') {
      const params = { data: { dataNo: e.key } };
      axios.delete("http://ffpi:8080/deleteEntry", params).then((res) => {
        handleSearch(selectedUser)
    })
    }
  }

  function handleSearch(e) {
    const params = { persNo: e.value };
    axios.post("http://ffpi:8080/search", params).then((res) => {
      setSelectedUser(e)
      setDataSource(res.data)
  })
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
      title: '',
      dataIndex: '',
      key: 'x',
      render: (e) =>   <Popconfirm
      title="Eintrag löschen"
      description={<Input onChange={(txt)=>{handleDeleteInput(txt.target.value, e)}} placeholder="Passwort" className="ffInputFull"/>}
      okText=""
      cancelText="Abbrechen"
      okButtonProps={{style:{visibility: 'hidden'}}}
    ><DeleteOutlined /></Popconfirm>
    },
  ];
  

  const optionsUsers = users.map(user => ({
    value: user.persNo, label: user.firstname + " " + user.lastname
  }));

  return (
    <div>
          <Select className="ffInputFull" placeholder={"Atemschutzgerätewart"} options={optionsUsers} onChange={(e) => handleSearch(e)}/>
<Table scroll={{ x: 400 }} dataSource={dataSource} columns={columns} />
      

    </div>
  )
}

export default Search;
