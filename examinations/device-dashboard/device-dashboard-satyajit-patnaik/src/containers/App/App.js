import React from "react";
import { useDispatch } from 'react-redux';

import DeviceReadings from "./../DeviceReadings/DeviceReadings";
import Counter from '../../components/Counter/Counter';
import actionCreators from '../../store/device/actionCreators';

import "./styles.css";

const App = (props) => {

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(actionCreators.fetchDeviceReadings());
	}, []);

  return (
		<React.Fragment>
			<div data-test="component-app" className="container">
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
