const fs = require("fs").promises;
const path = require("path");

// Path to guitars.json
const guitarsPath = path.join(__dirname, "guitars.json");

// -----------------------------
// GET DATA (async / await)
// -----------------------------
async function getGuitars() {
    try {
        const data = await fs.readFile(guitarsPath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading guitars.json:", err);
        return [];
    }
}

// -----------------------------
// UPDATE DATA (async / await)
// -----------------------------
async function updateGuitars(newArray) {
    try {
        await fs.writeFile(guitarsPath, JSON.stringify(newArray, null, 4), "utf8");
        console.log("guitars.json updated successfully");
    } catch (err) {
        console.error("Error writing guitars.json:", err);
    }
}

module.exports = {
    getGuitars,
    updateGuitars
};
