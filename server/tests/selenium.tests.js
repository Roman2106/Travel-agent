const webdriver = require("selenium-webdriver");
const {By, until} = webdriver;
const CustomersModel = require("../model/customersBase");
const LocationModel = require("../model/locationsBase");
const TripModel = require("../model/tripsBase");

beforeEach((done) => {
  Promise.all([LocationModel.remove({}), TripModel.remove({}), CustomersModel.remove({})]).then(() => done());
});

const onTimeout = timeout => new Promise(resolve => {
  setTimeout(resolve, timeout);
});

jest.setTimeout(15000);

const trip = {
  tripName: "Поездка в Беларусь",
  routName: [],
  dateDeparture: webdriver.Browser.CHROME ? "20-10-2017" : "2017-10-20",
  dateArrival: webdriver.Browser.CHROME ? "29-10-2017" : "2017-10-29"
};

const location = {
  country: "Беларусь",
  city: "Минск"
};

const customer = {
  firstName: "Роман",
  lastName: "Кремко",
  customersTrips: []
};

it("Create location, trip and customer, and writes in db ", () => {
  const driver = new webdriver.Builder().forBrowser("chrome").build();
  return driver.navigate().to("http://localhost:3000").then(() => {
    driver.wait(until.elementLocated(By.className("ulMenu")));
  }).then(() => {
    driver.findElement(By.linkText("Locations")).click();
  }).then(() => {
    driver.wait(until.elementLocated(By.className("locations")));
  }).then(() => {
    driver.findElement(By.id("country")).sendKeys(location.country);
    driver.findElement(By.id("city")).sendKeys(location.city);
    driver.findElement(By.className("addLocations")).click();
    driver.findElement(By.linkText("Trips")).click();
  }).then(() => {
    driver.wait(until.elementLocated(By.className("trips")));
  }).then(() => {
    driver.findElement(By.className("btnAddTrips")).click();
  }).then(() => {
    driver.wait(until.elementLocated(By.className("tripsForm")));
  }).then(() => {
    driver.findElement(By.id("tripName")).sendKeys(trip.tripName);
    driver.findElement(By.id("routName")).click();
    driver.wait(until.elementsLocated(By.css("option"))).then(arr => arr[1].click());
    driver.findElement(By.id("dateDeparture")).sendKeys(trip.dateDeparture);
    driver.findElement(By.id("dateArrival")).sendKeys(trip.dateArrival);
    driver.findElement(By.className("addEditTrips")).click();
    driver.findElement(By.linkText("Customers")).click();
  }).then(() => {
    driver.wait(until.elementLocated(By.className("customers")));
  }).then(() => {
    driver.findElement(By.className("btnAddCustomer")).click();
  }).then(() => {
    driver.wait(until.elementLocated(By.className("customersForm")));
  }).then(() => {
    driver.findElement(By.id("firstName")).sendKeys(customer.firstName);
    driver.findElement(By.id("lastName")).sendKeys(customer.lastName);
    driver.findElement(By.id("customersTrips")).click();
    driver.wait(until.elementsLocated(By.css("option"))).then(arr => arr[1].click());
    driver.findElement(By.className("addEditCustomer")).click();
  }).then(() => onTimeout(3000))
    .then(() => Promise.all([LocationModel.find({}), TripModel.find({}), CustomersModel.find({})]))
    .then(([dbLocations, dbTrips, dbCustomers]) => {
      expect(dbLocations.length && dbTrips.length && dbCustomers.length).toBe(1);
      expect(dbLocations[0].country).toBe(location.country);
      expect(dbLocations[0].city).toBe(location.city);
      expect(dbTrips[0].tripName).toBe(trip.tripName);
      expect(Array.isArray(dbTrips[0].routName)).toBeTruthy();
      expect(dbCustomers[0].firstName).toBe(customer.firstName);
      expect(dbCustomers[0].lastName).toBe(customer.lastName);
      expect(Array.isArray(dbCustomers[0].customersTrips)).toBeTruthy();
  }).then(() => driver.quit());
});