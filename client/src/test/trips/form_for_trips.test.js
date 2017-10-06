// var React = require("react");
import React from "react";
// import {TripsForm} from "../../src/form_for_trips.js";
// import {shallow, mount} from "enzyme";
// import testRenderer from "react-test-renderer";

const sum = (a, b) => a + b;
it("Return correct result", () =>{
	const result = sum(3, 5);
	expect(result).toBe(8);
});