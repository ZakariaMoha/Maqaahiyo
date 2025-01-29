import { getClient } from '../db';

const client = getClient();
const dbName = 'yourdbname'; // Update this to your actual database name
const collectionName = 'yourcollection'; // Update this to your actual collection name

export const createDocument = async (data) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
};

export const readDocuments = async () => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    return documents;
};

export const updateDocument = async (id, data) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne({ _id: id }, { $set: data });
    return result;
};

export const deleteDocument = async (id) => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: id });
    return result;
};
