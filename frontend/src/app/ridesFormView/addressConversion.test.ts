import { AddressComponent, convert } from "./addressConversion";

describe('google autocomplete result conversion', function () {

  test('convert empty address components', function () {
    const input: { address_components: AddressComponent[]; }[] = [];
    const expected = {
      city: "",
      country: "Czech republic",
      houseNumber: "",
      street: "",
      zipCode: "",
    };

    expect(convert(input)).toEqual(expected);
  });

  test('convert "Aš"', function () {
    const input = [{
      "address_components": [{
        "long_name": "Aš",
        "short_name": "Aš",
        "types": ["locality", "political"]
      }, {
        "long_name": "Cheb District",
        "short_name": "Cheb District",
        "types": ["administrative_area_level_2", "political"]
      }, {
        "long_name": "Karlovy Vary Region",
        "short_name": "Karlovy Vary Region",
        "types": ["administrative_area_level_1", "political"]
      }, { "long_name": "Czechia", "short_name": "CZ", "types": ["country", "political"] }, {
        "long_name": "352 01",
        "short_name": "352 01",
        "types": ["postal_code"]
      }],
      "formatted_address": "352 01 Aš, Czechia",
      "geometry": {
        "bounds": {
          "south": 50.163324,
          "west": 12.1566032,
          "north": 50.27423109999999,
          "east": 12.2938045
        },
        "location": { "lat": 50.2238827, "lng": 12.1950127 },
        "location_type": "APPROXIMATE",
        "viewport": { "south": 50.163324, "west": 12.1566032, "north": 50.27423109999999, "east": 12.2938045 }
      },
      "place_id": "ChIJ0cwH-0TjoEcRBkeLbKv8G6Y",
      "types": ["locality", "political"]
    }];

    const expected = {
      city: "Aš",
      country: "Czech republic",
      houseNumber: "",
      street: "Aš",
      zipCode: "352 01",
    };

    expect(convert(input)).toEqual(expected);
  });

  test('convert "Jiráskova 34 Jihlava', function () {
    const input = [{
      "address_components": [{
        "long_name": "34",
        "short_name": "34",
        "types": ["street_number"]
      }, { "long_name": "1016", "short_name": "1016", "types": ["premise"] }, {
        "long_name": "Jiráskova",
        "short_name": "Jiráskova",
        "types": ["route"]
      }, {
        "long_name": "Jihlava",
        "short_name": "Jihlava",
        "types": ["locality", "political"]
      }, {
        "long_name": "Jihlava",
        "short_name": "Jihlava",
        "types": ["administrative_area_level_2", "political"]
      }, {
        "long_name": "Kraj Vysočina",
        "short_name": "Kraj Vysočina",
        "types": ["administrative_area_level_1", "political"]
      }, { "long_name": "Czechia", "short_name": "CZ", "types": ["country", "political"] }, {
        "long_name": "586 01",
        "short_name": "586 01",
        "types": ["postal_code"]
      }],
      "formatted_address": "Jiráskova 1016/34, 586 01 Jihlava, Czechia",
      "geometry": {
        "bounds": { "south": 49.4019332, "west": 15.5777797, "north": 49.4022588, "east": 15.5782805 },
        "location": { "lat": 49.4021172, "lng": 15.5780636 },
        "location_type": "ROOFTOP",
        "viewport": {
          "south": 49.4007470197085,
          "west": 15.5766811197085,
          "north": 49.4034449802915,
          "east": 15.5793790802915
        }
      },
      "place_id": "ChIJiT9cjkMaDUcRQyceX7CqIV8",
      "types": ["premise"]
    }];

    const expected = {
      city: "Jihlava",
      country: "Czech republic",
      houseNumber: "34",
      street: "Jiráskova",
      zipCode: "586 01",
    };

    expect(convert(input)).toEqual(expected);
  });

  test('convert "Jiráskova 34 Brno', function () {
    const input = [{
      "address_components": [{
        "long_name": "34",
        "short_name": "34",
        "types": ["street_number"]
      }, { "long_name": "171", "short_name": "171", "types": ["premise"] }, {
        "long_name": "Jiráskova",
        "short_name": "Jiráskova",
        "types": ["route"]
      }, {
        "long_name": "Veveří",
        "short_name": "Veveří",
        "types": ["neighborhood", "political"]
      }, {
        "long_name": "Brno-střed",
        "short_name": "Brno-střed",
        "types": ["political", "sublocality", "sublocality_level_1"]
      }, {
        "long_name": "Brno-město",
        "short_name": "Brno-město",
        "types": ["administrative_area_level_2", "political"]
      }, {
        "long_name": "Jihomoravský kraj",
        "short_name": "Jihomoravský kraj",
        "types": ["administrative_area_level_1", "political"]
      }, { "long_name": "Czechia", "short_name": "CZ", "types": ["country", "political"] }, {
        "long_name": "602 00",
        "short_name": "602 00",
        "types": ["postal_code"]
      }],
      "formatted_address": "Jiráskova 171/34, 602 00 Brno-střed-Veveří, Czechia",
      "geometry": {
        "location": { "lat": 49.2022657, "lng": 16.5961115 },
        "location_type": "ROOFTOP",
        "viewport": {
          "south": 49.20091671970849,
          "west": 16.5947625197085,
          "north": 49.20361468029149,
          "east": 16.5974604802915
        }
      },
      "place_id": "ChIJJa9jxEaUEkcR1ydOUAwK0S8",
      "types": ["street_address"]
    }];

    const expected = {
      city: "Brno-střed",
      country: "Czech republic",
      houseNumber: "34",
      street: "Jiráskova",
      zipCode: "602 00",
    };

    expect(convert(input)).toEqual(expected);
  });

  test('convert "Budějovická 21 Praha', function () {
    const input = [{
      "address_components": [{
        "long_name": "21",
        "short_name": "21",
        "types": ["street_number"]
      }, { "long_name": "1071", "short_name": "1071", "types": ["premise"] }, {
        "long_name": "Budějovická",
        "short_name": "Budějovická",
        "types": ["route"]
      }, {
        "long_name": "Michle",
        "short_name": "Michle",
        "types": ["neighborhood", "political"]
      }, {
        "long_name": "Praha 4",
        "short_name": "Praha 4",
        "types": ["political", "sublocality", "sublocality_level_1"]
      }, {
        "long_name": "Hlavní město Praha",
        "short_name": "Hlavní město Praha",
        "types": ["administrative_area_level_2", "political"]
      }, {
        "long_name": "Hlavní město Praha",
        "short_name": "Hlavní město Praha",
        "types": ["administrative_area_level_1", "political"]
      }, { "long_name": "Czechia", "short_name": "CZ", "types": ["country", "political"] }, {
        "long_name": "140 00",
        "short_name": "140 00",
        "types": ["postal_code"]
      }],
      "formatted_address": "Budějovická 1071/21, 140 00 Praha 4-Michle, Czechia",
      "geometry": {
        "location": { "lat": 50.0430435, "lng": 14.454735 },
        "location_type": "ROOFTOP",
        "viewport": {
          "south": 50.0416945197085,
          "west": 14.4533860197085,
          "north": 50.0443924802915,
          "east": 14.4560839802915
        }
      },
      "place_id": "ChIJZ5h6Au2TC0cRbemO6JNDhUs",
      "types": ["street_address"]
    }];

    const expected = {
      city: "Praha 4",
      country: "Czech republic",
      houseNumber: "21",
      street: "Budějovická",
      zipCode: "140 00",
    };

    expect(convert(input)).toEqual(expected);
  });

});
