import timeago from 'timeago.js';

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

export function timeFrom(value, from) {
  if (!value) return '';
  const timeagoinstance = timeago(from);

  return timeagoinstance.format(value, 'timeago_dict');
}

function timeagoDict(number, index, totalSec) {
  const totalMin = (totalSec - (totalSec % 60)) / 60;
  const minutes = totalMin % 60;
  const hours = (totalMin - minutes) / 60;

  if (index === 4) {
    return [`${hours} hour and ${minutes} minutes ago`, `in ${hours} hour and ${minutes} minutes`];
  }

  if (index === 5) {
    return [`${hours} hours and ${minutes} minutes ago`, `in ${hours} hours and ${minutes} minutes`];
  }

  return [
    ['just now', 'right now'],
    ['%s seconds ago', 'in %s seconds'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['1 day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years']
  ][index];
}

timeago.register('timeago_dict', timeagoDict);
