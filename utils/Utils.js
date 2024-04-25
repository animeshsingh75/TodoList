export function truncateTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }/${year}`;
}

export function getCategoryColor(category) {
  const colors = {
    Work: "blue",
    Shopping: "green",
    Others: "black",
    Personal: "red",
  };
  return colors[category] || "black";
}
