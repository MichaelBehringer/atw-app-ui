import axios from "axios";

export async function doPostRequest(path, param) {
	return axios.post("http://ffpi:8080/"+path, param)
}

export async function doGetRequest(path) {
	return axios.get("http://ffpi:8080/"+path)
}

export async function doGetRequestAut(path, auth) {
	return axios.get("http://ffpi:8080/"+path, {headers: {Authorization: 'Bearer ' + auth}})
}

export async function doDeleteRequest(path, param) {
	return axios.delete("http://ffpi:8080/"+path, param)
}

export async function doPutRequest(path, param) {
	return axios.put("http://ffpi:8080/"+path, param)
}