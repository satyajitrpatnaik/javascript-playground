import React, { useState, useEffect } from 'react'
import axios from 'axios';

function DataFetching() {

  const [posts, setPosts] = useState({});

  const [id, setId] = useState(1);

  const [idFromBtnClick, setIdFromBtnClick] = useState(1);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromBtnClick}`)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idFromBtnClick]);

  const handleClick = () => {
    setIdFromBtnClick(id);
  };

  return (
    <div>
      <input type="text" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={handleClick}>Fetch Post By Id</button>
      <div style={{ color: 'white' }}>{posts.title}</div>
      {/* <ul>
        {
          posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))
        }
      </ul> */}
    </div>
  )
}

export default DataFetching
