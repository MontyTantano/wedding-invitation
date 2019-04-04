export const Guests = {
  test: {
    invitationText: 'test',
    form: {
      isReceived: false,
      isSended: false,
      isValid: true,
      fio: 'test_fio',
      items: [
        {
          id: '1',
          fio: 'test_fio_item',
          isAdult: true
        },
        {
          id: '2',
          fio: 'test_fio_item 2',
          isAdult: false
        }
      ]
    }
  },
  karpova: {
    invitationText: 'Дорогая Лена!',
    form: {
      isReceived: false,
      isSended: false,
      isValid: true,
      fio: 'Елена Карпова',
      items: []
    }
  }
};

export const getGuestsStore = id => Guests[id];
