import connectDb from "./connectDb";

export function getAllDestinations(req, res) {
  const db = connectDb();
  db.collection("destinations")
    .get()
    .then((snapshot) => {
      const destinationArray = snapshot.docs.map((doc) => {
        let destination = doc.data();
        destination.id = doc.id;
        return destination;
      });
      res.send(destinationArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function addDestination(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("destinations")
    .add(req.body)
    .then((doc) => {
      res.send("New destination added" + doc.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
