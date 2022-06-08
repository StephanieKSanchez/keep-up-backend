import connectDb from "./connectDb.js";

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

export function getDestinationById(req, res) {
  const { destinationId } = req.params;
  if (!destinationId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("destinations")
    .doc(destinationId)
    .get()
    .then((doc) => {
      let destination = doc.data();
      destination.id = doc.id;
      res.send(destination);
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

export function updateDestination(req, res) {
  if (!req.params || !req.params.destinationId || !req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const { destinationId } = req.params;
  const db = connectDb();
  db.collection("destinations")
    .doc(destinationId)
    .update(req.body)
    .then(() => {
      res.send("Destination updated.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function deleteDestination(req, res) {
  const { destinationId } = req.params;
  if (!destinationId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("destinations")
    .doc(destinationId)
    .delete()
    .then(() => {
      res.send("Destination deleted.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function updateDestinationCategory(req, res) {
  const { destinationId } = req.params;
  if (!req.body || req.body.category || req.body.detail) {
    res.status(401).send("Invalid request");
    return;
  }
  const newCategory = req.body.category && req.body.detail;
  const db = connectDb();
  db.collection("destinations")
    .doc(destinationId)
    .get()
    .then((doc) => {
      const { categoryList } = doc.data();
      const newCategoryList = categoryList
        ? [...categoryList, newCategory]
        : [newCategory];
      const updatedData = { categoryList: newCategoryList };
      db.collection("destinations")
        .doc(destinationId)
        .update(updatedData)
        .then(() => getDestinationById(req, res));
    })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
}
