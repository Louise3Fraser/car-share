import express from "express";
import mysql from "mysql";
import cors from "cors";

const backend = express();
backend.use(cors());
backend.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorect3!",
  database: "Calendar",
});

backend.get("/", (req, res) => {
  res.json("hello");
});

backend.get("/event", (req, res) => {
  const q = "SELECT * FROM event";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

backend.post("/event", (req, res) => {
  const q = "INSERT INTO event(`title`, `desc`, `dist`) VALUES (?)";

  const values = [req.body.title, req.body.desc, req.body.dist];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.delete("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const q = " DELETE FROM event WHERE id = ? ";

  db.query(q, [eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.put("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "UPDATE event SET `title`= ?, `desc`= ?, `dist`= ? WHERE id = ?";

  const values = [req.body.title, req.body.desc, req.body.dist];

  db.query(q, [...values, eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.listen(8800, () => {
  console.log("Connected to backend.");
});
