import {StopKind} from "../../model";
import {
  createDeliveryRidesBody,
  removeSpacesFromPhoneNumber,
  setMultipleDestinationsToStops,
  setNoteForDriverDefault
} from "./functions";

describe('createDeliveryRidesBody - functions', function () {

  test('removeSpacesFromPhoneNubmer should remove spaces from contact form', function () {
    expect(removeSpacesFromPhoneNumber({ contact: { phoneNumber: '+420 123 123 123' } }))
      .toEqual({ contact: { phoneNumber: '+420123123123' } });
  });

  test('removeSpacesFromPhoneNubmer should preserver number without spaces', function () {
    expect(removeSpacesFromPhoneNumber({ contact: { phoneNumber: '+420123123123' } }))
      .toEqual({ contact: { phoneNumber: '+420123123123' } });
  });

  test('setNoteForDriverDefault should set default value, if empty', function () {
    expect(setNoteForDriverDefault({}))
      .toEqual({ noteForDriver: 'COVID 19 cz' });

    expect(setNoteForDriverDefault({ noteForDriver: '' }))
      .toEqual({ noteForDriver: 'COVID 19 cz' });
  });

  test('setNoteForDriverDefault should preserve value', function () {
    expect(setNoteForDriverDefault({ noteForDriver: 'my note' }))
      .toEqual({ noteForDriver: 'my note' });
  });

  test('setMultiplePlaceNote ', function () {
    expect(setMultipleDestinationsToStops([{ noteForDriver: '' }]))
      .toEqual([{ noteForDriver: 'Doručení na více míst.' }]);

    expect(setMultipleDestinationsToStops([{ noteForDriver: 'My note' }]))
      .toEqual([{ noteForDriver: 'Doručení na více míst. My note' }]);
  })

});

test('createDeliveryRidesBody - 2 stops', function () {
  const body = createDeliveryRidesBody({
    stops: [
      {
        stopId: '1',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '1',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: 'noteForDriver 1',
        kind: StopKind.PICKUP
      },
      {
        stopId: '2',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '2',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      }
    ]
  });

  expect(body).toHaveProperty('id');

  expect({
    stops: body.stops
  })
    .toEqual({
        stops: [
          {
            stopId: '1',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '1',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'noteForDriver 1',
            kind: StopKind.PICKUP
          },
          {
            stopId: '2',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '2',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          }
        ]
      }
    );

});

test('createDeliveryRidesBody - 3 stops', function () {
  const body = createDeliveryRidesBody({
    stops: [
      {
        stopId: '1',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '1',
            zipCode: '281 02',
            country: 'Czech republic'
          }
        },
        noteForDriver: 'noteForDriver 1',
        kind: StopKind.PICKUP
      },
      {
        stopId: '2',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '2',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      },
      {
        stopId: '3',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '3',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      }
    ]
  });

  expect(body).toHaveProperty('id');

  expect({
    stops: body.stops
  })
    .toEqual({
        stops: [
          {
            stopId: '1',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '1',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'Doručení na více míst. noteForDriver 1',
            kind: StopKind.PICKUP
          },
          {
            stopId: '2',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '2',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          },
          {
            stopId: '3',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '3',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          }
        ]
      }
    );
});

test('createDeliveryRidesBody - people ferry', function () {
  const body = createDeliveryRidesBody({
    stops: [
      {
        stopId: '1',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123',
          peopleFerry: true,
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '1',
            zipCode: '281 02',
            country: 'Czech republic'
          }
        },
        noteForDriver: 'noteForDriver 1',
        kind: StopKind.PICKUP
      },
      {
        stopId: '2',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '2',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      },
      {
        stopId: '3',
        contact: {
          name: 'test',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '3',
            zipCode: '281 02',
            country: 'Czech republic',
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      }
    ]
  });

  expect({
    stops: body.stops
  })
    .toEqual({
        stops: [
          {
            stopId: '1',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '1',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'Převoz lidí. Doručení na více míst. noteForDriver 1',
            kind: StopKind.PICKUP
          },
          {
            stopId: '2',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '2',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          },
          {
            stopId: '3',
            contact: {
              name: 'test',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '3',
                zipCode: '281 02',
                country: 'Czech republic',
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          }
        ]
      }
    );
});


