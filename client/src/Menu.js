import React from "react";
import {getAll} from "./api/api";

export const Menu = ({items, onClick}) =>(
	<ul className = "ulMenu">
		{items.map(({id, title, key}) => (
			<li key = {key}>
				 <a href = "" onClick = {e => {
				 	e.preventDefault();
				 	onClick(id);
				 }}>{title}
				 </a>
			</li>
		))}	
	</ul>
);