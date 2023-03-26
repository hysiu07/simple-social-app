/* eslint-disable */
import React, { useState } from 'react';
import './Post.css';
import axios from 'axios';

const Post = (props) => {
	const [like, setLikes] = useState(props.post.likes.length);
	const [flagLike, setFlagLike] = useState(
		props.post.likes.filter((like) => {
			like.username === props.user?.username;
		}).length !== 0
	);

	const [deletePanel, setDeletePanel] = useState(false);

	const addLike = (id, isLiked) => {
		axios
			.post(
				'https://akademia108.pl/api/social-app/post/' +
					(isLiked ? 'dislike' : 'like'),
				{
					post_id: id,
				}
			)
			.then((res) => {
				setLikes(like + (isLiked ? -1 : 1));
				setFlagLike(!isLiked);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const deletePost = (id) => {
		axios
			.post('https://akademia108.pl/api/social-app/post/delete', {
				post_id: id,
			})
			.then((res) => {
				setDeletePanel(false);
				props.setPosts((posts) => {
					return posts.filter((post) => post.id !== res.data.post_id);
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const unFollow = (id) => {
		axios
			.post('https://akademia108.pl/api/social-app/follows/disfollow', {
				leader_id: id,
			})
			.then((res) => {
				props.getDataPosts();
				console.log(res);
				
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className='post'>
			<div className='post-avatar'>
				<img
					src={props.post.user.avatar_url}
					alt='avatar'
					className='avatar-img'
				/>
			</div>
			<div className='postInfo'>
				<div className='postMeta'>
					<div className='post-author'>{props.post.user.username}</div>
					<div className='post-date'>
						{props.post.user.created_at.substring(0, 10)}
					</div>
				</div>
			</div>
			<div className='post-text'>{props.post.content}</div>
			<div className='post-likes'>
				{props.user?.username === props.post.user.username && (
					<button
						className='btn '
						onClick={() => {
							setDeletePanel(true);
						}}
					>
						Delete post
					</button>
				)}

				{props.user && props.user.username !== props.post.user.username && (
					<button className='btn btn-unfollow' onClick={()=> {
						unFollow(props.post.user.id)
					}}>Unfollow!</button>
				)}

				{props.user &&
					(flagLike ? (
						<button
							className='btn btn-like'
							onClick={() => {
								addLike(props.post.id, flagLike);
							}}
						>
							Dislike!
						</button>
					) : (
						<button
							className='btn btn-like'
							onClick={() => {
								addLike(props.post.id, flagLike);
							}}
						>
							Like!
						</button>
					))}

				<p className='likes'>{like}</p>
			</div>

			{deletePanel && (
				<div className='deleteConfirmation'>
					<h3>Are you sure you want to delete post?</h3>
					<button
						className='btn btn-yes'
						onClick={() => {
							deletePost(props.id);
						}}
					>
						YES
					</button>
					<button
						className='btn btn-no'
						id='no'
						onClick={() => {
							setDeletePanel(false);
						}}
					>
						NO
					</button>
				</div>
			)}
		</div>
	);
};
export default Post;
