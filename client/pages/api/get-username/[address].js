import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {

        const client = await clientPromise;
        const db = client.db("decen-doc-share");

        const { address } = req.query;

        const user = await db
            .collection("user-data")
            .find({ public_address: address }).toArray();

        // user not found
        if (user.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User found", user: user[0] })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
