import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {

    const client = await clientPromise;
    const db = client.db("decen-doc-share");

    const userDataColl = db.collection("user-data");

    const { username, address } = req.body;
    const newUser = { username, public_address: address };

    const result = await userDataColl.insertOne(newUser);
    console.log(result);

    res.status(200).json({ message: "document inserted successfully", objectId: result.insertId })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
