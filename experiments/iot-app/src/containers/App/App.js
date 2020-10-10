import React from "react";
import { useDispatch } from 'react-redux';

import DeviceReadings from "./../DeviceReadings/DeviceReadings";
import Counter from '../../components/Counter/Counter';
import { fetchDeviceReadings } from '../../store';

import "./styles.css";

const App = (props) => {

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchDeviceReadings());
	}, []);

  return (
		<React.Fragment>
			<div className="container">
				<div className="header">
					<h2>Relayr Device Dashboard</h2>
					<h3>Developed by Satyajit Patnaik</h3>
				</div>
				<Counter />
				<DeviceReadings />
			</div>
		</React.Fragment>
  );
}

export default App;
