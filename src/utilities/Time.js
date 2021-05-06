export function displayTime(time) {
    
    if(!time) return "Unknown";

    const askedToday = new Date(time).getTime() > new Date().getTime() - 86400000;

    if(askedToday) return "Today";

    return new Date(time).toLocaleDateString();
}
