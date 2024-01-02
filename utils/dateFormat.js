const addDateSuffix = (date) => {
    let dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);

    const exceptions = ["11", "12", "13"];
    if (!exceptions.includes(dateStr)) {
        switch (lastChar) {
            case "1": return `${dateStr}st`;
            case "2": return `${dateStr}nd`;
            case "3": return `${dateStr}rd`;
        }
    }
    return `${dateStr}th`;
};

const formatDate = (timestamp, { monthLength = "short", dateSuffix = true } = {}) => {
    const months = monthLength === "short"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dateObj = new Date(timestamp);
    const month = months[dateObj.getMonth()];
    const day = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();

    let hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const periodOfDay = hour >= 12 ? "pm" : "am";

    hour = hour % 12 || 12;

    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${month} ${day}, ${year} at ${hour}:${paddedMinutes} ${periodOfDay}`;
};

module.exports = formatDate;
