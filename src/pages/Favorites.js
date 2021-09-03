import React, { useContext } from 'react';
import AppContext from '../store/app-context.js';
import { List, Card } from 'antd';
import { useHistory } from 'react-router-dom';

function Favorites() {
  const appCtx = useContext(AppContext);
  const Favorites = appCtx.favorites;

  let history = useHistory();

  const cardClickHandler = (id, title) => {
    appCtx.chosenLocation = id;
    appCtx.localizedName = title;
    history.push('/');
  };

  let content;

  if (appCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = (
      <List
        grid={{ gutter: 16, xs: 2, sm: 3, md: 5 }}
        dataSource={Favorites}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              style={{ width: 150, cursor: 'pointer' }}
              headStyle={{ textAlign: 'center' }}
              onClick={() => cardClickHandler(item.id, item.title)}
              hoverable={true}
            >
              <p>{item.Temperature}</p>
              <img src={item.image} alt={item.description} />
              <p>{item.description}</p>
            </Card>
          </List.Item>
        )}
      />
    );
  }

  return (
    <div>
      <h1>Favorites</h1>
      {content}
    </div>
  );
}

export default Favorites;
