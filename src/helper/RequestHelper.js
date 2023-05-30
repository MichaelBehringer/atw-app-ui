import axios from "axios";

const url = "https://ffwemding.dynv6.net/"

export async function doPostRequest(path, param) {
	return axios.post(url+path, param)
}

export async function doGetRequest(path) {
	return axios.get(url+path)
}

export async function doGetRequestBlob(path) {
	return axios.get(url+path, { responseType: 'blob' })
}

export async function doGetRequestAut(path, auth) {
	return axios.get(url+path, {headers: {Authorization: 'Bearer ' + auth}})
}

export async function doDeleteRequest(path, param) {
	return axios.delete(url+path, param)
}

export async function doPutRequest(path, param) {
	return axios.put(url+path, param)
}