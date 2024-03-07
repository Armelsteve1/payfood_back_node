const { DynamoDBClient, ScanCommand, GetItemCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-north-1" });
const tableName = "Restaurant";

async function getAllRestaurants(req, res) {
    try {
        const { Items } = await client.send(new ScanCommand({ TableName: tableName }));
        res.status(200).json({ restaurants: Items });
    } catch (error) {
        console.error("Erreur lors de la récupération des restaurants:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des restaurants." });
    }
}

async function getRestaurantById(req, res) {
    const { id } = req.params;
    try {
        const { Item } = await client.send(new GetItemCommand({ TableName: tableName, Key: { "id": { S: id } } }));
        if (!Item) {
            return res.status(404).json({ error: "Restaurant non trouvé." });
        }
        res.status(200).json({ restaurant: Item });
    } catch (error) {
        console.error("Erreur lors de la récupération du restaurant:", error);
        res.status(500).json({ error: "Erreur lors de la récupération du restaurant." });
    }
}

async function createRestaurant(req, res) {
    const restaurantData = req.body;
    try {
        await client.send(new PutItemCommand({ TableName: tableName, Item: restaurantData }));
        res.status(201).json({ message: "Restaurant créé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la création du restaurant:", error);
        res.status(500).json({ error: "Erreur lors de la création du restaurant." });
    }
}


async function updateRestaurant(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        await client.send(new UpdateItemCommand({
            TableName: tableName,
            Key: { "id": { S: id } },
            UpdateExpression: "SET #categories = :categories, #coordinates = :coordinates, #image_url = :image_url, #menu_id = :menu_id, #name = :name, #price = :price, #rating = :rating, #reviews = :reviews, #review_count = :review_count, #time = :time",
            ExpressionAttributeNames: { "#categories": "categories", "#coordinates": "coordinates", "#image_url": "image_url", "#menu_id": "menu_id", "#name": "name", "#price": "price", "#rating": "rating", "#reviews": "reviews", "#review_count": "review_count", "#time": "time" },
            ExpressionAttributeValues: { ":categories": { SS: updatedData.categories }, ":coordinates": { M: updatedData.coordinates }, ":image_url": { S: updatedData.image_url }, ":menu_id": { S: updatedData.menu_id }, ":name": { S: updatedData.name }, ":price": { S: updatedData.price }, ":rating": { N: updatedData.rating.toString() }, ":reviews": { N: updatedData.reviews.toString() }, ":review_count": { N: updatedData.review_count.toString() }, ":time": { S: updatedData.time } }
        }));
        res.status(200).json({ message: "Restaurant mis à jour avec succès." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du restaurant:", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du restaurant." });
    }
}

async function deleteRestaurant(req, res) {
    const { id } = req.params;
    try {
        await client.send(new DeleteItemCommand({ TableName: tableName, Key: { "id": { S: id } } }));
        res.status(200).json({ message: "Restaurant supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du restaurant:", error);
        res.status(500).json({ error: "Erreur lors de la suppression du restaurant." });
    }
}

module.exports = { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
