import React, { VFC } from 'react';
import { css } from '@emotion/css';
import { Drawer } from './Drawer';
import { Viewer } from './Viewer';

export const App: VFC = () => {
	return (
		<div className={styles.container}>
			<Viewer />
			<div className={styles.drawer}>
				<Drawer />
			</div>
		</div>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
	`,
	drawer: css`
		position: absolute;
		bottom: 20px;
		left: 20px;
		line-height: 0;
	`
}
