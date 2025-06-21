import React from 'react'
import { Paper } from '@mui/material'

type FooterFijoProps = {
	children: React.ReactNode
}

export default function FooterFixed({ children }: FooterFijoProps) {
	return (
		<Paper
			id="footerFixed"
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
				padding: 1,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			}}
			elevation={3}
		>
			{children}
		</Paper>
	)
}
