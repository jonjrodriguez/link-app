import moment from 'moment';

export function capitalize(value) {
  if (!value) return '';
  const text = value.toString();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function titleCase(value) {
  if (!value) return '';
  const text = value.toString();

  return text.replace('_', ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function calendar(value) {
  if (!value) return '';

  const dateValue = moment(value);

  return dateValue.calendar();
}

export function fromNow(value, from) {
  if (!value) return '';

  const dateValue = moment(value);

  return dateValue.from(from);
}
