const supertest = require("supertest");
const app = require("../app");
const agent = supertest.agent(app);
const TripModel = require("../model/tripsBase");

beforeEach(() => {
  return TripModel.remove({});
});

afterAll(() => {
  return TripModel.remove({});
});


const obj = {
  tripName: "Поездка в Беларусь",
  routName: ["Минск-Беларусь"],
  dateDeparture: "2017-10-15",
  dateArrival: "2017-10-29"
};

it("Returned response status 200, and no trips with empty db.", () => {
  return agent.get("/api/trips").expect(response => {
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});

it("Return trip with db,trip has correct id, and has't __v", () => {
  const trip = new TripModel(obj);
  return trip.save().then(() =>
    agent.get("/api/trips").expect(response => {
      let obj = response.body[0];
      let bolId = obj.hasOwnProperty("id");
      let bolV = obj.hasOwnProperty("__V");
      expect(bolId).toEqual(true);
      expect(bolV).toEqual(false);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject(obj);
    }));
});

it("Trip is removed from the db", () => {
  const trip = new TripModel(obj);
  return trip.save().then((trip) => {
    const url = `/api/trips/${trip._id}`;
    return agent.delete(url).expect(response => {
      expect(response.status).toBe(200);
    }).then(() => TripModel.find({})).then(found => {
      expect(found.length).toBe(0);
    });
  });
});

it("The post is working correctly.", () => {
  return agent.post("/api/trips", () => {
    const trip = new TripModel(obj);
    trip.save();
  }).then(() => {
    return agent.get("/api/trips").expect(response => {
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    })
  });
});

it("The put is working correctly.", () => {
  const trip = new TripModel(obj);
  const newProperty = {
    tripName: 'Поездка в Россию',
    routName: ['Смоленск-Россия']
  };
  return trip.save().then(trip => {
    const url = `/api/trips/${trip._id}`;
    return agent.put(url).send(newProperty).then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(newProperty);
      expect(Array.isArray(response.body.routName)).toBeTruthy();
      expect(response.body.routName).toEqual(['Смоленск-Россия']);
      expect(response.body.tripName).toEqual('Поездка в Россию');
    });
  });
});

