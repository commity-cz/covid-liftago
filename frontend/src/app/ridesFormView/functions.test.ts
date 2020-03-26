import { removeSpacesFromPhoneNubmer, setHardcodedCountry, setNoteForDriverDefault } from "./functions";

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

  test('setHardcodedCountry should always set value for CR', function () {
    expect(setHardcodedCountry({ location: { address: { country: 'CZ' } } }))
      .toEqual({ location: { address: { country: 'Czech republic' } } });

    expect(setHardcodedCountry({ location: { address: {} } }))
      .toEqual({ location: { address: { country: 'Czech republic' } } });

    expect(setHardcodedCountry({}))
      .toEqual({ location: { address: { country: 'Czech republic' } } });
  });
});
