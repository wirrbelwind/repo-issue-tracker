export interface Repository {
	id: number
	name: string
	repoURL: string
	isPrivateRepository: boolean
	starsQuantity: number

	ownerName: string
	ownerAvatarURL: string
	ownerURL: string
}
