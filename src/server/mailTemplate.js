export default function template(formData = {}) {
  const { items } = formData;
  const guestsTexts = [`1 - ${formData.fio}`];
  (items || []).forEach((item, ind) => {
    const itemText = `${item.fio} (${item.isAdult ? 'Взрослый' : 'Ребенок'})`;
    guestsTexts.push(`${ind + 2} - ${itemText}`);
  });
  const guestsText = guestsTexts.join(' \n ');

  return `Общее число гостей ${1 + items.length}: \n ${guestsText}`;
}
