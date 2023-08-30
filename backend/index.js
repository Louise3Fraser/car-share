import express from "express";
import mysql from "mysql";
import cors from "cors";

const backend = express();
backend.use(cors());
backend.use(express.json());

// Calendar:
const calendar_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorect3!",
  database: "Calendar",
});

backend.get("/event", (req, res) => {
  const q = "SELECT * FROM event";
  calendar_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

backend.post("/event", (req, res) => {
  const q =
    "INSERT INTO event(`title`, `description`, `distance`, `date`, `user`, `color`, `allDay`, `start`, `end`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.distance,
    req.body.date,
    req.body.user,
    req.body.color,
    req.body.allDay,
    req.body.start,
    req.body.end,
  ];

  calendar_db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.delete("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const q = " DELETE FROM event WHERE id = ? ";

  calendar_db.query(q, [eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.put("/event/:id", (req, res) => {
  const eventId = req.params.id;
  const q =
    "UPDATE event SET `title`= ?, `description`= ?, `distance`= ?, `date`=?, `user`=?, `color`=?, `allDay`=?, `start`=?, `end`=? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.distance,
    req.body.date,
    req.body.user,
    req.body.color,
    req.body.allDay,
    req.body.start,
    req.body.end,
  ];

  calendar_db.query(q, [...values, eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.listen(8800, () => {
  console.log("Connected to backend.");
});

// ----------------------

// User:
const user_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorect3!",
  database: "user",
});

backend.get("/credentials", (req, res) => {
  const q = "SELECT * FROM credentials";
  user_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

backend.post("/credentials", (req, res) => {
  const q = "INSERT INTO credentials(`name`, `email`, `password`) VALUES (?)";

  const values = [req.body.name, req.body.email, req.body.password];

  user_db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.delete("/credentials/:id", (req, res) => {
  const credentialsId = req.params.id;
  const q = " DELETE FROM credentials WHERE id = ? ";

  user_db.query(q, [credentialsId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.put("/credentials/:id", (req, res) => {
  const credentialsId = req.params.id;
  const q =
    "UPDATE credentials SET `name`= ?, `email`= ?, `password`= ? WHERE id = ?";

  const values = [req.body.name, req.body.email, req.body.password];

  user_db.query(q, [...values, credentialsId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// User profile fields:

backend.get("/profile", (req, res) => {
  const q = "SELECT * FROM profile";
  user_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

backend.put("/profile/:id", (req, res) => {
  const profileId = req.params.id;
  const q = "UPDATE profile SET `color`= ? WHERE idprofile = ?";

  const values = [req.body.color];

  user_db.query(q, [...values, profileId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

backend.get("/credentials", (req, res) => {
  const q = "SELECT * FROM credentials";
  user_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// ----------------------

// Dashboard:
const dashboard_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorect3!",
  database: "dashboard",
});

backend.get("/data", (req, res) => {
  const q = "SELECT * FROM data";
  dashboard_db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
