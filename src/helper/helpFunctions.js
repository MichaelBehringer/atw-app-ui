export function getUserToID(userID, users) {
	return users.find(u => u.persNo === userID)
}