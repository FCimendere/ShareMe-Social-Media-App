import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'; // use for discovering the query categories

import { client } from '../client'; // sanity client
import MasonryLayout from './MasonryLayout'; // natural looked masonry layout fro different sizes grids
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  
  // collecting category info from query
  const { categoryId } = useParams();


  useEffect (() => {
    setLoading(true);
    
    if(categoryId) {
        const query = searchQuery(categoryId);

        client.fetch(query)
          .then((data) => {
          setPins(data);
          setLoading(false);
          });
    } else {
      client.fetch(feedQuery)
        .then((data)=> {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId])

  if(loading) return < Spinner message='We are adding new ideas to your feed!' />

  if(!pins?.length) return <h2>No pins available!</h2>

  return (
    <div>
      {pins && < MasonryLayout pins={pins} />} 
    </div>
  )
}

export default Feed
