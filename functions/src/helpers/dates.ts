export function getAge(birthday: Date, momentInTime: Date): number {
  let age = momentInTime.getFullYear() - birthday.getFullYear();
  const m = momentInTime.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && momentInTime.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

export function formatDate(date: Date): string {
  const dd = ("0" + date.getDate()).slice(-2);
  const MM = ("0" + (date.getMonth() + 1)).slice(-2);
  const yyyy = date.getFullYear();

  return dd + "-" + MM + "-" + yyyy;
}

export function getThisYearsBirthdayTimestamp(thisYear: Date, birthday: Date): number {
  const newDate = new Date(`${thisYear.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`);
  return newDate.getTime();
}

export function isValidDateString(date: string): boolean {
  return (/^\d{2}([-])\d{2}\1\d{4}$/).test(date);
}


