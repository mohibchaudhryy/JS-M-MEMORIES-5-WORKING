import React, { useState } from "react";
import { Container,  Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const classes = useStyles();
  
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery =query.get('searchQuery');
  
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);


  

  const handleAdd = (tag) => {setTags([ ...tags, tag ])}

  const handleDelete = (tagDelete) => {setTags([tags.filter( (tag) => tag !== tagDelete)])}

  const searchPosts = () => {
    if(search|| tags){
      search.trim();
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      history.push('/');
    }
  }
  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPosts();
    }
  }

    return(
        <Grow in>
        <Container maxWidth='xl' >
          <Grid container className="classes.gridContainer" justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={(chip)=>handleAdd(chip)}
                onDelete={(chip)=>handleDelete(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPosts} variant="contained" className={classes.searchButton} color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length)&&(
                <Paper   elevation={6}>
                  <Paginate page={page}/>
                </Paper>
              )}
              

            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
};
export default Home;