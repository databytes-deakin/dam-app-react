import { Button, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, Switch, TextField, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { useFlags } from "../settings/flags-provider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SettingsList = styled(List)`
  min-width: 40vw;
  margin: auto!important;
`;

const Settings = (props: { children: React.ReactElement }) => {
  let navigate = useNavigate();
  let { getFlags, setFlags } = useFlags();
  
  const [isDarkMode, setIsDarkMode] = useState(getFlags().theme === "dark");
  
  const [isPendingChanges, setIsPendingChanges] = useState(false);
  
  useEffect(() => {
    setIsPendingChanges(
      isDarkMode !== (getFlags().theme === "dark")
    );
  }, [getFlags, isDarkMode]);
  return (
    <div>
      <br />
      <Typography
        variant="h1"
        component="div"
        align="center"
      >
        Settings
      </Typography>
      <SettingsList sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <IconButton
          onClick={() => navigate(-1)}
          color="primary"
          aria-label="Back to previous page"
        >
          <ArrowBack />
        </IconButton>
        <ListSubheader>URL's</ListSubheader>
        <Divider />
        <ListSubheader>Theming</ListSubheader>
        <ListItem>
          <ListItemText primary="Use dark mode" />
          <Switch
            edge="end"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            inputProps={{
              "aria-labelledby": "switch-list-label-dark-mode",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Save setttings to this computer" />
          <Button
            variant="contained"
            onClick={() => {
              let flags = getFlags();
              flags.theme = isDarkMode ? "dark" : "light";
              setFlags(flags);
              navigate(0);
            }}
            disabled={!isPendingChanges}
          >
            Save
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="Reset to default settings" />
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("flags");
              navigate(0);
            }}
          >
            Reset
          </Button>
        </ListItem>
      </SettingsList>
    </div>
  );
};

export default Settings;
