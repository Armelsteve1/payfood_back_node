const { DynamoDBClient, PutItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const client = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "User";
const secretKey = 'votre_clé_secrète';

async function createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const params = {
        TableName: tableName,
        Item: marshall({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        })
    };
    try {
        await client.send(new PutItemCommand(params));
        return { username: userData.username, email: userData.email };
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}

async function getUser(username) {
    const params = {
        TableName: tableName,
        Key: marshall({ username })
    };

    try {
        const { Item } = await client.send(new GetItemCommand(params));
        return Item;
    } catch (error) {
        console.error("Error getting user:", error);
        throw new Error("Failed to get user");
    }
}

async function loginUser(credentials) {
    const params = {
        TableName: tableName,
        Key: marshall({ username: credentials.username })
    };

    try {
        const { Item } = await client.send(new GetItemCommand(params));
        if (!Item || !Item.password || Item.password.S === "" || !(await bcrypt.compare(credentials.password, Item.password.S))) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ username: credentials.username }, secretKey);
        console.log('token',token)
        return token;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Failed to login");
    }
}

module.exports = { createUser, loginUser,getUser };
