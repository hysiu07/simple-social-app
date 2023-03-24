import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import AddPost from '../components/AddPost'
import axios from 'axios';
import './Home.css';

const Home = (props) => {
	const [posts, setPosts] = useState([]);
	// const [newPosts, setNewPosts] = useState([])

	const getDataPosts = () => {
		axios
			.post('https://akademia108.pl/api/social-app/post/latest')
			.then((req) => {
				setPosts(req.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};



	const getPrevPosts = () => {
		axios
			.post('https://akademia108.pl/api/social-app/post/newer-then', {
				date: posts[0].created_at
			})
			.then((req) => {
				setPosts(req.data.concat(posts));
			})
			.catch((error) => {
				console.error(error);
			});
	};


	const getNextDataPosts = () => {
		axios
			.post('https://akademia108.pl/api/social-app/post/older-then', {
				date: posts[posts.length - 1].created_at,
			})
			.then((req) => {
				setPosts(posts.concat(req.data));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getDataPosts();
	}, [props.user]);

	return (
		<div className='home'>
			{props.user && <AddPost addPost={getPrevPosts}/>}
			<div className='postsList'>
				{posts.map((post) => {
					return <Post post={post} key={post.id} user={props.user} id={post.id} setPosts={setPosts}/>;
				})}

				{/* <button onClick={getNextDataPosts}>Load more</button>  */}
				<InfiniteScroll
					dataLength={posts.length}
					next={getNextDataPosts}
					hasMore={true}
					loader={<h4>Loading ....</h4>}
				></InfiniteScroll>
			</div>
		</div>
	);
};

export default Home;
