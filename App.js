import { useEffect, useRef, useState } from "react";
import { Button, Container, Input } from "simple-react-ui-kit";
import useWebSocket from "./hooks/useWebSocket";

export default function App() {
	const [value, setValue] = useState("")
	const { isReady, data, connection } = useWebSocket()

	const handleMessage = () => {
		connection.send([...data, value])
		setValue("")
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', gap: 50, marginTop: 50 }}>
			{isReady ? <div>Connected</div> : <div>Disconnected</div>}
			<div>
				{data.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			</div>
			<form style={{ width: 300 }}>
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
				<Button onClick={handleMessage}>Add Text</Button>
			</form>
		</div>
	);
}
