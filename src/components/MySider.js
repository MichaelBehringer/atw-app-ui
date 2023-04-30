import {useNavigate} from "react-router-dom";
import React from 'react';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {CalendarOutlined, CompressOutlined, HomeOutlined, SearchOutlined} from '@ant-design/icons';

function MySider() {
  const navigate = useNavigate();
  return (
    <div>
      <SideNav
      className='nav-style'
        onSelect={(selected) => {
          console.log(selected)
          navigate(selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav>
          <NavItem eventKey="">
            <NavIcon>
              <HomeOutlined style={{fontSize: '1.75em'}} />
            </NavIcon>
            <NavText>
              Home
            </NavText>
          </NavItem>
          <NavItem eventKey="planner">
            <NavIcon>
              <CalendarOutlined style={{fontSize: '1.75em'}} />
            </NavIcon>
            <NavText>
              Zeiterfassung
            </NavText>
          </NavItem>
          <NavItem eventKey="search">
            <NavIcon>
              <SearchOutlined style={{fontSize: '1.75em'}} />
            </NavIcon>
            <NavText>
              Suche
            </NavText>
          </NavItem>
          <NavItem eventKey="evaluation">
            <NavIcon>
              <CompressOutlined style={{fontSize: '1.75em'}} />
            </NavIcon>
            <NavText>
              Auswertung
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default MySider;
