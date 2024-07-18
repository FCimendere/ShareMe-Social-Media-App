//connect to frontend to sanity
//the file for sanity client side


import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-07-18', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.REACT_APP_SANITY_TOKEN // Only if you want to 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

