import React, { FC, PropsWithChildren, useContext, useState } from "react";

const dragContext = React.createContext<null | { issueId: number | null; setIssueId: React.Dispatch<React.SetStateAction<number | null>> }>(null)
// export const useDragContext = 
export const DragProvider: FC<PropsWithChildren> = ({ children }) => {
	const [issueId, setIssueId] = useState<null | number>(null)

	return (
		<dragContext.Provider value={{
			issueId,
			setIssueId
		}}>
			{children}
		</dragContext.Provider>
	)
}
export const useDrag = () => useContext(dragContext)