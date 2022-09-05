import React from 'react';
import './app.css';
import { Page } from './components/page';
import { Map } from './components/map';
import Menu from './components/menu';
import { Alert, Snackbar } from '@mui/material';
import { Stack } from '@mui/system';
import styled from 'styled-components';
import { ExportModal } from './components/export-modal';
import { MapModal } from './components/map-modal';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Home = (props: {}) => {
  const [showExportModal, setShowExportModal] = React.useState<boolean>(false);
  const [showMapModal, setShowMapModal] = React.useState<boolean>(false);
  const [isClassifying, setIsClassifying] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<{
      title: string,
      body: string
    }[]>([]);
  
  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((n, i) => {
      return i !== index
    }));
  };
  
  const addNotification = (title: string, body: string) => {
    setNotifications([...notifications, {title, body}]);
  };
  
  React.useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  
  return (
    <Page>
      <Wrapper>
        <Menu
          isClassifying={isClassifying}
          onClassifyClick={() => setIsClassifying(!isClassifying)}
          showExportModal={() => setShowExportModal(true)}
          showMapModal={() => setShowMapModal(true)}
        >
          <button onClick={() => addNotification("SUCCESS", "BODY EHRE")}>
            CLICK ME 2
          </button>
        </Menu>
        <Map isClassifying={isClassifying} onRightClick={() => setIsClassifying(false)}/>
      </Wrapper>
      <ExportModal open={showExportModal} onClose={() => setShowExportModal(false)}/>
      <MapModal open={showMapModal} onClose={() => setShowMapModal(false)}/>
      <Stack spacing={2}>
        {notifications.map((notification, key) =>
          <Snackbar 
            key={key}
            open={true}
            autoHideDuration={6000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
              if (reason === 'clickaway') return;
              removeNotification(key)
            }}
          >
            <Alert
              elevation={6}
              variant="filled"
              severity="success"
              title={notification.title}
              onClose={() => removeNotification(key)}
            >
              {notification.body}
            </Alert>
          </Snackbar>
        )}
      </Stack>
    </Page>
  );
}

export default Home;
