import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UpperPage from './page/UpperPage'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import TextField from '@material-ui/core/TextField';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '269d1b7e-db8a-4ec3-9fe2-8f59e64d0844',
    clientToken: 'pub1c7376c98dbca745548c9a24304b3ae8',
    site: 'datadoghq.com',
    service: 'eks-demo-frontend',
    env: 'demo',
    version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App(props) {
  const classes = useStyles();
  // const { sections } = props;
  const [ data, setState ] = useState({outcome: []});
  const [query, setQuery] = useState('eks');
  const [search, setSearch] = useState('eks');

  var url = `http://k8s-eksdemogroup-e0353f9ab7-63328213.ap-northeast-2.elb.amazonaws.com/contents/${search}`

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setState(result.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, [search]);
  
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CloudIcon />
          </IconButton>
          <Typography
            variant="h6"
            align="center"
            className={classes.title}
          >
            EKS DEMO Blog version 1
          </Typography>
          {new Date().toLocaleTimeString()}
        </Toolbar>
      </AppBar>
      <br/>

      <UpperPage key={1} />
      <br/>
      
      <form className={classes.searchRoot} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Enter your keyword to search"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <Button onClick={() => setSearch(query)}> Click </Button>
      </form>
      <ul>
      {data.outcome.map( item => (
        <li key={item.url}>
          <a href={item.url}>{item.title}</a><br/>
        </li>
      ))}
      </ul>
    </div>
  );
}

App.propTypes = {
  sections: PropTypes.array,
};

export default App;
