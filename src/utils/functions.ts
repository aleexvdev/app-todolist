export const DateFunction = () => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: string = String(today.getMonth() + 1).padStart(2, "0");
  const day: string = String(today.getDate()).padStart(2, "0");
  const formattedDate: string = `${year}-${month}-${day}`;

  return formattedDate;
}


export const getNameDay = () => {
  const current_date  = new Date();
  const day = current_date.getDay();
  const nameDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return nameDays[day];
}

export const getOrdinalDay = () => {
  const current_date = new Date();
  const day = current_date.getDate();
  if (day >= 11 && day <= 13) {
    return day + "th";
  } else {
    const ultimoDigito = day % 10;
    switch (ultimoDigito) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }
}

export const getMonthName = () => {
  const current_date = new Date();
  const month = current_date.getMonth();
  const nameMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return nameMonths[month];
}