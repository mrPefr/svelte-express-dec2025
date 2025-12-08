const express = require("express");
const { getGuitars, updateGuitars } = require("./guitars.js");
const router = express.Router();

// -----------------------------
// GET ALL GUITARS (READ)
// -----------------------------
router.get("/guitars", async (req, res) => {
    const guitars = await getGuitars();
    res.json(guitars);
});

// -----------------------------
// CREATE GUITAR (CREATE)
// -----------------------------
router.post("/guitars", async (req, res) => {
    const guitars = await getGuitars();
    const newGuitar = req.body;

    // Generate ID if missing
    newGuitar.id = "id_" + Date.now();

    guitars.push(newGuitar);
    await updateGuitars(guitars);

    res.status(201).json(newGuitar);
});

// -----------------------------
// UPDATE GUITAR BY ID (UPDATE)
// -----------------------------
router.put("/guitars/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    let guitars = await getGuitars();

    const index = guitars.findIndex(g => g.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Guitar not found" });
    }

    guitars[index] = { ...guitars[index], ...updateData };
    await updateGuitars(guitars);

    res.json(guitars[index]);
});

// -----------------------------
// DELETE GUITAR BY ID (DELETE)
// -----------------------------
router.delete("/guitars/:id", async (req, res) => {
    const { id } = req.params;
    let guitars = await getGuitars();

    const exists = guitars.some(g => g.id === id);
    if (!exists) {
        return res.status(404).json({ error: "Guitar not found" });
    }

    guitars = guitars.filter(g => g.id !== id);
    await updateGuitars(guitars);

    res.status(200).json({ message: "Guitar deleted", id });
});

module.exports = router;
