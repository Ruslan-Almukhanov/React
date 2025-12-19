import React, { useState, useEffect } from 'react'

const useWebSocket = () => {
	const [isReady, setIsReady] = useState(false)
	const [data, setData] = useState([])
	const connection = React.useRef(null)
	useEffect(() => {
		const socket = new WebSocket('wss://echo.websocket.org');

		socket.onopen = (event) => {
			setIsReady(true)
			console.log('connection opened');
		}
		socket.onmessage = (event) => {
			console.log(`onMessage:${event}`);
			setData([event.data])
		}
		socket.onclose = (event) => {
			setIsReady(false)
			console.log('connection closed');
		}
		connection.current = socket
		return () => connection.close()

	}, [])
	return { isReady, data, connection: connection.current }
}

export default useWebSocket