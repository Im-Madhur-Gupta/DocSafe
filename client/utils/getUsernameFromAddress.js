import axios from 'axios';

export default async function getUsernameFromAddress(address) {
    const { user } = await axios.get(`/api/get-username/${address}`);
    return user;
}
