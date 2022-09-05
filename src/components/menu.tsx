import { FilterCenterFocus, IosShare, Public, Settings } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

const Wrapper = styled(Paper)`
  width: 15vw;
  min-width: 10em;
  max-width: 17em;
  height: 100vh;
`;

const DAMMenu = (props: {children: any, isClassifying: boolean, onClear?: () => void, onClassifyClick: () => void, showMapModal: () => void, showExportModal: () => void}) => {
  return(
    <Wrapper>
      <Typography variant="h3" textAlign="center">
        DAM App
      </Typography>
      <Typography variant="h6"  textAlign="center">
        Menu
      </Typography>
      <Divider sx={{my: 2}}/>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/settings">
            <ListItemIcon> <Settings /> </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => props.onClassifyClick()}>
            <ListItemIcon> <FilterCenterFocus /> </ListItemIcon>
            <ListItemText  primary={props.isClassifying ? 'Stop Exit selection' : 'Classify'} />
          </ListItemButton>
        </ListItem>
        {/* {props.isClassifying && 
          <ListItem disablePadding>
            <ListItemButton onClick={() => props.onClear()}>
              <ListItemText  primary='Clear'/>
            </ListItemButton>
          </ListItem>
        } */}
        <ListItem disablePadding>
          <ListItemButton onClick={props.showMapModal}>
            <ListItemIcon> <Public /> </ListItemIcon>
            <ListItemText primary='Map' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={props.showExportModal}>
            <ListItemIcon> <IosShare /> </ListItemIcon>
            <ListItemText primary='Export' />
          </ListItemButton>
        </ListItem>
      </List>
      {props.children}
    </Wrapper>
  )
}


export default DAMMenu;
