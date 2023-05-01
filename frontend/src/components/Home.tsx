import React, { useState } from 'react';
import { useModule } from '../ModuleContext';
import Calendar from './Calendar/Calendar';
import Task from './Task/Task';
import Weather from './Weather/Weather';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

type ComponentWithIsSmallViewProp = React.FC<{ isSmallView?: boolean }>;

const Home: React.FC = () => {
  const {
    bigComponent: BigComponent,
    smallComponent1: SmallComponent1,
    smallComponent2: SmallComponent2,
    setBigComponent,
    setSmallComponent1,
    setSmallComponent2,
  } = useModule();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<
    'big' | 'small1' | 'small2' | null
  >(null);

  const handleOpenDialog = (moduleName: 'big' | 'small1' | 'small2') => {
    setSelectedModule(moduleName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedModule(null);
  };

  const handleComponentChange = (
    Component: ComponentWithIsSmallViewProp,
    isSmallView: boolean
  ) => {
    const ComponentWithProps = () => <Component isSmallView={isSmallView} />;

    if (selectedModule === 'big') {
      setBigComponent(() => ComponentWithProps);
    } else if (selectedModule === 'small1') {
      setSmallComponent1(() => ComponentWithProps);
    } else if (selectedModule === 'small2') {
      setSmallComponent2(() => ComponentWithProps);
    }
    handleCloseDialog();
  };

  return (
    <Grid container direction="column" sx={{ height: '93vh' }}>
      <Grid
        item
        xs
        sx={{
          height: 'calc(2/3 * 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          handleOpenDialog('big');
        }}
      >
        {BigComponent && <BigComponent />}
      </Grid>
      <Grid
        container
        item
        xs={4}
        sx={{
          height: 'calc(1/3 * 100%)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={6}
          onContextMenu={(e) => {
            e.preventDefault();
            handleOpenDialog('small1');
          }}
        >
          {SmallComponent1 && <SmallComponent1 />}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            handleOpenDialog('small2');
          }}
        >
          {SmallComponent2 && <SmallComponent2 />}
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose a component</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a component to replace the current one.
          </DialogContentText>
          <List>
            <ListItem
              button
              onClick={() =>
                handleComponentChange(Calendar, selectedModule !== 'big')
              }
            >
              Calendar
            </ListItem>
            <ListItem
              button
              onClick={() =>
                handleComponentChange(Task, selectedModule !== 'big')
              }
            >
              Task
            </ListItem>
            <ListItem
              button
              onClick={() =>
                handleComponentChange(Weather, selectedModule !== 'big')
              }
            >
              Weather
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Home;
