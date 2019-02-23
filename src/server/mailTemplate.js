export default function template(formData = {}) {
  const { items } = formData;
  const itemsText = (items || [])
    .map(item => `${item.fio} (${item.isAdult ? 'Взрослый' : 'Ребенок'})`)
    .join(', ');
  return `Подтверждение от ${formData.fio}${
    itemsText ? ', гости в сопровождении: ' : '.'
  }${itemsText}.`;
}
