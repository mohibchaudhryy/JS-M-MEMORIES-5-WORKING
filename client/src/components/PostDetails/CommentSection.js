import { TextField, Typography, Button, Divider } from '@material-ui/core';
import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({post}) => {

    const [comments, setcomments] = useState(post?.comments); 
    const [comment, setcomment] = useState('');
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

 
    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));
        setcomments(newComments);
        setcomment('');
        // commentsRef.current.scrollInToView({bahavior : 'smooth'});
    }

    return (
        <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((comment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{comment.split(':')[0]}</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div />
          <div ref={commentsRef}/>
        </div>
        <br/>
        <Divider/>
        <div style={{ width: '60%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setcomment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" value={comment} variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
    )
}

export default CommentSection;