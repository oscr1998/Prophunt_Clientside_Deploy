import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios'
import { useSelector } from "react-redux";


export default function Leaderboard() {

	const flaskURI = useSelector( state => state.flask.URI)

    const [topScores, setTopScores] = useState([]);
    const [sort_by, setSort_by] = useState("wins");

	useEffect(()=>{
		axios.get(`${flaskURI}/leaderboard/${sort_by}/10`)
		.then(res => setTopScores(res.data))
	},[sort_by])

    return (
        <div className="leaderboard-container">
	
			<div className="leaderboard">

				<h1 className='leaderboardh1'>Leaderboard</h1>
				
				<label>
					<div className="nes-select">
						<select
						value={sort_by}
						onChange={(e) => {setSort_by(e.target.value)}}
						>
						<option value="wins" key="wins">Wins</option>
						<option value="wins_as_hunter" key="wins_as_hunter">Top Hunter</option>
						<option value="wins_as_hider" key="wins_as_hider">Top Hider</option>
						<option value="games_played" key="games_played">Total Game Played</option>
						</select>
						<br />
					</div>
				</label>
	
				<table>
					<tbody>
						<tr id="firstRow">
							<th>Ranking</th>
							<th>Username</th>
							<th>Games Played</th>
                            <th>Total Wins</th>
                            <th>Wins as Hunter</th>
                            <th>Wins as Hider</th>
						</tr>

						{topScores.map((user, idx) => {
							return (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{user.username}</td>
									<td>{user.games_played}</td>
									<td>{user.wins}</td>
									<td>{user.wins_as_hunter}</td>
									<td>{user.wins_as_hider}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
	
			</div>
		</div>
    )
}
