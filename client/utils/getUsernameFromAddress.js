import axios from "axios";

export default async function getUsernameFromAddress(address) {
	const response = await axios.get(`/api/get-username/${address}`);
	if(response.data.message==="User not found"){
        return null
    };
	return response.data.user.username;
}
