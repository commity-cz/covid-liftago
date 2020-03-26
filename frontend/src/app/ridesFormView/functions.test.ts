import { StopKind } from "../../model";
import { createDeliveryRidesBody, removeSpacesFromPhoneNubmer, setNoteForDriverDefault } from "./functions";

describe('createDeliveryRidesBody - functions', function () {

  test('removeSpacesFromPhoneNubmer should remove spaces from contact form', function () {
    expect(removeSpacesFromPhoneNubmer({ contact: { phoneNumber: '+420 123 123 123' } }))
      .toEqual({ contact: { phoneNumber: '+420123123123' } });
  });

  test('removeSpacesFromPhoneNubmer should preserver number without spaces', function () {
    expect(removeSpacesFromPhoneNubmer({ contact: { phoneNumber: '+420123123123' } }))
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

});

test('createDeliveryRidesBody', function () {
  const body = createDeliveryRidesBody({
    stops: [
      {
        stopId: '1',
        contact: {
          name: 'test',
          company: '',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '1',
            zipCode: '281 02',
            country: 'Czech republic',
            description: 'description 1'
          }
        },
        noteForDriver: 'noteForDriver 1',
        kind: StopKind.PICKUP
      },
      {
        stopId: '2',
        contact: {
          name: 'test',
          company: '',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '2',
            zipCode: '281 02',
            country: 'Czech republic',
            description: ''
          }
        },
        noteForDriver: '',
        kind: StopKind.DESTINATION
      },
      {
        stopId: '3',
        contact: {
          name: 'test',
          company: '',
          phoneNumber: '+420 123 123 123'
        },
        location: {
          address: {
            city: 'Cerhenice',
            street: 'Cerhenice',
            houseNumber: '3',
            zipCode: '281 02',
            country: 'Czech republic',
            description: ''
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
              company: '',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '1',
                zipCode: '281 02',
                country: 'Czech republic',
                description: 'description 1'
              }
            },
            noteForDriver: 'noteForDriver 1',
            kind: StopKind.PICKUP
          },
          {
            stopId: '2',
            contact: {
              name: 'test',
              company: '',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '2',
                zipCode: '281 02',
                country: 'Czech republic',
                description: ''
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          },
          {
            stopId: '3',
            contact: {
              name: 'test',
              company: '',
              phoneNumber: '+420123123123'
            },
            location: {
              address: {
                city: 'Cerhenice',
                street: 'Cerhenice',
                houseNumber: '3',
                zipCode: '281 02',
                country: 'Czech republic',
                description: ''
              }
            },
            noteForDriver: 'COVID 19 cz',
            kind: 'DESTINATION'
          }
        ]
      }
    );

});
