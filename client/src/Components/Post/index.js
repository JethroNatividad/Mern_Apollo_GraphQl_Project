import React from 'react';
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import './index.css';
import moment from 'moment';
function Post({
  post: {
    id,
    username,
    body,
    title,
    createdAt,
    likesCount,
    commentsCount,
    comments,
  },
}) {
  return (
    <Card className='post' key={id}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <h5>{title}</h5>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          color='blue'
          content='Like'
          icon='thumbs up'
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: likesCount,
          }}
        />
        <Button
          basic
          color='gray'
          content='Comment'
          icon='comments'
          label={{
            basic: true,
            color: 'gray',
            pointing: 'left',
            content: commentsCount,
          }}
        />
      </Card.Content>
    </Card>
  );
}

export default Post;
