import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowRecommendations.css';

const FollowRecommendations = (props) => {
	const [recommendations, setRecommendations] = useState([]);

	const getRecommendations = () => {
		axios
			.post('https://akademia108.pl/api/social-app/follows/recommendations')
			.then((res) => {
				setRecommendations(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const addFollow = (id) => {
		axios
			.post('https://akademia108.pl/api/social-app/follows/follow', {
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

	useEffect(() => {
		getRecommendations();
	}, [props.posts]);

	return (
		<div className='followRecommentations'>
			{recommendations.map((recommendation) => {
				return (
					<div className='followRecomendation' key={recommendation.id}>
						<img
							src={recommendation.avatar_url}
							alt='avatar'
							className='recommendation-avatar'
						/>
						<p className='recommendation-name'>{recommendation.username}</p>
						<button
							className='btn btn-follow'
							onClick={() => {
								addFollow(recommendation.id);
							}}
						>
							Follow!
						</button>
					</div>
				);
			})}
		</div>
	);
};
export default FollowRecommendations;
