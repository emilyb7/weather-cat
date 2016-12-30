QUnit.test( "Initial test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("helper function - temperature", function(t) {
  t.equal(helpers.format.temp(3.62), "3.6°c", "temperature correctly formatted");
  t.equal(helpers.format.temp(-1.05), "-1°c", "temperature correctly formatted without trailing zero");
  t.equal(helpers.format.temp(-2.25), "-2.2°c", "temperature correctly formatted negative numbers");
});

QUnit.test("helper function - city name", function (t) {
  t.equal(helpers.format.city("Edinburgh"), "Edinburgh", "Capitalised names are correctly returned unchanged");
  t.equal(helpers.format.city("bromley"), "Bromley", "Uncapitalised names are correctly Capitalised");
  t.equal(helpers.format.city(""), "", "Empty strings return empty strings");
});

QUnit.test("helper function - weather description", function (t) {
  t.equal(helpers.format.type("Clear skies"), "Clear skies", "Capitalised names are correctly returned unchanged");
  t.equal(helpers.format.type("light rain"), "Light rain", "Uncapitalised names are correctly Capitalised");
  t.equal(helpers.format.type(""), "", "Empty strings return empty strings");
});

QUnit.test("ordering rgb values function", function (t) {
  t.ok(Array.isArray(ordeRGBValues(["200", "100", "0", "1"])), "returns an array");
  t.equal(ordeRGBValues(["200", "100", "0", "1"]).length, 3, "returns an array with 3 values");
  t.deepEqual(ordeRGBValues(["200", "100", "0", "1"]), ["0", "100", "200"], "values correctly sorted");
});

QUnit.test("cloudify function", function (t) {
  t.ok(typeof(helpers.rgbcolor("RGBA(0,204,102,1)")) === "string", "returns a string");
})
