import React, { useState } from 'react';
import './AddPost.css';
import axios from 'axios';

const AddPost = (props) => {
	const [postContent, setPostContent] = useState('');


	const newPost = (e) => {
		e.preventDefault();

		if (!postContent) {
			return;
		} else {
			axios
				.post('https://akademia108.pl/api/social-app/post/add', {
					content: postContent,
				})
				.then((res) => {
                    props.addPost()
					setPostContent("");
					
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<form onSubmit={newPost} className='addPost-form'>
			<textarea
				className='addPost-textArea'
				name='textarea'
				placeholder='Add post...'
				onChange={(e) => {
					setPostContent(e.target.value);
				}}
			></textarea>
			<button className='btn addPost-btn' >
				Dodaj!
			</button>
		</form>
	);
};

export default AddPost;
